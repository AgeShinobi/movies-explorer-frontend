import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';


function Main({
  projectLinkStatic,
  projectLinkAdaptive,
  projectLinkApp,
  githubLink
}) {
  return (
    <div className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio
        linkStatic={projectLinkStatic}
        linkAdaptive={projectLinkAdaptive}
        linkApp={projectLinkApp}
        githubLink={githubLink}
      />
    </div>
  );
}

export default Main;