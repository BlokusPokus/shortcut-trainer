//#region Imports
// React and Third-party Libraries
import React from 'react';
// Styles
import '../styles/Footer.css';
// Constants
import { SOCIAL_MEDIA } from '../constants/socialMediat';

// Types
import { FooterProps } from '../types/types';
//#endregion

const Footer: React.FC<FooterProps> = ({
  githubUrl = SOCIAL_MEDIA.GITHUB_URL,
  twitterHandle = SOCIAL_MEDIA.TWITTER_HANDLE,
  authorGithub = SOCIAL_MEDIA.AUTHOR_GITHUB,
}) => {
  return (
    <footer className="footer">
      <div className="footer-item">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <span>&lt;/&gt;</span> github
        </a>
      </div>
      <div className="footer-item">
        created by{' '}
        <a
          href={`https://github.com/${authorGithub.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {authorGithub}
        </a>
      </div>
      <div className="footer-item">
        <a
          href={`https://twitter.com/${twitterHandle.replace('@', '')}`}
          className="x-handle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>𝕏</span> {twitterHandle}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
