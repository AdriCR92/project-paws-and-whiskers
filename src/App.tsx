import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from "./components/Main/Main"
import AboutPage from './pages/AboutPage/AboutPage'

function App() {

  return (
    <>
      <Header />
      <main className='page-content'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
