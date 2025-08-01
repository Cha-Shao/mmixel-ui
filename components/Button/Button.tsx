"use client"

import classNames from "classnames"
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

export type ButtonSize = "ty" | "sm" | "md" | "lg"

export type ButtonVariant = "solid" | "primary" | "muted" | "ghost" | "link" | "border" | "dangerous"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <button
      {...attrs}
      ref={ref}
      disabled={disabled || loading}
      className={classNames(
        "inline-flex items-center duration-200",
        {
          "bg-primary text-white": variant === "primary",
          "bg-muted": variant === "muted",
          "hover:bg-muted": variant === "ghost",
          "border border-border hover:bg-muted": variant === "border",
          "bg-dangerous text-foreground": variant === "dangerous",
        },
        // 只在variant不是link时应用padding，text大小始终生效
        {
          "text-xs": size === "ty",
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",

          "p-1": size === "ty" && variant !== "link",
          "px-2": size === "ty" && variant !== "link" && !iconOnly,

          "p-1.5": size === "sm" && variant !== "link",
          "px-3": size === "sm" && variant !== "link" && !iconOnly,

          "p-2": size === "md" && variant !== "link",
          "px-4": size === "md" && variant !== "link" && !iconOnly,

          "p-3": size === "lg" && variant !== "link",
          "px-6": size === "lg" && variant !== "link" && !iconOnly,
        },
        rounded ? "rounded-full" : "rounded-lg",
        (disabled || loading)
          ? "opacity-50 cursor-not-allowed"
          : "hover:brightness-110 active:scale-95 active:brightness-95 duration-200",
        attrs.className
      )}
    >
      {!icon && (
        <AnimatePresence>
          {loading && (
            <motion.span
              key={"loading"}
              className={classNames(
                "icon-[ph--circle-notch-bold] animate-spin duration-200",
                size === "ty" && "text-sm",
                size === "sm" && "text-base",
                size === "md" && "text-xl",
                size === "lg" && "text-2xl",
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
          )}
        </AnimatePresence>
      )}
      {icon && (
        <span
          className={classNames(
            "flex justify-center items-center",
            size === "ty" && "text-sm",
            size === "sm" && "text-base",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl",
            !iconOnly && "mr-2"
          )}
        >
          <span className={classNames(
            loading ? "icon-[ph--circle-notch-bold] animate-spin" : icon
          )} />
        </span>
      )}
      {attrs.children}
    </button>
  )
}

export default forwardRef(Button)
