"use client"

import classNames from "classnames"
import { HTMLAttributes } from "react"

export interface FormItemProps extends HTMLAttributes<HTMLLabelElement> {
  label: string
  required?: boolean
  htmlFor?: string
}

const FormItem = ({
  label,
  required,
  htmlFor,
  children,
  ...attrs
}: FormItemProps) => {
  return (<>
    <label
      {...attrs}
      htmlFor={htmlFor}
      className={classNames(
        'pt-2 relative',
        required && 'before:content-["*"] before:absolute before:-left-3 before:text-dangerous',
        attrs.className
      )}
    >
      {label}
    </label>
    {children}
  </>)
}

export default FormItem
