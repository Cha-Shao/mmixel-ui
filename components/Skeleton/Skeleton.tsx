import classNames from "classnames"
import { HTMLAttributes } from "react"

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  deep?: boolean
  text?: boolean
}

const Skeleton = ({
  deep,
  text,
  ...attrs
}: SkeletonProps) => {
  return (
    <div
      {...attrs}
      className={classNames(
        "animate-pulse min-h-4",
        deep ? "bg-background" : "bg-foreground",
        text ? "rounded-lg" : "rounded-2xl",
        attrs.className
      )}
    />
  )
}

export default Skeleton
