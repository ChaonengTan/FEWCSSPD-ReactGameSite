import React, { Component } from "react"
import "./FruitCatch.css"
import game from "./FruitCatch/index"

class FruitCatchGame extends Component{
    constructor(props){
        super(props)
        this.canvas = React.createRef();
    }
    componentDidMount(){
        // Canvas
        this.ctx = this.canvas.current.getContext('2d');
        // Create Game
        this.game = new game("fruitCatchCanvas")
    }
    render(){
        return (
            <div>
                 <canvas ref={this.canvas} id="fruitCatchCanvas" width="480" height="320"></canvas>
            </div>
         );
    }
}

export default FruitCatchGame