"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image, { ImageProps } from "next/image"
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "../Button"
import classNames from "classnames"

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
    ...props
  }: ImagePreviewProps,
  ref: ForwardedRef<HTMLImageElement>
) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [position, setPosition] = useState<{ x: number, y: number }>({
    x: 0,
    y: 0,
  })
  const [size, setSize] = useState<{ w: number, h: number }>({
    w: 0,
    h: 0,
  })

  useImperativeHandle(ref, () => imageRef.current as HTMLImageElement)

  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setPosition({
      x: imageRef.current?.getBoundingClientRect().left || 0,
      y: imageRef.current?.getBoundingClientRect().top || 0,
    })
    setSize({
      w: imageRef.current?.getBoundingClientRect().width || 0,
      h: imageRef.current?.getBoundingClientRect().height || 0,
    })
    show
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll')
  }, [show])

  return (<>
    <Image
      ref={imageRef}
      {...props}
      className={classNames(
        props.className,
        "cursor-pointer",
      )}
      onClick={e => {
        setShow(true)
        props.onClick?.(e)
      }}
    />
    {createPortal((
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames(
              'fixed inset-0',
              'flex justify-center items-center',
              'bg-black bg-opacity-50',
              'z-10',
            )}
            onClick={() => {
              setShow(false)
              props.onClose?.()
            }}
          >
            <Button
              variant="ghost"
              iconOnly
              icon="icon-[ph--x-bold]"
              className="absolute top-4 right-4 text-white"
              onClick={() => {
                setShow(false)
                props.onClose?.()
              }}
            />
            <Image
              src={props.src}
              alt={props.alt}
              width={previewWidth}
              height={previewHeight}
              className="max-w-[80vw] cursor-zoom-out"
            />
          </motion.div>
        )}
      </AnimatePresence>
    ), document.body
    )}
  </>)
}

export default forwardRef(ImagePreview)
