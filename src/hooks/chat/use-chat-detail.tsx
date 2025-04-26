import { skipToken } from "@reduxjs/toolkit/query"
import {
  ChangeEvent,
  KeyboardEvent,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  TChatList,
  useGetAssigneeListQuery,
  useGetChatDetailQuery,
  useGetChatListQuery,
  usePutAssigneeMutation,
  usePutChatStatusMutation,
  usePutMessageMutation,
} from "../../redux/slice/lead-slice"
import { showToast } from "../../lib/utils"
import { useParams } from "react-router-dom"

const statusMode = ["Resolved", "Unresolved"]

type Props = {
  isDirect?: boolean
}

const useChatDetail = ({ isDirect = false }: Props) => {
  const { id } = useParams()
  const { data, isLoading, refetch } = useGetChatListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [activeChat, setActiveChat] = useState<null | TChatList>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  const { data: assigneeList, isLoading: isFetchingChats } =
    useGetAssigneeListQuery(activeChat ? activeChat.leadID : skipToken)
  const { data: activeChatData, refetch: refetchConvData } =
    useGetChatDetailQuery(activeChat ? activeChat.leadID : skipToken)

  const [putMessage, { isLoading: isSendingMessage }] = usePutMessageMutation()
  const [updateStatus, { isLoading: isUpdating }] = usePutChatStatusMutation()
  const [updateAssignee, { isLoading: isUpdatingAssignee }] =
    usePutAssigneeMutation()

  // Common Selected and Mode State for Assignee and Status Update
  const [selectedData, setSelectedData] = useState<string | null>(null)
  const [mode, setMode] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")

  const [toggleAssignee, setToggleAssignee] = useState(false)
  const [toggleStatus, setToggleStatus] = useState(false)
  const [toggleConfirmation, setToggleConfirmation] = useState(false)

  const handleActiveChat = (item: TChatList) => setActiveChat(item)
  const handleToggleAssignee = () => {
    setToggleAssignee((prev) => !prev)
    if (toggleStatus) setToggleStatus(false)
  }
  const handleToggleStatus = () => {
    setToggleStatus((prev) => !prev)
    if (toggleAssignee) setToggleAssignee(false)
  }
  const handleConfirmation = () => setToggleConfirmation((prev) => !prev)

  // Setup the Default Chat
  useEffect(() => {
    if (isDirect && id && data) {
      const foundData = data.find((item) => item.leadID === id)
      if (foundData) {
        setActiveChat(foundData)
      }
    }
  }, [isDirect, id, data])

  // Handle Auto Toggle
  useEffect(() => {
    if (activeChatData?.length && activeChat) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [activeChatData, activeChat])

  // Scroll to Bottom
  const scrollToBottom = () => {
    const container = chatWindowRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  // Handle Selection
  const handleSelection = (status: string, mode: string) => {
    startTransition(() => {
      setSelectedData(status)
      setMode(mode)
      handleConfirmation()
    })
  }

  // Handle Close Confirmation
  const handleCloseConfirmation = () => {
    startTransition(() => {
      setSelectedData(null)
      setMode(null)
      handleConfirmation()
      if (toggleStatus) handleToggleStatus()
      if (toggleAssignee) handleToggleAssignee()
    })
  }

  // Handle Status Update
  const handleStatusUpdate = async () => {
    try {
      if (!selectedData || !activeChat) return
      await updateStatus({
        leadID: activeChat.leadID,
        status: selectedData,
      }).unwrap()
      showToast("Status updated successfully", "success")
    } catch (error) {
      console.log("Error updating status:", error)
    } finally {
      handleCloseConfirmation()
      refetch()
    }
  }

  // Handle Assignee Update
  const handleAssigneeUpdate = async () => {
    try {
      if (!selectedData || !activeChat) return
      await updateAssignee({
        leadID: activeChat.leadID,
        assigneeID: selectedData,
      }).unwrap()
      showToast("Status updated successfully", "success")
    } catch (error) {
      console.log("Error updating status:", error)
    } finally {
      handleCloseConfirmation()
      refetch()
    }
  }

  // Handle Chat Bot Input
  const handleChatBotInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // Check for Form Submission
  const submissionByEnterKey = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputValue !== "") handleChatSubmission(inputValue)
    }
  }

  // Handle Form Submission
  const handleChatSubmission = async (message: string) => {
    try {
      if (!activeChat) return
      await putMessage({ leadID: activeChat.leadID, message: message }).unwrap()
    } catch (error) {
      console.log("Error sending message:", error)
    } finally {
      setInputValue("")
      refetchConvData()
    }
  }

  return {
    data,
    activeChat,
    toggleAssignee,
    toggleStatus,
    toggleConfirmation,
    activeChatData,
    handleActiveChat,
    handleToggleAssignee,
    handleToggleStatus,
    statusMode,
    assigneeList,
    mode,
    handleConfirmation,
    handleSelection,
    setToggleConfirmation,
    handleCloseConfirmation,
    isUpdating,
    isUpdatingAssignee,
    isSendingMessage,
    isLoading,
    isFetchingChats,
    handleStatusUpdate,
    handleAssigneeUpdate,
    handleChatBotInput,
    submissionByEnterKey,
    handleChatSubmission,
    inputValue,
    chatWindowRef,
  }
}

export default useChatDetail
