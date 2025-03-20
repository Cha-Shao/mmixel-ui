import classNames from "classnames"
import { Title } from "../Title"
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
} from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  border?: boolean
  deep?: boolean
  size?: "sm" | "md" | "lg"
}

const Card = ({
  title,
  border,
  deep,
  size,
  ...attrs
}: CardProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      {...attrs}
      ref={ref}
      className={classNames(
        border ? "simple-border" : "",
        "rounded-2xl p-6",
        deep ? "bg-background" : "bg-foreground",
        attrs.className
      )}
    >
      {title && (
        <Title className="mb-6" size={size}>{title}</Title>
      )}
      {attrs.children}
    </div>
  )
}

export default forwardRef(Card)
