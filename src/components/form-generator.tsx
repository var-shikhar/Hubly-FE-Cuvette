import { ChangeEvent, Fragment, ReactNode, useEffect, useState } from "react"
import INFO_ICON from "../assets/nofitication.svg"
import "./css/form-generator.css"

type TOption = {
  id: string
  value: string
  label: string
}

export type ValidationRules = {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  validate?: (value: string | boolean | string[] | null) => string | null
  errorMessage?: string
}

export type FormGeneratorProps = {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "checkbox"
    | "radio"
    | "file"
    | "date"
    | "tel"
    | "time"
    | "link"
  inputType: "select" | "input" | "textarea" | "checkbox" | "radio" | "color"
  options?: TOption[]
  label?: string
  checkboxLabel?: ReactNode
  placeholder?: string
  name: string
  lines?: number
  className?: string
  suggesstionText?: string
  defaultValue?: string | number | boolean | string[] | null
  hasRequiredMark?: boolean
  disabled?: boolean
  onUpdate: (
    name: string,
    value: string | boolean | string[] | null,
    error: string | null
  ) => void
  validation?: ValidationRules
  error: string | null
}

const FormGenerator = ({
  inputType,
  options,
  label,
  checkboxLabel,
  defaultValue = "",
  placeholder,
  name,
  type = "text",
  lines = 3,
  className,
  validation = {},
  error,
  hasRequiredMark = false,
  disabled = false,
  suggesstionText = "",
  onUpdate,
}: FormGeneratorProps) => {
  const [value, setValue] = useState<
    string | boolean | number | string[] | null
  >(defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (defaultValue) setValue(defaultValue)
  }, [defaultValue])

  const validateField = (val: string | boolean | string[] | null) => {
    if (
      validation.required &&
      (!val || (typeof val === "string" && !val.trim()))
    )
      return "This field is required."
    if (
      validation.minLength &&
      typeof val === "string" &&
      val.length < validation.minLength
    )
      return `Minimum length is ${validation.minLength}.`
    if (
      validation.maxLength &&
      typeof val === "string" &&
      val.length > validation.maxLength
    )
      return `Maximum length is ${validation.maxLength}.`
    if (
      validation.min !== undefined &&
      typeof val === "number" &&
      val < validation.min
    )
      return `Minimum value is ${validation.min}.`
    if (
      validation.max !== undefined &&
      typeof val === "number" &&
      val > validation.max
    )
      return `Maximum value is ${validation.max}.`
    if (
      validation.pattern &&
      typeof val === "string" &&
      !validation.pattern.test(val)
    )
      return validation.errorMessage ?? "Invalid format."

    if (validation.validate && typeof validation.validate === "function") {
      const customError = validation.validate(val)
      if (customError) return customError
    }
    return null
  }

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let newValue: string | boolean | null = event.target.value
    if (event.target.type === "checkbox")
      newValue = (event.target as HTMLInputElement).checked

    setValue(newValue)
    onUpdate(name, newValue, validateField(newValue))
  }

  return (
    <label className={`form-group ${className ? className : ""}`}>
      {label && (
        <span className="form-label">
          {label}
          {hasRequiredMark && validation.required && (
            <span className="text-danger ps-2">*</span>
          )}
        </span>
      )}

      <div className="input-wrapper">
        {inputType === "input" && (
          <div className="input-suggestion-wrapper">
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={typeof value === "string" ? value : ""}
              onChange={handleChange}
              disabled={disabled}
              minLength={validation.minLength}
              maxLength={validation.maxLength}
              autoComplete="off"
              onFocus={() => setIsFocused(true)}
              className={`form-input  ${
                isFocused && error ? "input-error" : ""
              } ${disabled && "cursor-blocked"} `}
            />
            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </div>
        )}

        {inputType === "select" && options && (
          <>
            <select
              name={name}
              value={typeof value === "string" ? value : ""}
              onChange={handleChange}
              className={`form-input ${disabled && "cursor-blocked"}`}
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </>
        )}

        {inputType === "textarea" && (
          <>
            <textarea
              name={name}
              placeholder={placeholder}
              rows={lines}
              value={typeof value === "string" ? value : ""}
              onChange={handleChange}
              className={`form-input ${disabled && "cursor-blocked"}`}
            />
            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </>
        )}

        {inputType === "checkbox" && (
          <div className="form-checkbox">
            <input
              type="checkbox"
              name={name}
              checked={typeof value === "boolean" ? value : false}
              onChange={handleChange}
              className={`checkbox-input ${disabled && "cursor-blocked"}`}
            />
            {checkboxLabel && (
              <span className="form-label">{checkboxLabel}</span>
            )}
            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </div>
        )}

        {inputType === "radio" && options && (
          <div className="form-radio">
            {options.map((option) => (
              <Fragment key={option.value}>
                <label key={option.value} className="radio-label">
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={handleChange}
                    className={`radio-input ${disabled && "cursor-blocked"}`}
                  />
                  {option.label}
                </label>
                {suggesstionText !== "" && (
                  <div className="suggesstion-info-wrapper">
                    <img src={INFO_ICON} alt="info" width={15} />
                    <span className="suggesstion-text">{suggesstionText}</span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}

        {inputType === "color" && (
          <ColorPicker
            name={name}
            onChange={(imageURL) =>
              onUpdate(name, imageURL, validateField(imageURL))
            }
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue as string}
          />
        )}

        {isFocused && error && <span className="form-error">{error}</span>}
      </div>
    </label>
  )
}
export default FormGenerator

const ColorPicker = ({
  name,
  onChange,
  disabled,
  placeholder,
  defaultValue,
}: {
  onChange: (color: string) => void
  name: string
  disabled: boolean
  placeholder?: string
  defaultValue?: string
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultValue)
  const predefinedColors = ["#EB690F", "#FFFFFF", "#000000"]

  useEffect(() => {
    if (defaultValue) {
      setSelectedColor(defaultValue)
    }
  }, [defaultValue])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    onChange(color)
  }

  return (
    <div>
      <div className="color-picker-wrapper">
        {predefinedColors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className={`color-item ${selectedColor === color && "active"}`}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className="color-input-wrapper">
        <div className="color-preview">
          <input
            type="color"
            name={name}
            disabled={disabled}
            value={selectedColor}
            placeholder={placeholder}
            onChange={(e) => handleColorChange(e.target.value)}
            className="color-input"
          />
          <div
            className="color-box"
            style={{ backgroundColor: selectedColor }}
          />
        </div>

        <span className="color-input-text">{selectedColor}</span>
      </div>
    </div>
  )
}
