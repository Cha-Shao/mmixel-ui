"use client"

import classNames from "classnames"
import { HTMLAttributes } from "react"

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  htmlFor?: string
  required?: boolean
}

const FormItem = ({
  label,
  htmlFor,
  required,
  ...props
}: FormItemProps) => {
  return (
    <div {...props}>
      <label htmlFor={htmlFor} className={classNames(
        "block mb-2 relative",
        required && "before:content-['*'] before:absolute before:-left-3 before:text-dangerous",
      )}>
        {label}
      </label>
      {props.children}
    </div>
  )
}

export default FormItem
