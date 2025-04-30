/*
|----------------------------------------------------------------------------------
| TimePicker Component
|----------------------------------------------------------------------------------
| A scrollable time picker component for selecting hours, minutes, and seconds.
| It uses a looping (infinite scroll) UI pattern to simulate seamless scrolling.
|
| Props:
| - state (TTime): The current time state (hour, minute, second) as strings.
| - onChange (function): Callback to update time state when a new value is selected.
|
| Features:
| - Automatically normalizes values to 2-digit format (e.g., "03").
| - Triplicates hour, minute, and second arrays to simulate infinite scroll.
| - Scroll automatically centers on the selected time when mounted.
| - Handles programmatic scroll adjustments to prevent feedback loops.
|
| Accessibility:
| - Uses ARIA roles (listbox, option) for screen reader compatibility.
|
| Styling:
| - Expects associated CSS styles from `timePicker.css`.
|
| Usage:
| <TimePicker
|   state={{ hour: "12", minute: "30", second: "45" }}
|   onChange={(newTime) => console.log(newTime)}
| />
*/

import { useEffect, useRef } from "react"
import "./css/timePicker.css"

type TTime = {
  hour: string
  minute: string
  second: string
}

type TTimePickerProps = {
  state: TTime
  onChange: (state: TTime) => void
}

const range = (num: number) =>
  [...Array(num).keys()].map((i) => i.toString().padStart(2, "0"))
const hours = range(24)
const minutes = range(60)
const seconds = range(60)

// We triplicate items to simulate infinite scroll
const loopedHours = [...hours, ...hours, ...hours]
const loopedMinutes = [...minutes, ...minutes, ...minutes]
const loopedSeconds = [...seconds, ...seconds, ...seconds]

const TimePicker = ({ state, onChange }: TTimePickerProps) => {
  const normalizedState: TTime = {
    hour: state.hour.toString().padStart(2, "0"),
    minute: state.minute.toString().padStart(2, "0"),
    second: state.second.toString().padStart(2, "0"),
  }

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)
  const isProgrammaticScroll = useRef(false)

  const itemHeight = 30

  // Scroll handler for infinite scroll effect
  const onScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    type: keyof TTime,
    items: string[]
  ) => {
    // New One
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false
      return
    }
    // Till here

    if (!ref.current) return

    const scrollTop = ref.current.scrollTop
    const centerOffset = ref.current.clientHeight / 2
    const rawIndex = (scrollTop + centerOffset - itemHeight / 2) / itemHeight
    const index = Math.round(rawIndex) % items.length
    const normalizedIndex = (index + items.length) % items.length

    const baseItem = items[normalizedIndex % (items.length / 3)]

    if (!isProgrammaticScroll.current && state[type] !== baseItem) {
      onChange({ ...state, [type]: baseItem })
    }

    const maxScroll = itemHeight * items.length
    const threshold = itemHeight * 2

    if (scrollTop <= threshold) {
      isProgrammaticScroll.current = true
      ref.current.scrollTop += (items.length / 3) * itemHeight
    } else if (scrollTop >= maxScroll - threshold) {
      isProgrammaticScroll.current = true
      ref.current.scrollTop -= (items.length / 3) * itemHeight
    }

    if (isProgrammaticScroll.current) {
      setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 0)
    }
  }

  // Scroll to center selected value on mount
  const scrollToValue = (
    ref: React.RefObject<HTMLDivElement | null>,
    value: string,
    items: string[]
  ) => {
    if (!ref.current) return

    const middleStart = items.length / 3
    const index = items.findIndex(
      (v, idx) => v === value && idx >= middleStart && idx < middleStart * 2
    )

    const centerOffset = ref.current.clientHeight / 2
    const top = index * itemHeight - centerOffset + itemHeight / 2

    isProgrammaticScroll.current = true
    ref.current.scrollTo({
      top,
      behavior: "auto",
    })
  }

  // Default Scroll Value (as per the Backend)
  useEffect(() => {
    setTimeout(() => {
      scrollToValue(hourRef, normalizedState.hour, loopedHours)
      scrollToValue(minuteRef, normalizedState.minute, loopedMinutes)
      scrollToValue(secondRef, normalizedState.second, loopedSeconds)
    }, 0)
  }, [])

  return (
    <div className="time-picker">
      <div
        className="time-column"
        role="listbox"
        aria-label="Select hour"
        ref={hourRef}
        onScroll={() => onScroll(hourRef, "hour", loopedHours)}
      >
        {loopedHours.map((h, idx) => (
          <div
            key={`${h}-${idx}`}
            role="option"
            aria-selected={normalizedState.hour === h ? true : false}
            className={`time-item ${state.hour === h ? "active-time" : ""}`}
          >
            {h}
          </div>
        ))}
      </div>
      <div className="colon">:</div>
      <div
        className="time-column"
        role="listbox"
        aria-label="Select minute"
        ref={minuteRef}
        onScroll={() => onScroll(minuteRef, "minute", loopedMinutes)}
      >
        {loopedMinutes.map((m, idx) => (
          <div
            key={`${m}-${idx}`}
            role="option"
            aria-selected={state.minute === m}
            className={`time-item ${state.minute === m ? "active-time" : ""}`}
          >
            {m}
          </div>
        ))}
      </div>
      <div className="colon">:</div>
      <div
        className="time-column"
        role="listbox"
        aria-label="Select second"
        ref={secondRef}
        onScroll={() => onScroll(secondRef, "second", loopedSeconds)}
      >
        {loopedSeconds.map((s, idx) => (
          <div
            key={`${s}-${idx}`}
            role="option"
            aria-selected={state.second === s}
            className={`time-item ${state.second === s ? "active-time" : ""}`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimePicker
