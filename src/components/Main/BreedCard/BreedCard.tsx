import catIcon from '../../../images/cat-icon.png'
import ImagePopup from '../Popup/ImagePopup/ImagePopup';
import { useRef, useState } from 'react';

type BreedCardProps = {
  name: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
};

function BreedCard({ name, description, image }: BreedCardProps) {
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null)
  const photoDialog = useRef<HTMLDialogElement>(null)
  const photo = image?.src && image.src !== failedImageSrc ? image : undefined

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
      <div className="breed-card__content">
        <h2 className="breed-card__name">{name}</h2>
        <p>{description}</p>
      </div>
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
