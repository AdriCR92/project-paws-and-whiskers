import { Route, Routes } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import AboutPage from './Main/Pages/AboutPage/AboutPage'
import ExplorePage from './Main/Pages/ExplorePage/ExplorePage'
import PawfectMatchPage from './Main/Pages/PawfectMatchPage/PawfectMatchPage'

function App() {

  return (
    <>
      <Header />
      <main className='page-content'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/pawfect-match" element={<PawfectMatchPage/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
