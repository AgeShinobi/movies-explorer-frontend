import './Footer.css';

function Footer({ praktikumLink, githubLink }) {
  return (
    <footer className='footer page__footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__row-wrapper'>
        <p className='footer__copyright'>
          &copy;{new Date().getFullYear()}
        </p>
        <div className='footer__links'>
          <a
            className='footer__link'
            href={ praktikumLink }
            target='_blank'
            rel='noopener noreferrer'
          >
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            href={ githubLink }
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;