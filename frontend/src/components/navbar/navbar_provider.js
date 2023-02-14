import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';

function Navbar() {

  const data = useSelector(state => state.data);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  function logout() {
    dispatch(actions.logout());
  }


  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
      </a>

      <ul class="navbar-nav mr-auto">
        <NavLink to="/games">
          <li class="nav-item">
            <a class="nav-item nav-link">Games</a>
          </li>
        </NavLink>
        {isLoggedIn ?
          <NavLink to="/upload">
            <li class="nav-item">
              <a class="nav-item nav-link">Upload</a>
            </li>
          </NavLink> :
          <a></a>
        }
      </ul>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        {isLoggedIn ?
          <div class="navbar-nav ml-auto">
            <NavLink to="/profile">
              <a class="nav-item nav-link">Profile</a>
            </NavLink>
            <NavLink to="/">
              <a class="nav-item nav-link" onClick={() => logout()}>Log Out</a>
            </NavLink>
          </div> :
          <div class="navbar-nav ml-auto">
            <NavLink to="/signin">
              <a class="nav-item nav-link">Sign In</a>
            </NavLink>

            <NavLink to="/login">
              <a class="nav-item nav-link">Log In</a>
            </NavLink>
          </div>}
      </div>
    </nav >
  )
}

export default Navbar;