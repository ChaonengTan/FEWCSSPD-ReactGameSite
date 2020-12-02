import githubLogo from './images/githubIcon.png'
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
        <div className="NavRight">
            DarkMode: 
            <div>
                <label className="switch">
                    <input type="checkbox" onClick={(e) => toggleDarkMode()}/>
                    <span className="slider round"></span>
                </label>
            </div>
            <a href="https://github.com/ChaonengTan"><img src={githubLogo} alt='' height="40" width="40"/></a>
        </div>
    </div>
  )
}
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
export default Navbar