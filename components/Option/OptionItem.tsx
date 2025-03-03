"use client"

import classNames from "classnames"
import { HTMLAttributes, ReactNode } from "react"
import { HoverCard } from "../HoverCard"
import { Card } from "../Card"

export interface OptionItemProps extends HTMLAttributes<HTMLLabelElement> {
  label: string
  required?: boolean
  htmlFor?: string
  question?: ReactNode
}

const OptionItem = ({
  label,
  required,
  htmlFor,
  children,
  ...attrs
}: OptionItemProps) => {
  return (<>
    <label
      {...attrs}
      htmlFor={htmlFor}
      className={classNames(
        "pt-2 relative min-w-24",
        required && "before:content-['*'] before:absolute before:-left-3 before:text-dangerous",
        attrs.className
      )}
    >
      <span>{label}</span>
      {attrs.question && (
        <HoverCard
          trigger={(
            <span className="icon-[ph--question-bold] align-middle text-tip" />
          )}
        >
          <Card border className="!p-4 shadow">
            {attrs.question}
          </Card>
        </HoverCard>
      )}
    </label>
    {children}
  </>)
}

export default OptionItem
