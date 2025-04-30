/*
|----------------------------------------------------------------------------------
| CustomInput Component (Editable Inline Text Field)
|----------------------------------------------------------------------------------
| This component renders a piece of text that becomes editable when clicked. 
| When the user clicks outside the input field, the component automatically 
| toggles back to view mode and updates the value via the `onChange` prop.
|
| Features:
| - Click to edit inline value
| - Click outside to auto-save and toggle back to display mode
| - Displays an edit icon for intuitive UX
|
| Props:
| - value: The current string value to display/edit
| - onChange: Callback to return the updated value when edited
*/

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

  // Toggle Outside Click
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
