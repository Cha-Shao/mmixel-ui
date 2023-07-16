import { FullSize } from "../types"
import classNames from "classnames"
import {
  ForwardedRef,
  HTMLAttributes,
  forwardRef
} from "react"
import AvatarGroup from "./AvatarGroup"

interface Props extends HTMLAttributes<HTMLSpanElement> {
  src?: string
  text?: string
  alt?: string
  size?: FullSize
  rounded?: boolean
  bordered?: boolean
  borderColor?: string
  backgroundColor?: string
  textColor?: string
  lazy?: boolean
}

const parseTextScale = (text: string): number => {
  if (text.length - 3 < 1) return 1
  const x = text.length - 3
  return -((4 * (x + 2)) / (x + 3)) + 4
}

const Avatar = forwardRef(function Avatar(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const size = props.size || "md"
  const lazy = props.lazy ?? true

  if (!props.src && typeof props.text === "undefined")
    throw new Error("At least one item must exist for `src` or `text`")

  return (
    <div
      ref={ref}
      className={classNames(
        "m-avatar",
        props.className,
        "overflow-hidden",
        "inline-block",
        props.rounded ? "rounded-full" : "rounded-md",
        "bg-slate-200 dark:bg-gray-800",
        { "outline outline-[0.15rem] outline-offset-2": props.bordered },
        // 大小
        { "w-8 h-8 text-xs": size === "ty" },
        { "w-10 h-10 text-sm": size === "sm" },
        { "w-12 h-12": size === "md" },
        { "w-14 h-14 text-lg": size === "lg" },
        { "w-16 h-16 text-xl": size === "xl" },
      )} style={{
        background: props.backgroundColor,
        outlineColor: props.borderColor || "#ff8729"
      }}>
      {props.src ? (
        <img src={props.src} alt={props.alt} loading={lazy ? "lazy" : "eager"}
          className="m-avatar-image object-cover w-full h-full" onError={props.onError} />
      ) : (
        <div className="m-avatar-text-container w-full h-full flex justify-center items-center overflow-hidden">
          <span className="m-avatar-text" style={{
            scale: `${parseTextScale(props.text!)}`,
            color: props.textColor
          }}>{props.text}</span>
        </div>
      )}
    </div>
  )
})

type AvatarComponent = typeof Avatar & {
  Group: typeof AvatarGroup
}

export default Avatar as AvatarComponent
