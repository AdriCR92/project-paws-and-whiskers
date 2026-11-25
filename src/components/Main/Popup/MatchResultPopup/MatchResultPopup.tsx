import type { MatchResultPopupProps } from '../../../../types/types'
import { Link } from 'react-router-dom'
import catIcon from '../../../../images/cat-icon.png'
import Popup from '../Popup'
import '../../../../styles/MatchResultPopup.css'

export default function MatchResultPopup({ dialogRef, breed }: MatchResultPopupProps) {
  return (
    <Popup dialogRef={dialogRef} label="Your Pawfect Match" className="match-result-popup" closeText="×">
      {breed && (
        <div className="match-result-popup__layout">
          <div className="match-result-popup__media">
            <img
              className={breed.image ? 'match-result-popup__photo' : 'match-result-popup__icon'}
              src={breed.image?.src ?? catIcon}
              alt={breed.image?.alt ?? ''}
            />
          </div>
          <div className="match-result-popup__content">
            <h2>Your Pawfect Match</h2>
            <p className="match-result-popup__breed">{breed.name}</p>
            <p>{breed.matchSummary}</p>
            <Link className="match-result-popup__link" to={`/explore?breed=${breed.id}`}>
              Explore this breed
            </Link>
          </div>
        </div>
      )}
    </Popup>
  )
}
