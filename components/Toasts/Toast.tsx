"use client"

import { motion } from "framer-motion"
import { Card } from "../Card"
import { Button } from "../Button"
import useToasts from "./useToasts"
import {
  useEffect,
} from "react"

export interface ToastProps {
  id: number
  label: string
  error?: boolean
}

const Toast = ({
  id,
  label,
  error,
}: ToastProps) => {
  const toasts = useToasts()

  // 10秒自动关闭
  useEffect(() => {
    const timer = setTimeout(() => {
      toasts.remove(id)
    }, 1e4)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
    >
      <Card
        border
        className="shadow relative"
      >
        <div className="flex pr-10">
          <div className="mr-2">
            {error
              ? <span className="icon-[ph--x-circle-bold] text-2xl text-dangerous" />
              : <span className="icon-[ph--check-circle-bold] text-2xl text-success" />
            }
          </div>
          <p className="grow">{label}</p>
        </div>
        <Button
          variant="ghost"
          rounded
          iconOnly
          icon="icon-[ph--x-bold]"
          onClick={() => toasts.remove(id)}
          className="absolute top-4 right-4"
        />
      </Card>
    </motion.div>
  )
}

export default Toast
