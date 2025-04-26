import { ReactNode } from "react"
import CHATBOT_ICON from "../../assets/active-chatbot.svg"
import SENT_ICON from "../../assets/send.svg"
import CHATBOT_ICON2 from "../../assets/users/chat-bot.svg"
import Button from "../../components/button"
import ColorPicker from "../../components/color-picker"
import "../../components/css/chatbot-settings.css"
import CustomInput from "../../components/custom-input"
import Header from "../../components/header"
import LoadingSpinner from "../../components/spinner"
import TimePicker from "../../components/timepiceker"
import useChatbotSetting from "../../hooks/chat/use-chatbot-setting"

type TProps = {
  children: ReactNode
  title: string
}

const ChatBotSettingWrapper = ({ children, title }: TProps) => (
  <div className="chat-bot_settings-wrapper">
    <div className="chat-bot_settings-title">{title}</div>
    <div className="chat-bot_settings-content">{children}</div>
  </div>
)

const ChatBotSetting = () => {
  const { formData, isLoading, isUpdating, handleSubmit, setFormData } =
    useChatbotSetting()

  if (isLoading || !formData || isUpdating) return <LoadingSpinner />
  return (
    <>
      <Header title="Chat Bot Settings" />
      <div>
        <div className="chat-bot_wrapper">
          <div>
            <div className="chat-bot_container">
              <div
                className="chat-bot_header"
                style={{ backgroundColor: formData?.headerColor }}
              >
                <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                Hubly
              </div>
              <div
                className="chat-bot_body"
                style={{ backgroundColor: formData?.backgroundColor }}
              >
                <div className="chat-bot_sender-icon">
                  <img src={CHATBOT_ICON2} alt="chatbot-icon" width={25} />
                </div>
                <div className="chat-bot_chats">
                  <div className="chat-bot_custom_messages-wrapper">
                    {formData?.customizedMessages?.map((message, idx) => (
                      <div key={idx} className="chat-bot_custom_messages">
                        {message}
                      </div>
                    ))}
                  </div>
                  <div className="chat-bot_form">
                    <small>Introduce Yourself</small>
                    <div className="chat-bot_form-wrapper">
                      <div>
                        <div className="chat-bot_form-label">Your name</div>
                        <div className="chat-bot_form-placeholder">
                          {formData?.formPlaceholder.name ?? " "}
                        </div>
                      </div>
                      <div>
                        <div className="chat-bot_form-label">Your phone</div>
                        <div className="chat-bot_form-placeholder">
                          {formData?.formPlaceholder.phone ?? " "}
                        </div>
                      </div>
                      <div>
                        <div className="chat-bot_form-label">Your email</div>
                        <div className="chat-bot_form-placeholder">
                          {formData?.formPlaceholder.email ?? " "}
                        </div>
                      </div>
                      <Button type="button">
                        {formData?.formPlaceholder.submitButton ?? " "}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-bot_footer">
                Write a message
                <img src={SENT_ICON} alt="sent-icon" width={25} />
              </div>
            </div>
            <div className="chat-bot_welcome-wrapper">
              <img src={CHATBOT_ICON2} alt="chatbot" width={50} />
              <div>{formData?.welcomeMessage}</div>
            </div>
          </div>
          <div className="chat-bot_settings">
            <ChatBotSettingWrapper title="Header Color">
              <ColorPicker
                defaultColor={["#FFFFFF", "#000000", "#33475B"]}
                currentColor={formData?.headerColor}
                onChange={(newColor: string) =>
                  setFormData((prev) => ({ ...prev!, headerColor: newColor }))
                }
              />
            </ChatBotSettingWrapper>
            <ChatBotSettingWrapper title="Background Color">
              <ColorPicker
                defaultColor={["#FFFFFF", "#000000", "#EEEEEE"]}
                currentColor={formData?.backgroundColor}
                onChange={(newColor: string) =>
                  setFormData((prev) => ({
                    ...prev!,
                    backgroundColor: newColor,
                  }))
                }
              />
            </ChatBotSettingWrapper>

            <ChatBotSettingWrapper title="Customize Messages">
              <div className="chat-bot_custom_messages-wrapper">
                {formData?.customizedMessages?.map((message, idx) => (
                  <CustomInput
                    key={idx}
                    value={message}
                    onChange={(value: string) => {
                      setFormData((prev) => {
                        if (!prev || !prev.customizedMessages) return prev

                        return {
                          ...prev,
                          customizedMessages: prev.customizedMessages.map(
                            (item, i) => (i === idx ? value : item)
                          ),
                        }
                      })
                    }}
                  />
                ))}
              </div>
            </ChatBotSettingWrapper>
            <ChatBotSettingWrapper title="Introduction Form">
              <div className="chat-bot_form-wrapper">
                <div>
                  <div className="chat-bot_form-label">Your name</div>
                  <input
                    name="name"
                    value={formData?.formPlaceholder.name}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData((prev) => ({
                        ...prev!,
                        formPlaceholder: {
                          ...prev?.formPlaceholder!,
                          name: value,
                        },
                      }))
                    }}
                    className="chat-bot_form-input"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <div className="chat-bot_form-label">Your phone</div>
                  <input
                    name="phone"
                    value={formData?.formPlaceholder.phone}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData((prev) => ({
                        ...prev!,
                        formPlaceholder: {
                          ...prev?.formPlaceholder!,
                          phone: value,
                        },
                      }))
                    }}
                    className="chat-bot_form-input"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <div className="chat-bot_form-label">Your email</div>
                  <input
                    name="email"
                    value={formData?.formPlaceholder.email}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData((prev) => ({
                        ...prev!,
                        formPlaceholder: {
                          ...prev?.formPlaceholder!,
                          email: value,
                        },
                      }))
                    }}
                    className="chat-bot_form-input"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <input
                  name="button"
                  value={formData?.formPlaceholder.submitButton}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData((prev) => ({
                      ...prev!,
                      formPlaceholder: {
                        ...prev?.formPlaceholder!,
                        submitButton: value,
                      },
                    }))
                  }}
                  className="chat-bot_form-input-btn"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
            </ChatBotSettingWrapper>
            <ChatBotSettingWrapper title="Welcome Message">
              <CustomInput
                value={formData?.welcomeMessage ?? ""}
                onChange={(value: string) => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      welcomeMessage: value,
                    }
                  })
                }}
              />
            </ChatBotSettingWrapper>
            <ChatBotSettingWrapper title="Missed Chat Timer">
              <TimePicker
                state={formData?.missedChatTimer}
                onChange={(state) => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      missedChatTimer: state,
                    }
                  })
                }}
              />
            </ChatBotSettingWrapper>

            <Button
              type="button"
              className="chat-bot_submit_btn"
              disabled={isUpdating}
              isLoading={isUpdating}
              onClick={() => handleSubmit()}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBotSetting
