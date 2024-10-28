import React from 'react'
import { usePalletContext } from '../PalletContext';

interface HeroProps {
    gameStarted: boolean;
}

const Hero = ({ gameStarted }: HeroProps) => {
  return (
<div>
    {gameStarted ? <> </> : <div className={`intro-text`}>don't bang your head too hard. your goal is to practice your shortcut skills.</div>}
    </div>
  )
}

export default Hero