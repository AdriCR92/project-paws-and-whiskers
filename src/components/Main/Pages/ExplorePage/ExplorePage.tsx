import { Link, useSearchParams } from 'react-router-dom'
import BreedCard from '../../BreedCard/BreedCard'
import { breeds } from '../../../../data/breeds'
import '../../../../styles/ExplorePage.css'

function ExplorePage() {
  const [searchParams] = useSearchParams()
  const selectedBreed = breeds.find((breed) => breed.id === searchParams.get('breed'))
  const visibleBreeds = selectedBreed ? [selectedBreed] : breeds

  return (
    <>
      <header className="explore-page__intro">
        <h1 className="explore-page__title">Explore Cats</h1>
        <p>Discover cat breeds and what makes each one unique.</p>
        {selectedBreed && (
          <Link className="explore-page__all-breeds" to="/explore">
            <span aria-hidden="true">←</span> View all breeds
          </Link>
        )}
      </header>
      <div className="breed-grid">
        {visibleBreeds.map((breed) => (
          <BreedCard
            key={breed.id}
            name={breed.name}
            description={breed.description}
            image={breed.image}
            detailsTo={selectedBreed ? undefined : `/explore?breed=${breed.id}`}
          />
        ))}
      </div>
    </>
  )
}

export default ExplorePage
