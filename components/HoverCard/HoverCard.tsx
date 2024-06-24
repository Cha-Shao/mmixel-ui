"use client"

import { cloneElement, useEffect, useRef, useState } from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { createPortal } from "react-dom"
import classNames from "classnames"
import useIsClient from "../../utils/isClient"

export interface HoverCardProps extends HTMLMotionProps<'div'> {
  trigger: React.ReactElement
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
  topOffset?: number
  leftOffset?: number
}

const HoverCard = ({
  trigger,
  children,
  openDelay = 0,
  closeDelay = 200,
  topOffset = 0,
  leftOffset = 0,
  ...attrs
}: HoverCardProps) => {
  const isClient = useIsClient()
  const triggerRef = useRef<HTMLDivElement>(null)
  const hoverCardRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<NodeJS.Timeout | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const [position, setPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node)
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

  useEffect(() => {
    if (open && triggerRef.current && hoverCardRef.current) {
      setPosition({
        top: triggerRef.current.getBoundingClientRect().bottom + scrollY,
        left: triggerRef.current.getBoundingClientRect().left + scrollX - (hoverCardRef.current.getBoundingClientRect().width - triggerRef.current.getBoundingClientRect().width) / 2,
      })
    }
  }, [open])

  return isClient && (<>
    {cloneElement(
      trigger,
      {
        ...trigger.props,
        ref: triggerRef,
      })
    }
    {createPortal(
      (
        <AnimatePresence>
          {open && (
            <motion.div
              ref={hoverCardRef}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: 0 }}
              className={classNames(
                'absolute z-10',
                attrs.className
              )}
              style={{
                top: position.top + topOffset,
                left: position.left + leftOffset,
                ...attrs.style,
              }}
              {...attrs}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      ),
      document.body
    )}
  </>)
}

export default HoverCard
