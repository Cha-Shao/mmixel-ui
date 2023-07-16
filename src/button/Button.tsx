"use client"
import {
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef
} from "react"
import classNames from "classnames"
import { FullSize } from "../types"
import ButtonGroup from "./ButtonGroup"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLButtonElement> {
  type?: "default" | "primary" | "secondary" | "ghost"
  size?: FullSize
  rounded?: boolean
  square?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
}

const LoadingIcon = (props: { size: string }) => {
  const parsedWidth = (() => {
    switch (props.size) {
      case 'ty': return '12px'
      case 'sm': return '16px'
      default: return '20px'
    }
  })()
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ width: parsedWidth }}><path fill="currentColor" d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3Z" /></svg>
}

const Button = forwardRef(function Button(
  props: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const {
    type = "default",
    size = "md",
    rounded = false,
    square = false,
    disabled = false,
    loading = false,
  } = props
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={classNames(
        "m-button",
        props.className,
        // 形状
        rounded
          ? "rounded-full"
          : classNames(
            { "rounded-sm": size === "ty" },
            { "rounded-sm": size === "sm" },
            { "rounded-md": size === "md" },
            { "rounded-md": size === "lg" },
            { "rounded-lg": size === "xl" }
          ),
        square ? classNames(
          { "w-5": size === "ty" },
          { "w-6": size === "sm" },
          { "w-8": size === "md" },
          { "w-10": size === "lg" },
          { "w-12": size === "xl" },
        ) : classNames(
          { "px-1": size === "ty" },
          { "px-2": size === "sm" },
          { "px-4": size === "md" },
          { "px-6": size === "lg" },
          { "px-6": size === "xl" },
        ),
        // 加载时透明和取消动效，更改鼠标样式
        (disabled || loading)
          ? `opacity-80 ${loading ? "cursor-wait" : "cursor-no-drop"}`
          : "active:scale-95 active:brightness-95 hover:brightness-110",
        // 样式
        { "border-2 border-slate-800/10 dark:border-slate-100/10": type === "default" },
        { "bg-[#ff8729] text-white shadow-md shadow-[#ff8729]/25": type === "primary" },
        { "bg-slate-800/10 dark:bg-slate-100/10": type === "secondary" },
        { "hover:bg-slate-500/10": type === "ghost" },
        // 大小，padding在上面square的地方
        { "h-5 text-xs": size === "ty" },
        { "h-6 text-sm": size === "sm" },
        { "h-8": size === "md" },
        { "h-10 text-lg": size === "lg" },
        { "h-12 text-xl font-bold": size === "xl" },
        // 默认
        "duration-150",
        "inline-flex justify-center items-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff8729]",
      )}
      onClick={props.onClick} >

      {(props.icon || loading) && (
        <span className={classNames(
          "m-button-icon",
          { "mr-1": props.children },
          { "animate-spin": loading }
        )}>
          {loading
            ? <LoadingIcon size={size} />
            : props.icon}
        </span>
      )}

      <span className="m-button-children">{props.children}</span>
    </button >
  )
})

type ButtonComponent = typeof Button & {
  Group: typeof ButtonGroup
}

export default Button as ButtonComponent
