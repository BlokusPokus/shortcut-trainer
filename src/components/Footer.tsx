import React from 'react';
import './styles/Footer.css';

interface FooterProps {
  githubUrl?: string;
  twitterHandle?: string;
  authorGithub?: string;
}

const Footer: React.FC<FooterProps> = ({
  githubUrl = "https://github.com/blokuspokus/shortcut-trainer",
  twitterHandle = "@ian_le_blanc",
  authorGithub = "@blokuspokus"
}) => {
  return (
    <footer className='footer'>
      <div className="footer-item">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <span>&lt;/&gt;</span> github
        </a>
      </div>
      <div className="footer-item">
        created by <a href={`https://github.com/${authorGithub.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{authorGithub}</a>
      </div>
      <div className="footer-item">
        <a href={`https://twitter.com/${twitterHandle.replace('@', '')}`} className="x-handle" target="_blank" rel="noopener noreferrer">
          <span>𝕏</span> {twitterHandle}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
