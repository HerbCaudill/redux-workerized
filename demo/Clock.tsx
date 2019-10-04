import React, { useState } from 'react'
import ReactCountdownClock from 'react-countdown-clock'

export const Clock = () => {
  const [time, setTime] = useState(2)
  const [seconds, setSeconds] = useState(time)
  const reset = () => {
    const t = time + 0.1
    setTime(t)
    setSeconds(t)
  }
  return (
    <ReactCountdownClock
      seconds={seconds}
      color="teal"
      timeFormat="seconds"
      weight={20}
      size={200}
      onComplete={reset}
    />
  )
}
