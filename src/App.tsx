import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import Hotkey  from './components/Hotkey'
import './components/themes.css'
import './components/LandingPage.css'
import PalletProvider from './PalletContext'

const App = () => {


  return (
    <PalletProvider >
      <LandingPage  />
    </PalletProvider>
  )
}

export default App
