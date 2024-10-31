import LandingPage from './components/LandingPage'
import './components/styles/themes.css'
import './components/styles/LandingPage.css'
import PalletProvider from './PalletContext'

const App = () => {


  return (
    <PalletProvider >
      <LandingPage  />
    </PalletProvider>
  )
}

export default App
