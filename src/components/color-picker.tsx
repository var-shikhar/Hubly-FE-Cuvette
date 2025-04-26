type TColorPickerProps = {
  defaultColor: string[]
  currentColor: string | undefined
  onChange: (state: string) => void
}

const ColorPicker = ({
  onChange,
  currentColor,
  defaultColor,
}: TColorPickerProps) => {
  const handleColorChange = (color: string) => {
    onChange(color)
  }

  return (
    <div>
      <div className="color-picker-wrapper">
        {defaultColor.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className={`color-item`}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className="color-input-wrapper">
        <div className="color-preview">
          <input
            type="color"
            name={"ColorPicker"}
            value={currentColor}
            placeholder="Choose a color"
            onChange={(e) => handleColorChange(e.target.value)}
            className="color-input"
          />
          <div
            className="color-box"
            style={{ backgroundColor: currentColor }}
          />
        </div>

        <span className="color-input-text">{currentColor}</span>
      </div>
    </div>
  )
}

export default ColorPicker
