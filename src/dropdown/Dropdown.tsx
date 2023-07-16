"use client"
import {
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  forwardRef,
  useState
} from "react"
import {
  motion,
  AnimatePresence,
} from "framer-motion"
import classNames from "classnames"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLDivElement> {
  trigger: ReactElement
  listen?: "hover" | "click"
  direction?: "top" | "bottom"
}

const Dropdown = forwardRef(function Dropdown(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    listen = "hover",
    direction = "bottom",
  } = props
  const [visible, setVisible] = useState(false)

  return (
    <div ref={ref} className={classNames(
      "m-dropdown",
      props.className,
      "relative w-fit",
    )}
      onMouseEnter={() => listen === "hover" && setVisible(true)}
      onMouseLeave={() => listen === "hover" && setVisible(false)}
      onClick={() => { listen === "click" && setVisible(!visible) }}
    >
      {props.trigger}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.15 }}
            onClick={() => { setVisible(false) }}
            className={classNames(
              "m-dropdown-children-container",
              "absolute w-max z-10",
              { "pb-2 bottom-full -left-1/4 -translate-x-1/2 -translate-y-full": direction === "top" },
              { "pt-2 top-full -left-1/4 -translate-x-1/2": direction === "bottom" },
            )}>
            <div className="m-dropdown-children rounded-xl overflow-hidden shadow-md border dark:border-zinc-700">
              {props.children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default Dropdown
