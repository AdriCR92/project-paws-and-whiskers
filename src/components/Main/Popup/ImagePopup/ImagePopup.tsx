import type { ImagePopupProps } from '../../../../types/types'
import Popup from '../Popup'

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