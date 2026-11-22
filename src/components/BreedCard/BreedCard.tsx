type BreedCardProps = {
  name: string;
  description: string;
};

function BreedCard({ name, description }: BreedCardProps) {
    return (
        <article className="breed-card">
            <h2 className="breed-card__name">{name}</h2>
            <p className="breed-card__description">{description}</p>
        </article>  
    )
}

export default BreedCard