import { useEffect, useRef } from 'react'
import Popup from '../Popup'
import '../../../../styles/ErrorPopup.css'

type ErrorPopupProps = {
  title: string
  description?: string
  onRetry: () => void
}

export default function ErrorPopup({ title, description, onRetry }: ErrorPopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()

    return () => dialog?.close()
  }, [])

  return (
    <Popup dialogRef={dialogRef} label={title} className="error-popup" closeText="×">
      <span className="error-popup__icon" aria-hidden="true">!</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <button
        className="error-popup__retry"
        type="button"
        onClick={() => {
          dialogRef.current?.close()
          onRetry()
        }}
      >
        Try again
      </button>
    </Popup>
  )
}
