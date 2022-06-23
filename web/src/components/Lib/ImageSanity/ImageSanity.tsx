import React from 'react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Img from 'next/image'
import GetSanityImageUrl from '../SanityImageURL/SanityImageURL'

type Props = {
  src: SanityImageSource
  width?: number
  height?: number
  quality?: number
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
}

const urlBuilder = ({ src, width, height, quality, fit = 'fill' }: Props) => {
  let i = GetSanityImageUrl(src)
  if (typeof width === 'number') {
    i = i.width(width)
  }
  if (typeof height === 'number') {
    i = i.height(height)
  }
  if (typeof quality === 'number' && quality > 0 && quality <= 100) {
    i = i.quality(quality)
  }
  if (typeof fit === 'string') {
    i = i.fit(fit)
  }
  return i.url()
}

export default function ImageSanity(props: Props) {
  console.log(urlBuilder({ ...props }))
  return (
    <Img
      src={urlBuilder({ ...props })}
      layout={
        props.width && typeof props.width === 'number' ? 'responsive' : 'fill'
      }
      quality={props.quality || 75}
      // placeholder="blur"
      width={props.width}
      height={props.height}
      sizes="(max-width: 800px) 100vw, 800px"
    />
  )
}