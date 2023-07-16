"use client"
import {
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
  useState
} from "react"
import Title from "../title/Title"
import classNames from "classnames"
import {
  AnimatePresence,
  motion
} from "framer-motion"
import Icon, { DownArrow } from "../icon/Icon"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLDivElement> {
  title: string
  initOpen?: boolean
}

const Collapse = forwardRef(function Collapse(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [expanded, setExpanded] = useState(props.initOpen || false)

  return (
    <div ref={ref} className="m-collapse">
      <div
        className="p-4 flex items-center"
        onClick={() => { setExpanded(!expanded) }}>
        <Title className="flex-grow line-clamp-1">
          {props.title}
        </Title>
        <Icon icon={DownArrow} className={classNames(
          "shrink-0 duration-200",
          { "rotate-180": expanded }
        )} />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="m-collapse-children p-4 pt-0">
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default Collapse
