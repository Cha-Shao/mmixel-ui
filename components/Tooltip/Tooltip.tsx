"use client"

import useIsClient from "../../utils/isClient"
import { cloneElement, ForwardedRef, forwardRef, ReactElement, useEffect, useImperativeHandle, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"

export interface TooltipProps {
  label: string
  placement?: "top" | "right" | "bottom" | "left"
  children: ReactElement
}

const Tooltip = ({
  label,
  placement = "top",
  children,
}: TooltipProps,
  ref: ForwardedRef<HTMLDivElement>) => {
  const isClient = useIsClient()
  const internalTriggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => internalTriggerRef.current as HTMLDivElement)

  const [show, setShow] = useState<boolean>(false)
  const [styles, setStyles] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      if (
        internalTriggerRef.current?.contains(e.target as Node)
      ) {
        setShow(true)
      }
      else {
        setShow(false)
      }
    }
    document.addEventListener("mouseover", handleHover)
    return () => {
      document.removeEventListener("mouseover", handleHover)
    }
  }, [])

  useEffect(() => {
    if (internalTriggerRef.current && tooltipRef.current) {
      const { top, left, width, height } = internalTriggerRef.current.getBoundingClientRect()
      const tooltipWidth = tooltipRef.current.getBoundingClientRect().width
      const tooltipHeight = tooltipRef.current.getBoundingClientRect().height
      switch (placement) {
        case "top":
          setStyles({
            top: top - tooltipHeight + scrollY,
            left: left + scrollX + width / 2 - tooltipWidth / 2,
          })
          break
        case "right":
          setStyles({
            top: top + height / 2 - tooltipHeight / 2 + scrollY,
            left: left + scrollX + width,
          })
          break
        case "bottom":
          setStyles({
            top: top + height + scrollY,
            left: left + scrollX + width / 2 - tooltipWidth / 2,
          })
          break
        case "left":
          setStyles({
            top: top + height / 2 - tooltipHeight / 2 + scrollY,
            left: left + scrollX - tooltipWidth,
          })
          break
      }
    }
  }, [show, placement])

  return isClient && (<>
    {cloneElement(
      children,
      {
        ...children.props,
        ref: internalTriggerRef,
      }
    )}
    {createPortal(
      (
        <AnimatePresence>
          {show && (
            <motion.span
              ref={tooltipRef}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 8 }}
              exit={{ opacity: 0, y: 0 }}
              className="absolute z-40 px-1.5 py-0.5 rounded-full bg-black text-white text-xs whitespace-nowrap"
              style={styles}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      ),
      document.body
    )}
  </>)
}

export default forwardRef(Tooltip)
