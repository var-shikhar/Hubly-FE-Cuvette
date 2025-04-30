/*
|--------------------------------------------------------------------------- 
| ChatBot Component (for End-User)
|--------------------------------------------------------------------------- 
| A chatbot component allowing end-users to raise tickets and request support. 
| The component features a dynamic interface with a welcome message, custom 
| messages, and the ability to start a conversation with a chatbot. It supports 
| user form submission, where users can provide their details like name, phone, 
| and email before proceeding with a chat. The conversation is updated  
| as the user sends messages, and tickets are tracked with statuses. 
| If a ticket is resolved, users are offered the option to create a new one. 
| The component also handles loading states, error handling, and resetting chat 
| sessions. 
*/

import { ChangeEvent } from "react"
import ACTIVE_CHATBOT_ICON from "../assets/active-chatbot.svg"
import MESSAGE_ICON from "../assets/chat.svg"
import CROSS_ICON from "../assets/cross-vector.svg"
import CROSS_ICON2 from "../assets/cross.svg"
import SENT_ICON from "../assets/send.svg"
import CHATBOT_ICON from "../assets/users/chat-bot.svg"
import useChatBot from "../hooks/chat/use-chat-bot"
import Button from "./button"
import "./css/chat-bot.css"
import LoadingSpinner from "./spinner"

const ChatBot = () => {
  const {
    toggleChatBot,
    handleToggleChatBot,
    formData,
    isLoading,
    welcomeToggle,
    setWelcomeToggle,
    inputText,
    handleChatBotInput,
    checkForChatSubmisstion,
    handleChatSubmission,
    handleFormSubmission,
    handleFirstMessage,
    converstaionData,
    handleFormInput,
    isLoadingUserForm,
    handleReset,
    chatEndRef,
  } = useChatBot()

  if (isLoading || !formData) return <LoadingSpinner />

  return (
    <>
      {welcomeToggle && (
        <div className="welcome-wrapper">
          <img
            src={CROSS_ICON2}
            alt="cross"
            className="cross_icons"
            width={25}
            onClick={() => setWelcomeToggle(false)}
          />
          <img
            src={CHATBOT_ICON}
            alt="chatbot"
            className="chat_bot-icon"
            width={50}
          />
          <span>{formData?.welcomeMessage}</span>
        </div>
      )}
      <div className="message_wrapper" onClick={handleToggleChatBot}>
        <img
          src={toggleChatBot ? CROSS_ICON : MESSAGE_ICON}
          alt="message"
          width={20}
        />
      </div>

      {toggleChatBot && (
        <div className="chat_bot-container">
          <div
            className="chat_bot-header"
            style={{ backgroundColor: formData?.headerColor }}
          >
            <img src={ACTIVE_CHATBOT_ICON} alt="chatbot-icon" width={25} />
            Hubly
          </div>
          <div
            className="chat_bot-body"
            style={{ backgroundColor: formData?.backgroundColor }}
          >
            {converstaionData ? (
              <>
                <div
                  className={`chat_bot-wrapper ${
                    converstaionData?.conversation[0].sendBy === "Member"
                      ? "receive_wrapper"
                      : "send_wrapper"
                  }`}
                >
                  {converstaionData?.conversation[0].sendBy === "Member" && (
                    <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                  )}
                  <div className="chat_bot-chats">
                    {converstaionData?.conversation[0].message}
                  </div>
                </div>
                <UserForm
                  data={{
                    userName: converstaionData.userName,
                    userPhone: converstaionData.userPhone,
                    userEmail: converstaionData.userEmail,
                  }}
                  isDisabled={
                    isLoadingUserForm || converstaionData.detailsShared
                  }
                  placeholder={{
                    name: formData?.formPlaceholder.name,
                    phone: formData?.formPlaceholder.phone,
                    email: formData?.formPlaceholder.email,
                    button: formData?.formPlaceholder.submitButton,
                  }}
                  handleFormInput={handleFormInput}
                  handleFormSubmission={handleFormSubmission}
                />
                <div className="chat_bot-chats_wrapper">
                  {converstaionData?.conversation.slice(1)?.map((item) => (
                    <div
                      key={item.id}
                      className={`chat_bot-wrapper ${
                        item.sendBy === "Member"
                          ? "receive_wrapper"
                          : "send_wrapper"
                      }`}
                    >
                      {item.sendBy === "Member" && (
                        <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                      )}
                      <div className="chat_bot-chats">{item.message}</div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {converstaionData.status === "Resolved" && (
                  <div className="chat_bot-ended">
                    <span>This ticket has resolved!</span>
                    <Button type="button" size="sm" onClick={handleReset}>
                      Create New
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="chat_bot-wrapper receive_wrapper">
                  <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                  <div className="chat_bot-chats_wrapper">
                    {formData?.customizedMessages?.map((message, idx) => (
                      <div
                        key={idx}
                        className="chat_bot-chats custom-messages"
                        onClick={() => handleFirstMessage(message)}
                      >
                        {message}
                      </div>
                    ))}
                  </div>
                </div>
                <span className="start_message">Start a Conversation</span>
              </>
            )}
          </div>
          <div className="chat_bot-footer">
            <input
              type="text"
              placeholder="Write a message"
              className="chat_bot-input"
              value={inputText}
              onChange={handleChatBotInput}
              onKeyDown={checkForChatSubmisstion}
              disabled={
                isLoadingUserForm || converstaionData?.status === "Resolved"
              }
            />
            <img
              src={SENT_ICON}
              alt="sent-icon"
              className="sent-icon"
              onClick={() => {
                if (
                  isLoadingUserForm ||
                  converstaionData?.status === "Resolved"
                )
                  return
                handleChatSubmission(inputText)
              }}
              width={15}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot

type TFormInput = {
  data: {
    userName: string
    userPhone: string
    userEmail: string
  }
  isDisabled: boolean
  placeholder: {
    name: string
    email: string
    phone: string
    button: string
  }
  handleFormInput: (e: ChangeEvent<HTMLInputElement>) => void
  handleFormSubmission: () => void
}

const UserForm = ({
  data,
  isDisabled,
  placeholder,
  handleFormInput,
  handleFormSubmission,
}: TFormInput) => {
  return (
    <>
      <div className="chat_bot-wrapper receive_wrapper">
        <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
        <div className="chat_bot-form">
          <small>Introduce Yourself</small>
          <div className="chat_bot-form_wrapper">
            <div>
              <div className="chat_bot-form_label">Your name</div>
              <input
                type="text"
                name="userName"
                placeholder={placeholder.name}
                disabled={isDisabled}
                value={data.userName}
                required
                onChange={handleFormInput}
              />
            </div>
            <div>
              <div className="chat_bot-form_label">Your phone</div>
              <input
                type="tel"
                name="userPhone"
                placeholder={placeholder.phone}
                value={data.userPhone}
                disabled={isDisabled}
                maxLength={10}
                min={6666666666}
                max={9999999999}
                required
                onChange={handleFormInput}
              />
            </div>
            <div>
              <div className="chat_bot-form_label">Your email</div>
              <input
                type="email"
                name="userEmail"
                placeholder={placeholder.email}
                value={data.userEmail}
                disabled={isDisabled}
                required
                onChange={handleFormInput}
              />
            </div>
            <Button
              type="button"
              disabled={
                isDisabled || Object.values(data).some((item) => item === "")
              }
              onClick={handleFormSubmission}
            >
              {placeholder.button ?? "Submit Details"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
