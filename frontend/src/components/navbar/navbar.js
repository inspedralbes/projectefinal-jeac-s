import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <p className="navbar-brand" href="#">
            <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
        </p>
        <ul className="navbar-nav mr-auto">
            <NavLink to="/">
            <li className="nav-item">
            <p className="nav-item nav-link">Home</p>
            </li>
            </NavLink>
            <NavLink to="/games">
            <li className="nav-item">
            <p className="nav-item nav-link">Games</p>
            </li>
            </NavLink>
            <NavLink to="/upload">
            <li className="nav-item">
            <p className="nav-item nav-link">Upload</p>
            </li>
            </NavLink>
        </ul>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
            <NavLink to="/SignIn">
                <p className="nav-item nav-link">Sign In</p>
            </NavLink>
            <NavLink to="/login">
                <p className="nav-item nav-link">Log In</p>
            </NavLink>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;