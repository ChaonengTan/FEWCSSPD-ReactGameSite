import React, {Component} from "react"
import "./Breakout/breakout.css"
import Ball from './js/ball';
import Brick from './js/bricks';
import Paddle from './js/paddle';

class BreakoutGame extends Component{
    constructor(props){
        super(props)
        this.canvas = React.createRef();
    }
    componentDidMount(){

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