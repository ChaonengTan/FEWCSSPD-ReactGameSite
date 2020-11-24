import React, { Component } from "react"
import "./Breakout/breakout.css"
// import canvas from "./Breakout/index"
import game from "./Breakout/index"

class BreakoutGame extends Component{
    constructor(props){
        super(props)
        this.canvas = React.createRef();
    }
    componentDidMount(){
        // Canvas
        this.ctx = this.canvas.current.getContext('2d');
        // Create Game
        this.game = new game("myCanvas")
    }
    render(){
        return (
            <div>
                 <canvas ref={this.canvas} id="myCanvas" width="480" height="320"></canvas>
            </div>
         );
    }
}

export default BreakoutGame