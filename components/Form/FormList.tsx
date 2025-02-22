"use client"

import classNames from "classnames"
import { FormHTMLAttributes } from "react"

const FormList = (
  props: FormHTMLAttributes<HTMLFormElement>
) => {
  return (
    <form
      {...props}
      className={classNames(
        "grid gap-4",
        props.className
      )}
      onSubmit={e => {
        props.onSubmit
          ? props.onSubmit(e)
          : e.preventDefault()
      }}
    >
      {props.children}
    </form>
  )
}

export default FormList
