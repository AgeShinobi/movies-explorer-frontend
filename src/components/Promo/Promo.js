import './Promo.css';
import promoImage from '../../images/promo-image.svg';

function Promo() {
  return (
    <section className='promo page__promo'>
      <div className='promo__wrapper'>
        <h1 className='promo__main-text'>
          Учебный проект студента
          факультета Веб-разработки.
        </h1>
        <p className='promo__text'>
          Листайте ниже, чтобы узнать больше про этот
          проект и его создателя.
        </p>
        <button
          type="button"
          className="promo__button"
        >
          Узнать больше
        </button>
      </div>
      <img
        src={promoImage}
        alt='Промо картинка'
        className='promo__image'
      />
    </section>
  )
}

export default Promo;