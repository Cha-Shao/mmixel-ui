import classNames from "classnames"
import { Title } from "../Title"
import { HTMLAttributes } from "react"

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
}: CardProps) => {
  return (
    <div
      {...attrs}
      className={classNames(
        border ? "border border-border" : "",
        attrs.className
      )}
    >
      {title && (
        <div
          className={classNames(
            "rounded-t-2xl p-6 pb-0",
            deep ? "bg-background" : "bg-foreground",
          )}
        >
          <Title>{title}</Title>
        </div>
      )}
      <div
        className={classNames(
          !title && "rounded-t-2xl",
          deep ? "bg-background" : "bg-foreground",
          "rounded-b-2xl p-6"
        )}
      >
        {attrs.children}
      </div>
    </div>
  )
}

export default Card
