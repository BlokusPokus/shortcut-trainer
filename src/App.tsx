import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import Hotkeytest  from './components/hotkeytest'
import './components/Theme.css'
import './components/LandingPage.css'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <LandingPage toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
  )
}

export default App
