"use client"

import classNames from "classnames"
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react"

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void
  errMessage?: string | null
  rounded?: boolean
}

const Input = ({
  onChange,
  errMessage,
  rounded,
  ...attrs
}: InputProps,
  ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <input
      {...attrs}
      ref={ref}
      placeholder={errMessage || attrs.placeholder}
      className={classNames(
        "outline-none",
        "px-3 py-2",
        rounded ? "rounded-full" : "rounded-lg",
        "border duration-200",
        attrs.disabled
          ? "bg-muted cursor-no-drop"
          : errMessage
            ? "border-dangerous bg-dangerous bg-opacity-20 placeholder:text-dangerous"
            : "border-border focus:border-primary bg-transparent",
        attrs.placeholder?.startsWith("【") && "placeholder:-indent-2",
        attrs.className
      )}
      onChange={e => onChange && onChange(e.target.value)}
    />
  )
}

export default forwardRef(Input)
