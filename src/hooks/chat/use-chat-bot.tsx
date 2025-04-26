import { skipToken } from "@reduxjs/toolkit/query"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { showToast } from "../../lib/utils"
import {
  TChatBotSetting,
  useGetChatBotDetailsQuery,
} from "../../redux/slice/chatbot-setting-slice"
import {
  TUserConversation,
  useGetUserConversationQuery,
  usePostNewConversationMutation,
  usePostUserFormMutation,
  usePutUserMessageMutation,
} from "../../redux/slice/lead-slice"

const useChatBot = () => {
  const [leadID, setLeadID] = useState(
    () => localStorage.getItem("leadID") ?? null
  )
  const { data, isLoading } = useGetChatBotDetailsQuery()
  const { data: convData, refetch: refetchConvData } =
    useGetUserConversationQuery(leadID ? leadID : skipToken, {
      refetchOnMountOrArgChange: true,
    })

  const [postUserForm, { isLoading: isLoadingUserForm }] =
    usePostUserFormMutation()
  const [sendFirstMessage] = usePostNewConversationMutation()
  const [putUserMessage] = usePutUserMessageMutation()

  const [toggleChatBot, setToggleChatBot] = useState(false)
  const [welcomeToggle, setWelcomeToggle] = useState(true)
  const [inputText, setInputText] = useState<string>("")
  const [formData, setFormData] = useState<TChatBotSetting | null>(null)
  const [converstaionData, setConverstaionData] =
    useState<TUserConversation | null>(null)

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // Set the initial state based on the user details
  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  // Set the initial state based on the converational details
  useEffect(() => {
    if (convData) setConverstaionData(convData)
  }, [convData])

  useEffect(() => {
    if (converstaionData?.conversation?.length && toggleChatBot) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [convData, toggleChatBot])

  // Handle Toggle Chat Bot
  const handleToggleChatBot = () => {
    setToggleChatBot((prev) => !prev)
    if (!toggleChatBot) refetchConvData()
    welcomeToggle && setWelcomeToggle(false)
  }

  // Handle Chat Bot Input
  const handleChatBotInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  // Handle User Form Input
  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    setConverstaionData((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const checkForChatSubmisstion = async (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputText !== "") handleChatSubmission(inputText)
    }
  }

  // Handle Form Submission
  const handleChatSubmission = async (message: string) => {
    try {
      if (leadID) {
        await putUserMessage({ leadID: leadID, message: message }).unwrap()
      } else {
        const response = await sendFirstMessage({ message: message }).unwrap()
        setLeadID(response.leadID)
        localStorage.setItem("leadID", response.leadID)
      }
    } catch (error) {
      console.log("Error updating profile:", error)
    } finally {
      setInputText("")
      refetchConvData()
    }
  }

  // Handle Form Submission
  const handleFormSubmission = async () => {
    try {
      if (!converstaionData || !leadID) return
      if (
        converstaionData?.userName === "" ||
        converstaionData?.userPhone === "" ||
        converstaionData?.userEmail === ""
      ) {
        showToast("Please fill all the fields", "warning")
      }

      const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        converstaionData?.userEmail
      )
      const validatePhone = /^\+?[0-9]{7,15}$/.test(converstaionData?.userPhone)
      if (!validateEmail || !validatePhone) {
        showToast("Invalid email or phone number", "warning")
        return
      }

      await postUserForm({
        leadID: leadID,
        name: converstaionData?.userName,
        email: converstaionData?.userEmail,
        phone: converstaionData?.userPhone,
      }).unwrap()
    } catch (error) {
      console.log("Error updating profile:", error)
    } finally {
      setInputText("")
    }
  }

  // Handle First Custom Message
  const handleFirstMessage = (message: string) => {
    setInputText(message)
    handleChatSubmission(message)
  }

  // Function Handle Reset
  function handleReset() {
    setInputText("")
    setWelcomeToggle(false)
    setConverstaionData(null)
    setLeadID("")
    localStorage.removeItem("leadID")
  }

  // Scroll to Bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return {
    toggleChatBot,
    handleToggleChatBot,
    welcomeToggle,
    setWelcomeToggle,
    isLoading,
    formData,
    inputText,
    handleChatBotInput,
    handleChatSubmission,
    checkForChatSubmisstion,
    handleFormSubmission,
    handleFirstMessage,
    handleFormInput,
    converstaionData,
    isLoadingUserForm,
    handleReset,
    chatEndRef,
  }
}

export default useChatBot
