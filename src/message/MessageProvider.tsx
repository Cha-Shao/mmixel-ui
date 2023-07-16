import {
  PropsWithChildren,
  createContext,
  useMemo,
  useState
} from "react"
import MessageComponent from "./Message"
import { AnimatePresence } from "framer-motion"

export type MessageType = "default" | "success" | "warning" | "error" | "loading" | "custom"
export interface Message {
  id: number
  type: MessageType
  content: string
}

export const messageContext = createContext<MessageFunction | null>(null)

interface MessageFunction {
  (content: string): void
  success: (content: string) => void
  warning: (content: string) => void
  error: (content: string) => void
  loading: (content: string) => void
  custom: (content: string) => void
}

export const MessageProvider = (props: PropsWithChildren & {
  interval?: number
}) => {
  const {
    interval = 7000
  } = props
  const [messages, setMessages] = useState<Message[]>([])

  const messageHandler = (type: MessageType) => (content: string) => {
    setMessages(prevMessages => [...prevMessages, {
      id: Date.now(),
      type,
      content,
    }])
    setTimeout(() => {
      setMessages(prevMessages => {
        prevMessages.shift()
        return [...prevMessages]
      })
    }, interval)
  }

  const message: MessageFunction = (content: string) => messageHandler("default")(content)
  message.success = messageHandler("success")
  message.warning = messageHandler("warning")
  message.error = messageHandler("error")
  message.loading = messageHandler("loading")
  message.custom = messageHandler("custom")

  const context = useMemo(() => (
    message
  ), [message])

  return (
    <messageContext.Provider value={context}>
      <div className="m-message-list fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <AnimatePresence>
          {messages.map(message => (
            <MessageComponent {...message} key={message.id} />
          ))}
        </AnimatePresence>
      </div>
      {props.children}
    </messageContext.Provider>
  )
}