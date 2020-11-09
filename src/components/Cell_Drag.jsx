import React, { Component } from 'react';

class Cell_Drag extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: this.props.content,
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
                unselectable="on" 
                onMouseOver={this.toggle} 
                onMouseDown={this.onMouseDown} 
                style={{
                    backgroundColor: this.state.color,
                    WebkitTransition: "background-color 0.5s",
                    transition: "background-color 0.5s",
                    textAlign: "center"
                }}>

                {this.state.content}
            </div>
        );
    }
}
 
export default Cell_Drag;