import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import {
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
  useState
} from "react"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLDivElement> {
  content: string
  rounded?: boolean
  backgroundColor?: string
  contentColor?: string
}

const Tooltip = forwardRef(function Tooltip(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    rounded = false,
    backgroundColor = "white",
    contentColor = "black",
  } = props
  const [visible, setVisible] = useState(false)
  return (
    <div ref={ref}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={classNames(
        "m-tooltip",
        props.className,
        "relative w-fit"
      )}>
      {props.children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="m-tooltip-children-container absolute w-max pb-4 bottom-full left-1/2 -translate-x-1/2">
            <div className="m-tooltip-arrow absolute bottom-2 left-1/2 -translate-x-1/2" style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `6px solid ${backgroundColor}`,
            }} />
            <span className={classNames(
              "m-tooltip-children",
              "px-2 py-1",
              "shadow-lg",
              rounded ? "rounded-full" : "rounded-md"
            )}
              style={{ backgroundColor: backgroundColor, color: contentColor }}>{props.content}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default Tooltip
