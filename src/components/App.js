import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./Footer"
import Index from "./Index"
import Breakout from "./BreakoutGame"
import FruitCatchGame from "./FruitCatchGame"

function App() {
  return (
    <Router>
      <div className="App">
        <div className="OpacityOverlay">
          <Navbar />
          <div className="Route">
            <Route exact path="/" component={Index}/>
            <Route path="/Breakout" component={Breakout} />
            <Route path="/FruitCatch" component={FruitCatchGame} />
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
