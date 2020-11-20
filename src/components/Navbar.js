import "./Navbar.css"
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="Navbar">
        <div className="NavContent">
            <h1>Navbar</h1>
            <NavLink
                className="nav-link"
                activeClassName="nav-link-active"
                exact to="/">Home
            </NavLink>
            <NavLink
                className="nav-link"
                activeClassName="nav-link-active"
                to="/Breakout">Breakout
            </NavLink>
        </div>
        <div>
            <p>Link to github</p>
        </div>
    </div>
  )
}

export default Navbar