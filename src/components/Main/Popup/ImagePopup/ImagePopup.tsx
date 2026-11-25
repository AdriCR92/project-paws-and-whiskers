import type { Ref } from 'react'
import Popup from '../Popup'

type ImagePopupProps = {
  dialogRef: Ref<HTMLDialogElement>
  name: string
  src: string
  alt: string
}

export default function ImagePopup({
  dialogRef,
  name,
  src,
  alt,
}: ImagePopupProps) {
  return (
    <Popup dialogRef={dialogRef} label={`Photo of ${name}`}>
      <img className="image-popup__photo" src={src} alt={alt} loading="lazy" />
    </Popup>
  )
}