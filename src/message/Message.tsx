import classNames from "classnames"
import { MessageType } from "./MessageProvider"
import { motion } from "framer-motion"
import Icon, { Error, Info, Loading, Success, Warning } from "../icon/Icon"

export interface Props {
  id: number
  type: MessageType
  content: string
}

const parseIcon = (type: MessageType) => {
  switch (type) {
    default: return <Icon icon={Info} className="mr-1" style={{ color: "#10bef6" }} />
    case "success": return <Icon icon={Success} className="mr-1" style={{ color: "#00c562" }} />
    case "warning": return <Icon icon={Warning} className="mr-1" style={{ color: "#ffbe32" }} />
    case "error": return <Icon icon={Error} className="mr-1" style={{ color: "#f54245" }} />
    case "loading": return <Icon icon={Loading} className="animate-spin mr-1" style={{ color: "#a3a3a3" }} />
    case "custom": return null
  }
}

const Message = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={classNames(
        "m-message",
        "bg-white dark:bg-dark",
        "rounded-md",
        "shadow-md",
        "px-2 py-1 mb-1",
        "w-fit",
        "flex items-center",
      )}>
      {parseIcon(props.type)}
      {props.type !== "custom"
        ? <p>{props.content}</p>
        : props.content
      }
    </motion.div>
  )
}

export default Message
