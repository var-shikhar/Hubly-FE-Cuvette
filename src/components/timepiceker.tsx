import "./css/timePicker.css"
import { useRef, useEffect } from "react"

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

const TimePicker = ({ state, onChange }: TTimePickerProps) => {
  const hours = range(24)
  const minutes = range(60)
  const seconds = range(60)

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)
  const isProgrammaticScroll = useRef(false)

  const onScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    type: keyof TTime
  ) => {
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false
      return
    }

    if (!ref.current) return

    const scrollTop = ref.current.scrollTop
    const itemHeight = 30
    const centerOffset = ref.current.clientHeight / 2

    const index = Math.round(
      (scrollTop + centerOffset - itemHeight / 2) / itemHeight
    )

    const newValue =
      type === "hour"
        ? hours[index]
        : type === "minute"
        ? minutes[index]
        : seconds[index]

    // Only update if value actually changed (avoid redundant renders)
    if (state[type] !== newValue) {
      onChange({ ...state, [type]: newValue })
    }
  }

  const scrollToValue = (
    ref: React.RefObject<HTMLDivElement | null>,
    value: string
  ) => {
    const itemHeight = 30
    const index = parseInt(value, 10)

    if (!ref.current) return

    const centerOffset = ref.current.clientHeight / 2
    const top = index * itemHeight - centerOffset + itemHeight / 2

    isProgrammaticScroll.current = true
    ref.current.scrollTo({
      top,
      behavior: "auto",
    })
  }

  useEffect(() => {
    scrollToValue(hourRef, state.hour)
    scrollToValue(minuteRef, state.minute)
    scrollToValue(secondRef, state.second)
  }, [])

  return (
    <div className="time-picker">
      <div
        className="time-column"
        ref={hourRef}
        onScroll={() => onScroll(hourRef, "hour")}
      >
        {hours.map((h) => (
          <div
            key={h}
            className={`time-item ${state.hour === h ? "active-time" : ""}`}
          >
            {h}
          </div>
        ))}
      </div>
      <div className="colon">:</div>
      <div
        className="time-column"
        ref={minuteRef}
        onScroll={() => onScroll(minuteRef, "minute")}
      >
        {minutes.map((m) => (
          <div
            key={m}
            className={`time-item ${state.minute === m ? "active-time" : ""}`}
          >
            {m}
          </div>
        ))}
      </div>
      <div className="colon">:</div>
      <div
        className="time-column"
        ref={secondRef}
        onScroll={() => onScroll(secondRef, "second")}
      >
        {seconds.map((s) => (
          <div
            key={s}
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
