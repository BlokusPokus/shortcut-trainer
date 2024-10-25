import React from 'react'
import { usePalletContext } from '../PalletContext';

const Hero = () => {
  const { theme } = usePalletContext();
  return (
    <div className={`intro-text ${theme}`}>don't bang your head too hard. your goal is to practice your shortcut skills.</div>

  )
}

export default Hero