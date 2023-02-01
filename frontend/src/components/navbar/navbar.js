import { NavLink } from "react-router-dom"

function Navbar() {
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