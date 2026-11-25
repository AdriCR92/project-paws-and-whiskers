import type { ReactNode, Ref } from 'react'

type PopupProps = {
  dialogRef: Ref<HTMLDialogElement>
  label: string
  children: ReactNode
  className?: string
  closeText?: string
}

export default function Popup({ dialogRef, label, children, className, closeText = 'Close' }: PopupProps) {
  return (
    <dialog 
    ref={dialogRef} 
    className={className ? `popup ${className}` : 'popup'}
    aria-label={label}
    onClick={(event) => {
        const dialog = event.currentTarget

        if (event.target !== dialog) return
        
        const { left, right, top, bottom } = dialog.getBoundingClientRect()
        const clickedOutside = 
        event.clientX < left ||
        event.clientX > right ||
        event.clientY < top ||
        event.clientY > bottom

        if (clickedOutside) dialog.close()
        }}
    >
      <form method="dialog" className="popup__controls">
        <button type="submit" aria-label="Close">{closeText}</button>
      </form>
      {children}
    </dialog>
  )
}