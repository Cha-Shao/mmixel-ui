import classNames from "classnames"
import { Title } from "../Title"
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes
} from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  border?: boolean
  deep?: boolean
}

const Card = ({
  title,
  border,
  deep,
  ...attrs
}: CardProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      {...attrs}
      ref={ref}
      className={classNames(
        border ? "border border-border" : "",
        "rounded-2xl",
        deep ? "bg-background" : "bg-foreground",
        attrs.className
      )}
    >
      {title && (
        <div className="p-6 pb-0">
          <Title>{title}</Title>
        </div>
      )}
      <div className="p-6">
        {attrs.children}
      </div>
    </div>
  )
}

export default forwardRef(Card)
