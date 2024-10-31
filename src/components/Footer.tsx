import './styles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer' >
      <div className="footer-item">
        <a href="https://github.com/blokuspokus/shortcut-trainer" >
          <span>&lt;/&gt;</span> github
        </a>
      </div>
      <div className="footer-item">
          created by <a href="https://github.com/blokuspokus">@blokuspokus</a>
      </div>
      <div className="footer-item">
        <a href="https://twitter.com/ian_le_blanc" className="x-handle">
          <span>𝕏</span> @ian_le_blanc
        </a>
      </div>
    </footer>
  )
}

export default Footer
