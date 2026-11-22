import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BreedCard from './components/BreedCard/BreedCard'

function App() {

  return (
    <>
      <Header />
      <main className='page-content'>
        <h1> Explore Cat Breeds</h1>
        <BreedCard
          name="Maine Coon"
          description="A cat breed known for its large size and tufted ears."
        />
        <BreedCard
          name="Persian"
          description="A cat breed with a long, thick coat and a sweet, docile personality."
        />
      </main>
      <Footer />
    </>
  )
}

export default App
