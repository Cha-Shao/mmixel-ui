"use client"

import { AnimatePresence, motion } from "framer-motion"
import { PropsWithChildren } from "react"
import { createPortal } from "react-dom"
import { Card } from "../Card"
import { Button } from "../Button"
import useIsClient from "../../utils/isClient"

export interface ModalProps extends PropsWithChildren {
  title: string
  open: boolean
  onClose: () => void
  dismissable?: boolean
}

const Modal = ({
  title,
  open,
  onClose,
  children,
  dismissable = true,
}: ModalProps) => {
  const isClient = useIsClient()

  return isClient && createPortal((
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 dark:bg-opacity-80 flex justify-center items-center z-30"
          onClick={e =>
            e.target === e.currentTarget && dismissable && onClose()
          }
        >
          <motion.div
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.03 }}
          >
            <Card
              title={title}
              className="max-w-[80vw] min-w-96 w-full relative"
            >
              <Button
                variant="ghost"
                iconOnly
                rounded
                icon="icon-[ph--x-bold]"
                onClick={onClose}
                className="absolute right-6 top-6"
              />
              {children}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ), document.body
  )
}

export default Modal
