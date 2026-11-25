import catIcon from '../../images/cat-icon.png'

type BreedCardProps = {
  name: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
};

function BreedCard({ name, description, image }: BreedCardProps) {
  return (
    <article className="breed-card">
      <div className="breed-card__media">
        {image ? (
          <img className="breed-card__photo" src={image.src} alt={image.alt} loading="lazy" />
        ) : (
          <img className="breed-card__icon" src={catIcon} alt="" />
        )}
      </div>
      <div className="breed-card__content">
        <h2 className="breed-card__name">{name}</h2>
        <p>{description}</p>
      </div>
    </article>
  )
}

export default BreedCard
