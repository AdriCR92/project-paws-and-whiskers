import BreedCard from '../../BreedCard/BreedCard'
import '../../../../styles/ExplorePage.css'
import mainCoonPhoto from '../../../../images/mainCoonPhoto.jpeg'

function ExplorePage() {
  return (
    <>
      <header className="explore-page__intro">
        <h1 className="explore-page__title">Explore Cats</h1>
        <p>Discover cat breeds and what makes each one unique.</p>
      </header>
      <div className="breed-grid">
        <BreedCard
          name="Maine Coon"
          description="A large, long-haired cat with a bushy tail."
          image={{
            src: mainCoonPhoto,
            alt: "Brown Maine Coon with long fur and tufted ears."
          }}
        />
        <BreedCard
          name="Siamese"
          description="A short-haired cat with blue eyes and darker coloring on the face, ears, paws, and tail."
        />
        <BreedCard
          name="British Shorthair"
          description="A sturdy cat with a round face and a dense, plush coat."
        />
      </div>
    </>
  )
}

export default ExplorePage
