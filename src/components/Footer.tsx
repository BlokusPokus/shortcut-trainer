import React from 'react'
import './Footer.css'
import { usePalletContext } from '../PalletContext';

const Footer: React.FC = () => {
    const { theme } = usePalletContext();
  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-item">
        <a href="https://github.com/blokuspokus/shortcut-trainer" target="_blank" rel="noreferrer">
          <span>&lt;/&gt;</span> github
        </a>
      </div>
      <div className="footer-item">
        <span>
          created by <a href="https://github.com/blokuspokus" target="_blank" rel="noreferrer">@blokuspokus</a>
        </span>
      </div>
      <div className="footer-item">
        <a href="https://twitter.com/ian_le_blanc" target="_blank" rel="noreferrer" className="x-handle">
          <span>𝕏</span> @ian_le_blanc
        </a>
      </div>
    </footer>
  )
}

export default Footer
