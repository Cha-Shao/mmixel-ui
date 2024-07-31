'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

const isValidSrc = (src: string) => {
  return src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://')
}

const ImageMarkdown = ({
  src,
  fallbackSrc = '/default_image.png',
  ...props
}: Omit<ImageProps, | 'src' | 'onError'> & {
  src: string
  fallbackSrc?: string
}) => {
  const [imgSrc, setImgSrc] = useState(
    isValidSrc(src) ? src : fallbackSrc
  )

  const handleError = () => {
    setImgSrc(fallbackSrc)
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={handleError}
    />
  )
}

export default ImageMarkdown
