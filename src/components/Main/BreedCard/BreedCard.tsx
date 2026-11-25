import catIcon from '../../../images/cat-icon.png'
import ImagePopup from '../Popup/ImagePopup/ImagePopup';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

type BreedCardProps = {
  name: string;
  description: string;
  detailsTo?: string;
  image?: {
    src: string;
    alt: string;
  };
};

function BreedCard({ name, description, image, detailsTo }: BreedCardProps) {
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null)
  const photoDialog = useRef<HTMLDialogElement>(null)
  const photo = image?.src && image.src !== failedImageSrc ? image : undefined
  const details = (
    <>
      <h2 className="breed-card__name">{name}</h2>
      <p>{description}</p>
    </>
  )

  return (
    <article className="breed-card">
      <div className="breed-card__media">
        {photo ? (
          <button
            type="button"
            className="breed-card__photo-button"
            aria-label={`Enlarge photo of ${name}`}
            onClick={() => photoDialog.current?.showModal()}
          >
            <img
              className="breed-card__photo"
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              onError={() => setFailedImageSrc(photo.src)}
            />
          </button>
        ) : (
          <img className="breed-card__icon" src={catIcon} alt="" />
        )}
      </div>
      {detailsTo ? (
        <Link className="breed-card__content breed-card__details-link" to={detailsTo}>
          {details}
        </Link>
      ) : (
        <div className="breed-card__content">{details}</div>
      )}
      {photo && (
        <ImagePopup
          dialogRef={photoDialog}
          name={name}
          src={photo.src}
          alt={photo.alt}
        />
      )}
    </article>
  )
}

export default BreedCard
