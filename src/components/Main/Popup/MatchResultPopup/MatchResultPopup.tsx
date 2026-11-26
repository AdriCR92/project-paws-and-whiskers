import type { MatchResultPopupProps } from '../../../../types/types'
import { Link } from 'react-router-dom'
import { breeds } from '../../../../data/breeds'
import catIcon from '../../../../images/cat-icon.png'
import { describeBreed } from '../../../../utils/describeBreed'
import Popup from '../Popup'
import '../../../../styles/MatchResultPopup.css'

export default function MatchResultPopup({ dialogRef, result, onRetake }: MatchResultPopupProps) {
  const description = result && describeBreed(result.breed)
  const breedName = result?.breed.breed
  const image = breeds.find(({ name }) => name.toLowerCase() === breedName?.toLowerCase())?.image

  return (
    <Popup dialogRef={dialogRef} label="Your Pawfect Match" className="match-result-popup" closeText="×">
      {result ? (
        <div className="match-result-popup__layout">
          <div className="match-result-popup__media">
            <img
              className={image ? 'match-result-popup__photo' : 'match-result-popup__icon'}
              src={image?.src ?? catIcon}
              alt={image?.alt ?? ''}
            />
          </div>
          <div className="match-result-popup__content">
            <h2>Your Pawfect Match</h2>
            <p className="match-result-popup__breed">{breedName}</p>
            {description && <p>{description}</p>}
            {result.preferenceCount === 0 && (
              <p>Here’s a breed to explore.</p>
            )}
            <div className="match-result-popup__actions">
              <Link className="match-result-popup__link" to={`/explore?apiBreed=${encodeURIComponent(result.breed.breed)}`}>
                Explore this breed
              </Link>
              <button type="button" className="match-result-popup__retake" onClick={onRetake}>
                Retake quiz
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="match-result-popup__content">
          <h2>No matches found</h2>
          <p>Try changing a preference or selecting No preference or Anywhere.</p>
        </div>
      )}
    </Popup>
  )
}
