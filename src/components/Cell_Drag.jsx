import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { combine_dicts } from '../helper';

class Cell_Drag extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: "red"
        }
    }
    toggle = () => {
        if(this.props.mouseMode === 1){
            let state = this.state;
            state.color = "green";
            this.setState(state);
        }
        if(this.props.mouseMode === -1){
            let state = this.state;
            state.color = "red";
            this.setState(state);
        }
    }
    onMouseDown = () => {
        this.props.updateMouseMode(this.state.color === "red" ? 1 : -1);
        let state = this.state;
        state.color = (this.state.color === "red" ? "green" : "red");
        this.setState(state);
    }
    render() { 
        return (
            <div 
                onMouseMove={this.toggle}
                onMouseDown={this.onMouseDown} 
                style={combine_dicts({
                    backgroundColor: this.state.color,
                    WebkitTransition: "background-color 0.5s",
                    transition: "background-color 0.5s",
                    textAlign: "center",
                    minHeight: "4px"
                }, this.props.style)}>

                {this.props.children}
            </div>
        );
    }
}
 
export default Cell_Drag;