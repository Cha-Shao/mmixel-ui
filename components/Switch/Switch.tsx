"use client"

import classNames from "classnames"
import { ForwardedRef, forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from "react"

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean
  onChange?: (value: boolean) => void
  className?: string
  id?: string
  name?: string
}

const Switch = ({
  onChange,
  className,
  ...attrs
}: SwitchProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

  return (
    <>
      <input
        {...attrs}
        hidden
        ref={inputRef}
        type="checkbox"
        onChange={e => onChange?.(e.target.checked)}
        className="peer"
      />
      <div
        onClick={() => inputRef.current?.click()}
        className={classNames(
          "relative w-11 h-6 after:content-['']",
          "rounded-full",
          "peer bg-muted peer-checked:bg-primary",
          "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary ring-offset-2",
          "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-foreground",
          "after:absolute after:top-[2px] after:start-[2px] after:transition-all",
          "after:rounded-full after:h-5 after:w-5",
          "after:bg-foreground after:border-border after:border",
          className,
        )}
      />
    </>
  )
}

export default forwardRef(Switch)
