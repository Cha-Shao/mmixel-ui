"use client"

import { PropsWithChildren } from "react"

export interface ModalProps extends PropsWithChildren {
  title: string
  open: boolean
  onClose: () => void
}

const Modal = ({
  title,
  open,
  onClose,
  children,
}: ModalProps) => {
  return (
    <div>

    </div>
  )
}

export default Modal
