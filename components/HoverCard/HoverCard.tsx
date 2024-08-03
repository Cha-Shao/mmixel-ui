"use client"

import { cloneElement, ForwardedRef, forwardRef, MouseEvent, useEffect, useImperativeHandle, useRef, useState } from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { createPortal } from "react-dom"
import classNames from "classnames"
import useIsClient from "../../utils/isClient"

export interface HoverCardProps extends HTMLMotionProps<"div"> {
  trigger: React.ReactElement
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
  topOffset?: number
  leftOffset?: number
  disabled?: boolean
  onShow?: () => void
  onHide?: () => void
}

const HoverCard = ({
  trigger,
  children,
  openDelay = 0,
  closeDelay = 200,
  topOffset = 0,
  leftOffset = 0,
  disabled,
  onShow,
  onHide,
  ...attrs
}: HoverCardProps,
  ref: ForwardedRef<HTMLElement>
) => {
  const isClient = useIsClient()
  const triggerRef = useRef<HTMLDivElement>(null)
  const hoverCardRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<NodeJS.Timeout | null>(null)
  const [show, setShow] = useState<boolean>(false)

  useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement)

  const [position, setPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

  const handleOpen = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (disabled) return

    if (openTimer.current) {
      clearTimeout(openTimer.current)
    }
    openTimer.current = setTimeout(() => {
      setShow(true)
      onShow && onShow()
    }, openDelay)
  }
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (openTimer.current) {
      clearTimeout(openTimer.current)
    }
    openTimer.current = setTimeout(() => {
      setShow(false)
      onHide && onHide()
    }, closeDelay)
  }

  useEffect(() => {
    if (show && triggerRef.current && hoverCardRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const hoverCardRect = hoverCardRef.current.getBoundingClientRect()

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
  }, [show])

  return isClient && (<>
    {cloneElement(
      trigger,
      {
        ...trigger.props,
        onMouseEnter: (e: MouseEvent<HTMLElement>) => {
          handleOpen(e)
          trigger.props.onMouseEnter?.(e)
        },
        onMouseLeave: (e: MouseEvent<HTMLElement>) => {
          handleClose(e)
          trigger.props.onMouseLeave?.(e)
        },
        ref: triggerRef,
      }
    )}
    {createPortal(
      (
        <AnimatePresence>
          {show && (
            <motion.div
              {...attrs}
              ref={hoverCardRef}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 8 }}
              exit={{ opacity: 0, y: 0 }}
              className={classNames(
                "absolute z-10",
                attrs.className
              )}
              style={{
                ...attrs.style,
                top: position.top + topOffset,
                left: position.left + leftOffset,
              }}
              onMouseEnter={(e) => {
                handleOpen(e)
              }}
              onMouseLeave={(e) => {
                handleClose(e)
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

export default forwardRef(HoverCard)
