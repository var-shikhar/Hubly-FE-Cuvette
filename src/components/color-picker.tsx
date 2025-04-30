/*
|---------------------------------------------------------------------------------- 
| ColorPicker Component (For Form Input Customization)
|---------------------------------------------------------------------------------- 
| This component allows users to select a color for form customization. It displays 
| a set of predefined color swatches (from `defaultColor`) and a native HTML color 
| picker input. When a color is selected—either from the swatches or the input—it 
| triggers the `onChange` callback with the selected color value. The currently 
| selected color is also previewed visually beside the color input for clarity.
|
| Props:
| - defaultColor: Array of predefined color hex codes.
| - currentColor: The currently selected color.
| - onChange: Function called with the selected color when a change occurs.
*/

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
