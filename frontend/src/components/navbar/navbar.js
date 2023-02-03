import { NavLink } from "react-router-dom"

function Navbar() {
<<<<<<< HEAD
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
            <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
        </a>
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/games" className="nav-item nav-link">Games</NavLink> 
            </li>
        </ul>
=======
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
      </a>
      <ul class="navbar-nav mr-auto">
        <NavLink to="/">
          <li class="nav-item active">
            <a class="nav-item nav-link">Home</a>
          </li>
        </NavLink>
        <NavLink to="/games">
          <li class="nav-item">
            <a class="nav-item nav-link">Games</a>
          </li>
        </NavLink>
      </ul>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <NavLink to="/SignIn">
            <a class="nav-item nav-link active">Sign In</a>
          </NavLink>
          <NavLink to="/login">
            <a class="nav-item nav-link">Log In</a>
          </NavLink>
>>>>>>> develop

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
                <a className="nav-item nav-link active" href="#">Sign In <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="#">Log In</a>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;