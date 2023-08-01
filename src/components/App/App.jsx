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
const projectLinkAdaptive = 'https://github.com/AgeShinobi/russian-travel';
const projectLinkApp = 'https://github.com/AgeShinobi/react-mesto-api-full-gha';
const praktikumLink = 'https://practicum.yandex.ru/';
const githubLink = 'https://github.com/AgeShinobi';

// const INITIAL_USER = {};
// const JWT_KEY = 'jwt';

function App() {
  const loggedIn = false;
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [currentUser, setCurrentUser] = useState(INITIAL_USER);

  // const navigate = useNavigate();

  // общий функционал cbRegister & cbLogin
  // const cbAuth = (data) => {
  //   if (!data || data.error || data.message) {
  //     throw new Error('Ошибка аутентификации');
  //   }
  //   if (data.token) {
  //     localStorage.setItem(JWT_KEY, data.token);
  //     setLoggedIn(true);
  //     navigate('/', { replace: true });
  //   }
  // };
  // // Login
  // const cbLogin = async ({ email, password }) => {
  //   try {
  //     const data = await auth.authorize(email, password);
  //     cbAuth(data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // const cbRegister = async ({ email, password }) => {
  //   try {
  //     const data = await auth.register(email, password);
  //     cbAuth(data);
  //     navigate("/sign-in", { replace: true });
  //   } catch (err) {
  //     cbFailInfoPopup();
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //     cbSuccessInfoPopup();
  //   }
  // }

  return (
    <div className="app">
      {/* <CurrentUserContext.Provider value={currentUser}> */}
      <Routes>
        <Route
          path="/"
          element={(
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
          )}
        />
        <Route
          path="/movies"
          element={(
            <>
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer
                githubLink={githubLink}
                praktikumLink={praktikumLink}
              />
            </>
          )}
        />
        <Route
          path="/saved-movies"
          element={(
            <>
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer
                githubLink={githubLink}
                praktikumLink={praktikumLink}
              />
            </>
          )}
        />
        <Route
          path="/profile"
          element={(
            <>
              <Header loggedIn={loggedIn} />
              <Profile />
            </>
          )}
        />
        <Route
          path="/signup"
          element={(
            <Register
              loggedIn={loggedIn}
            />
          )}
        />
        <Route
          path="/signin"
          element={(
            <Login
              loggedIn={loggedIn}
            />
          )}
        />
        <Route
          path="/*"
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
