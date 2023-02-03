import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
      </a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-item nav-link"><NavLink to="/">Home</NavLink></a>
        </li>
        <li class="nav-item">
          <a class="nav-item nav-link"><NavLink to="/games">Games</NavLink></a>
        </li>
        <li class="nav-item">
          <a class="nav-item nav-link"><NavLink to="/upload">Upload</NavLink></a>
        </li>
      </ul>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <NavLink to="/SignIn">
            <a class="nav-item nav-link active">Sign In</a>
          </NavLink>
          <NavLink to="/login">
            <a class="nav-item nav-link">Log In</a>
          </NavLink>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;