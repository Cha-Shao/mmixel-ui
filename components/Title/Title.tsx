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
            "text-2xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-2",
            attrs.className
          )}
        />
      )
    case "md":
      return (
        <h2
          {...attrs}
          className={classNames(
            "text-3xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-4",
            attrs.className
          )}
        />
      )
    case "lg":
      return (
        <h1
          {...attrs}
          className={classNames(
            "text-5xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-6",
            attrs.className
          )}
        />
      )
    case "xl":
      return (
        <h1
          {...attrs}
          className={classNames(
            "text-7xl font-bold",
            typeof attrs.children === "string" &&
            attrs.children.startsWith("【") &&
            "-indent-10",
            attrs.className
          )}
        />
      )
  }
}

export default Title
