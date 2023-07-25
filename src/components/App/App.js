import React from 'react'; // TODO: +useState
import { Route, Routes } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import './App.css';

// import { CurrentUserContext } from '../contexts/CurrentUserContext';

// const INITIAL_USER = {};

const projectLinkStatic = 'https://github.com/AgeShinobi/how-to-learn';
const projectLinkAdaptive = '';
const projectLinkApp = '';
const praktikumLink = 'https://practicum.yandex.ru/';
const githubLink = 'https://github.com/AgeShinobi';

function App() {
  // Для проверки обоих видов Header. TODO: useState
  const loggedIn = false;

  return (
    <div className="App">
      {/* <CurrentUserContext.Provider value={currentUser}> */}
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header loggedIn={loggedIn} />
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
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer
                githubLink={githubLink}
                praktikumLink={praktikumLink}
              />
            </>
          }
        />
        <Route
          path='/saved-movies'
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer
                githubLink={githubLink}
                praktikumLink={praktikumLink}
              />
            </>
          }
        />
        <Route
          path='/profile'
          element={
            <>
              <Header loggedIn={loggedIn}/>
              <Profile />
            </>
          }
        />
        <Route
          path='/signup'
          element={
            <Register />
          }
        />
        <Route
          path='/signin'
          element={
            <Login />
          }
        />
        <Route
          path='/*'
          element={
            <NotFound />
          }
        />
      </Routes>
      {/* </CurrentUserContext.Provider> */}
    </div>
  );
}

export default App;
