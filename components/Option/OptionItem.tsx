"use client"

import classNames from "classnames"
import { HTMLAttributes } from "react"

export interface OptionItemProps extends HTMLAttributes<HTMLLabelElement> {
  label: string
  required?: boolean
  htmlFor?: string
}

const OptionItem = ({
  label,
  required,
  htmlFor,
  children,
  ...attrs
}: OptionItemProps) => {
  return (<>
    <label
      {...attrs}
      htmlFor={htmlFor}
      className={classNames(
        "pt-2 relative",
        required && "before:content-['*'] before:absolute before:-left-3 before:text-dangerous",
        attrs.className
      )}
    >
      {label}
    </label>
    {children}
  </>)
}

export default OptionItem
