import  { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
        </a>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto">
            <a class="nav-item nav-link active" href="#">Sign In <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#">Log In</a>
            <a class="nav-item nav-link"><NavLink to="/games">Games</NavLink></a>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;