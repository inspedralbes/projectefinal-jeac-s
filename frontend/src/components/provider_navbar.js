import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';

function Navbar() {

  const data = useSelector(state => state.data);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  function logout() {
    dispatch(actions.logout());
    localStorage.setItem('access_token', "0");
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
      </a>

      <ul className="navbar-nav mr-auto">
        <NavLink to="/games">
          <li className="nav-item">
            <a className="nav-item nav-link">Games</a>
          </li>
        </NavLink>
        <NavLink to="/game">
          <li className="nav-item">
            <a className="nav-item nav-link">BallGame</a>
          </li>
        </NavLink>

        {isLoggedIn ?
          (<NavLink to="/upload">
            <li className="nav-item">
              <a className="nav-item nav-link">Upload</a>
            </li>
          </NavLink>
          ) :
          null
        }
         {isLoggedIn ?
          (<NavLink to="/gameStore">
            <li className="nav-item">
              <a className="nav-item nav-link">Game Store</a>
            </li>
          </NavLink>
          ) :
          null
        }
      </ul>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">

          <NavLink to="/ranking">
            <li className="nav-item">
              <a className="nav-item nav-link">Ranking</a>
            </li>
          </NavLink>
        </div>
        {isLoggedIn ?
          <div className="navbar-nav ml-auto">
            <NavLink to="/userInfo">
              <a className="nav-item nav-link">Profile</a>
            </NavLink>
            <NavLink to="/">
              <a className="nav-item nav-link" onClick={() => logout()}>Log Out</a>
            </NavLink>
          </div> :
          <div className="navbar-nav ml-auto">
            <NavLink to="/signin">
              <a className="nav-item nav-link">Sign In</a>
            </NavLink>

            <NavLink to="/login">
              <a className="nav-item nav-link">Log In</a>
            </NavLink>
          </div>}
      </div>
    </nav >
  )
}

export default Navbar;