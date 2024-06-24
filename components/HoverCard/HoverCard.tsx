"use client"

import { cloneElement, useEffect, useRef, useState } from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { createPortal } from "react-dom"
import classNames from "classnames"

export interface HoverCardProps extends HTMLMotionProps<'div'> {
  trigger: React.ReactElement
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
}

const HoverCard = ({
  trigger,
  children,
  openDelay = 0,
  closeDelay = 200,
  ...attrs
}: HoverCardProps) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const hoverCardRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<NodeJS.Timeout | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      if (
        e.target === triggerRef.current
        || hoverCardRef.current?.contains(e.target as Node)
      ) {
        if (openTimer.current) {
          clearTimeout(openTimer.current)
        }
        openTimer.current = setTimeout(() => {
          setOpen(true)
        }, openDelay)

      }
      else {
        if (openTimer.current) {
          clearTimeout(openTimer.current)
        }
        openTimer.current = setTimeout(() => {
          setOpen(false)
        }, closeDelay)
      }
    }

    addEventListener("mouseover", handleHover)
    addEventListener("mouseout", handleHover)
    return () => {
      removeEventListener("mouseover", handleHover)
      removeEventListener("mouseout", handleHover)
    }
  }, [])

  return (<>
    {cloneElement(
      trigger,
      {
        ...trigger.props,
        ref: triggerRef,
      })}
    {createPortal(
      (
        <AnimatePresence>
          {open && (
            <motion.div
              ref={hoverCardRef}
              initial={{
                opacity: 0,
                x: triggerRef.current!.getBoundingClientRect().left
                  - (hoverCardRef.current
                    ? (hoverCardRef.current.getBoundingClientRect().width
                      ? hoverCardRef.current.getBoundingClientRect().width / 2
                      : 132)
                    : 132
                  )
                  + triggerRef.current!.getBoundingClientRect().width / 2,
                y: triggerRef.current!.getBoundingClientRect().bottom
              }}
              animate={{
                opacity: 1,
                y: triggerRef.current!.getBoundingClientRect().bottom + 10
              }}
              exit={{
                opacity: 0,
                y: triggerRef.current!.getBoundingClientRect().bottom
              }}
              className={classNames(
                'absolute z-10',
                attrs.className
              )}
              style={{
                top: 0,
                ...attrs.style,
              }}
              {...attrs}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence >
      ),
      document.body
    )}
  </>)
}

export default HoverCard
