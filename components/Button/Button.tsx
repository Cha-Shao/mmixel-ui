import classNames from "classnames"
import { Children, HTMLAttributes } from "react"
import { AnimatePresence, motion } from "framer-motion"

export type ButtonSize = "ty" | "sm" | "md" | "lg"

export type ButtonVariant = "solid" | "muted" | "ghost" | "link"

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  rounded?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: string
}

const Button = (
  {
    variant = "solid",
    size = "md",
    iconOnly,
    rounded,
    loading,
    disabled,
    icon,
    ...attrs
  }: ButtonProps
) => {
  return (
    <button
      {...attrs}
      className={classNames(
        "flex items-center",
        variant === "muted" && "bg-muted",
        size === "ty" && `p-1 ${iconOnly ? "px-1" : "px-2"} text-xs`,
        size === "sm" && `p-1.5 ${iconOnly ? "px-1.5" : "px-3"} text-sm`,
        size === "md" && `p-2 ${iconOnly ? "px-2.5" : "px-4"} text-base`,
        size === "lg" && `p-3 ${iconOnly ? "px-3" : "px-6"} text-lg`,
        rounded ? "rounded-full" : "rounded-lg",
        (disabled || loading)
          ? "opacity-50 cursor-not-allowed"
          : classNames(
            "hover:brightness-110 active:scale-95 active:brightness-95",
            "duration-200"
          ),
        attrs.className
      )}
    >
      {(loading && !icon) && (
        <AnimatePresence mode="wait">
          <motion.span
            key={"loading"}
            className={classNames(
              "icon-[ph--circle-notch-bold] animate-spin duration-200",
              size === "ty" && "h-4",
              size === "sm" && "h-4",
              size === "md" && "h-5",
              size === "lg" && "h-6",
            )}
            initial={{
              opacity: 0,
              width: "0",
              marginRight: "0",
            }}
            animate={{
              opacity: 1,
              width: classNames(
                size === "ty" && "1rem",
                size === "sm" && "1.125rem",
                size === "md" && "1.25rem",
                size === "lg" && "1.5rem",
              ),
              marginRight: "0.5rem",
            }}
            exit={{
              opacity: 0,
              width: "0",
              marginRight: "0",
            }}
          />
        </AnimatePresence>
      )}
      {icon && (
        <span
          className={classNames(
            "icon",
            size === "ty" && "h-4",
            size === "sm" && "h-4",
            size === "md" && "h-5",
            size === "lg" && "h-6",
            loading && "mr-1"
          )}
        >
          <span className={classNames(
            loading ? "ph--circle-notch-bold" : icon
          )} />
        </span>
      )}
      {attrs.children}
    </button>
  )
}

export default Button
