"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image, { ImageProps } from "next/image"
import { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "../Button"
import classNames from "classnames"
import useIsClient from "../../utils/isClient"

export interface ImagePreviewProps extends ImageProps {
  previewWidth?: number
  previewHeight?: number
  onOpen?: () => void
  onClose?: () => void
}

const ImagePreview = (
  {
    previewWidth = 1920,
    previewHeight = 1080,
    ...attrs
  }: ImagePreviewProps,
  ref: ForwardedRef<HTMLImageElement>
) => {
  const isClient = useIsClient()
  const imageRef = useRef<HTMLImageElement>(null)

  useImperativeHandle(ref, () => imageRef.current as HTMLImageElement)

  const [show, setShow] = useState<boolean>(false)

  return (<>
    <Image
      ref={imageRef}
      {...attrs}
      src={attrs.src}
      alt={attrs.alt || ""}
      className={classNames(
        attrs.className,
        "cursor-pointer",
      )}
      onClick={e => {
        setShow(true)
        attrs.onClick?.(e)
      }}
    />
    {isClient && createPortal((
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames(
              "fixed inset-0",
              "flex justify-center items-center",
              "bg-black bg-opacity-50",
              "z-10",
            )}
            onClick={() => {
              setShow(false)
              attrs.onClose?.()
            }}
          >
            <Button
              variant="ghost"
              iconOnly
              icon="icon-[ph--x-bold]"
              className="absolute top-4 right-4 text-white"
              onClick={() => {
                setShow(false)
                attrs.onClose?.()
              }}
            />
            <Image
              src={attrs.src}
              alt={attrs.alt || ""}
              width={previewWidth}
              height={previewHeight}
              className="max-w-[80vw] max-h-[80vh] object-contain cursor-zoom-out"
            />
          </motion.div>
        )}
      </AnimatePresence>
    ),
      document.body
    )}
  </>)
}

export default forwardRef(ImagePreview)
