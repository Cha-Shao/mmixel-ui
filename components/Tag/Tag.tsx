import { HTMLAttributes } from "react"

export interface TagProps extends HTMLAttributes<HTMLSpanElement> { }

const Tag = (props: TagProps) => {
  return (
    <span
      {...props}
      className={`bg-muted px-1 rounded ${props.className}`}
    >
      {props.children}
    </span>
  )
}

export default Tag
