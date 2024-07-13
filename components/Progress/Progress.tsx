"use client"

import classNames from "classnames"
import { HTMLAttributes } from "react"
import { Title } from "../Title"

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  progress: number
  progressColor?: string
  backgroundColor?: string
  progressTextColor?: string
  backgroundTextColor?: string
  showValue?: boolean
}

const Progress = ({
  progress,
  progressColor = "hsl(var(--primary))",
  backgroundColor = "hsl(var(--muted) / 0.1)",
  progressTextColor = "white",
  backgroundTextColor = "hsl(var(--border) / 1)",
  ...attrs
}: ProgressProps) => {
  return (
    <div
      {...attrs}
      className={classNames(
        "relative min-h-2 rounded-lg overflow-hidden",
        attrs.className
      )}
      style={{
        backgroundColor,
      }}
    >
      <div
        className="absolute top-0 left-0 h-full duration-500"
        style={{
          width: `${progress}%`,
          backgroundColor: progressColor,
        }}
      />
      <div className={classNames(
        "absolute top-0 left-0",
        "w-full h-full",
        "flex items-center justify-center",
      )}>
        <Title
          className="absolute"
          style={{
            color: backgroundTextColor,
          }}
        >
          {progress}%
        </Title>
        <Title
          className="absolute text-white z-10"
          style={{
            color: progressTextColor,
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
          }}
        >{progress}%</Title>
      </div>
    </div>
  )
}

export default Progress
