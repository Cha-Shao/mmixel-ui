import classNames from "classnames"
import { HTMLAttributes } from "react"

export interface TitleProps extends HTMLAttributes<HTMLHeadElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

const Title = ({
  size = "md",
  ...attrs
}: TitleProps) => {
  switch (size) {
    case "sm":
      return (
        <h3
          {...attrs}
          className={classNames(
            "text-xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-1",
            attrs.className
          )}
        />
      )
    case "md":
      return (
        <h2
          {...attrs}
          className={classNames(
            "text-2xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-3",
            attrs.className
          )}
        />
      )
    case "lg":
      return (
        <h1
          {...attrs}
          className={classNames(
            "text-4xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-5",
            attrs.className
          )}
        />
      )
    case "xl":
      return (
        <h1
          {...attrs}
          className={classNames(
            "text-6xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-8",
            attrs.className
          )}
        />
      )
  }
}

export default Title
