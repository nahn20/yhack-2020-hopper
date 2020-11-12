import React, { Component } from 'react';
import { THEME } from '../helper'

class CalendarCell extends Component {
    constructor(props){
        super(props);
        this.ref = React.createRef();
        this.state = {
            highlighted: 0,
        }
    }
    handleClick = () => {
        this.props.handleClick();
        let state = this.state;
        state.highlighted = +!!!state.highlighted;
        this.setState(state);
    }
    disable = () => {
        if(!!this.highlighted){
            let state = this.state;
            state.highlighted = 0;
            this.setState(state);
        }
    }
    render() { 
        return (
            <div onClick={this.handleClick} style={{
                minHeight: "6px",
                textAlign: "center",
                backgroundColor: THEME[0],
            }}>
                <div style={{
                    borderRadius: "50%",
                    color: THEME[+!!!this.state.highlighted],
                    backgroundColor: THEME[this.state.highlighted],
                    transition: "background-color 0.2s ease",
                }}>{this.props.children}</div>
            </div>
        );
    }
}
 
export default CalendarCell;