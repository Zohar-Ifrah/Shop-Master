import { useEffect, useRef, useState } from "react"

import { eventBusService } from "../services/event-bus.service"


export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      console.log('Got msg', msg)
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`msg ${msg.type}`}>
      <button onClick={closeMsg}></button>
      {msg.txt}
    </section>
  )
}

