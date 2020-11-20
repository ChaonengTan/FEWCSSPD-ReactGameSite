import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./Footer"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Route exact path="/" component={Index}/>
        <Route path="/Breakout" component={Breakout} />
        <Route path="/FruitCatch" component={FruitCatch} /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
