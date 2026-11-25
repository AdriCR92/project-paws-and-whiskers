import BreedCard from '../../components/BreedCard/BreedCard'

function ExplorePage() {
  return (
    <>
      <h1>Explore Cats</h1>
      <div className="breed-grid">
        <BreedCard
          name="Maine Coon"
          description="A large, long-haired cat with a bushy tail."
        />
        <BreedCard
          name="Siamese"
          description="A short-haired cat with blue eyes and darker coloring on the face, ears, paws, and tail."
        />
      </div>
    </>
  )
}

export default ExplorePage
