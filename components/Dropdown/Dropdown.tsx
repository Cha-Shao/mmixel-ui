"use client"

import useIsClient from "../../utils/isClient"
import classNames from "classnames"
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion"
import { cloneElement, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export interface DropdownProps extends HTMLMotionProps<"div"> {
  trigger: React.ReactElement
  children: React.ReactNode
  topOffset?: number
  leftOffset?: number
  keepOpen?: boolean
}

const Dropdown = ({
  trigger,
  children,
  topOffset = 0,
  leftOffset = 0,
  keepOpen = false,
  ...attrs
}: DropdownProps) => {
  const isClient = useIsClient()
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  const [position, setPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

  useEffect(() => {
    const handleDrop = (e: MouseEvent) => {
      if (
        e.target === triggerRef.current
        || triggerRef.current?.contains(e.target as Node)
        || (() => keepOpen && dropdownRef.current?.contains(e.target as Node))()
      ) setOpen(true)
      else setOpen(false)

    }

    addEventListener("click", handleDrop)
    return () => {
      removeEventListener("click", handleDrop)
    }
  })

  useEffect(() => {
    if (open && triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const hoverCardRect = dropdownRef.current.getBoundingClientRect()

      const topOffset = triggerRect.bottom + scrollY
      const leftOffset = triggerRect.left
        + scrollX
        + triggerRect.width / 2
        - hoverCardRect.width / 2

      setPosition({
        top: topOffset,
        left: leftOffset
          // // card超出屏幕的话
          - (leftOffset + hoverCardRect.width > innerWidth
            ? leftOffset + hoverCardRect.width - innerWidth
            : 0),
      })
    }
  }, [open])

  return (<>
    {cloneElement(
      trigger,
      {
        ...trigger.props,
        ref: triggerRef,
      }
    )}
    {isClient && createPortal(
      (
        <AnimatePresence>
          {open && (
            <motion.div
              {...attrs}
              ref={dropdownRef}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 8 }}
              exit={{ opacity: 0, y: 0 }}
              className={classNames(
                "absolute z-30",
                attrs.className
              )}
              style={{
                ...attrs.style,
                top: position.top + topOffset,
                left: position.left + leftOffset,
              }}
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

export default Dropdown
