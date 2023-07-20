// import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import './App.css';

// import { CurrentUserContext } from '../contexts/CurrentUserContext';

// const INITIAL_USER = {};

const projectLinkStatic = 'https://github.com/AgeShinobi/how-to-learn';
const projectLinkAdaptive = '';
const projectLinkApp = '';
const praktikumLink = 'https://practicum.yandex.ru/';
const githubLink = 'https://github.com/AgeShinobi';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const loggedIn = true;
  // const [currentUser, setCurrentUser] = useState(INITIAL_USER);

  // const navigate = useNavigate();

  // const cbLogout = () => {
  //   localStorage.removeItem(JWT_KEY);
  //   setLoggedIn(false);
  //   setCurrentUser(INITIAL_USER);
  //   navigate("/sign-in", { replace: true });
  // }

  return (
    <div className="App">
      {/* <CurrentUserContext.Provider value={currentUser}> */}
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header loggedIn={loggedIn}/>
              <Main
                projectLinkStatic={projectLinkStatic}
                projectLinkAdaptive={projectLinkAdaptive}
                projectLinkApp={projectLinkApp}
                githubLink={githubLink}
              />
              <Footer
                githubLink={githubLink}
                praktikumLink={praktikumLink}
              />
            </>
          }
        />
        <Route
          path='/movies'
          element={
            <>
              <Header loggedIn={loggedIn}/>
              <Movies />
              <Footer
                githubLink={githubLink}
                praktikumLink={praktikumLink}
              />
            </>
          }
        />
      </Routes>
      {/* </CurrentUserContext.Provider> */}
    </div>
  );
}

export default App;
