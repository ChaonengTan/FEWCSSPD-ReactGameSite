import githubLogo from './images/githubIcon.jpeg'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="Navbar">
        <div className="NavContent">
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
            <NavLink
                className="nav-link"
                activeClassName="nav-link-active"
                to="/FruitCatch">FruitCatch
            </NavLink>
        </div>
        <div>
            <a href="https://github.com/ChaonengTan"><img src={githubLogo} alt='' height="40" width="40"/></a>
        </div>
    </div>
  )
}

export default Navbar