import { useEffect, useRef, useState } from "react"
import EDIT_ICON from "../assets/edit-1.svg"

type TCustomInputProps = {
  value: string
  onChange: (value: string) => void
}

const CustomInput = ({ onChange, value }: TCustomInputProps) => {
  const [toggleInput, setToggleInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toggleInput) {
      inputRef.current?.focus()
    }
  }, [toggleInput])

  // Toggle Click Outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        toggleInput &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setToggleInput(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [toggleInput])

  return (
    <div ref={wrapperRef}>
      {toggleInput ? (
        <div>
          <input
            ref={inputRef}
            name="name"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="chat-bot_form-input"
            type="text"
            placeholder="Enter your name"
          />
        </div>
      ) : (
        <div className="chat-bot_custom-form_message">
          {value}
          <img
            src={EDIT_ICON}
            alt="edit"
            width={15}
            className="pointer"
            onClick={() => setToggleInput(!toggleInput)}
          />
        </div>
      )}
    </div>
  )
}

export default CustomInput
