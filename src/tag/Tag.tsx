import classNames from "classnames"
import { ForwardedRef, HTMLAttributes, PropsWithChildren, forwardRef } from "react"
import { Size } from "../types"
import Icon, { Close } from "../icon/Icon"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLSpanElement> {
  size?: Size
  rounded?: boolean
  closeable?: boolean
  onClose?: () => void
}

const Tag = forwardRef(function Tag(
  props: Props,
  ref: ForwardedRef<HTMLSpanElement>
) {
  const { size = "md" } = props
  return (
    <span
      {...props}
      ref={ref}
      className={classNames(
        "m-tag",
        props.className,
        "inline-flex items-center border",
        props.rounded ? "rounded-full" : "rounded-sm",
        { "h-6 text-sm px-1": size === "sm" },
        { "h-7 px-2": size === "md" },
        { "h-9 text-lg px-2": size === "lg" },
      )}>
      {props.children}
      {props.closeable && <Icon icon={Close} className="m-tag-close cursor-pointer" />}
    </span>
  )
})

export default Tag
