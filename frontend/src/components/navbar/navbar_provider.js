import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';


function Navbar() {

  const data = useSelector(state => state.data);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
      </a>
      <ul class="navbar-nav mr-auto">
        <NavLink to="/">
          <li class="nav-item">
            <a class="nav-item nav-link">Home</a>
          </li>
        </NavLink>
        <NavLink to="/games">
          <li class="nav-item">
            <a class="nav-item nav-link">Games</a>
          </li>
        </NavLink>
        <NavLink to="/upload">
          <li class="nav-item">
            <a class="nav-item nav-link">Upload</a>
          </li>
        </NavLink>
      </ul>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        {isLoggedIn ?
          <div class="navbar-nav ml-auto">
            <NavLink to="/profile">
              <a class="nav-item nav-link">Profile</a>
            </NavLink>
        
              <a class="nav-item nav-link">Log Out</a>
           
          </div> :
          <div class="navbar-nav ml-auto">
            <NavLink to="/SignIn">
              <a class="nav-item nav-link">Sign In</a>
            </NavLink>

            <NavLink to="/login">
              <a class="nav-item nav-link">Log In</a>
            </NavLink>
          </div>}
      </div>
    </nav>
  )
}


export default Navbar;