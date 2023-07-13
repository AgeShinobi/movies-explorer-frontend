import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';


const projectLinkStatic = 'https://ageshinobi.github.io/how-to-learn/';
const projectLinkAdaptive = '';
const projectLinkApp = '';
const praktikumLink = 'https://practicum.yandex.ru/';
const githubLink = 'https://github.com/AgeShinobi';

function Main() {
  return (
    <div className='main'>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio
        linkStatic={projectLinkStatic}
        linkAdaptive={projectLinkAdaptive}
        linkApp={projectLinkApp}
        githubLink={githubLink}
      />
      <Footer
        githubLink={githubLink}
        praktikumLink={praktikumLink}
      />
    </div>
  );
}

export default Main;