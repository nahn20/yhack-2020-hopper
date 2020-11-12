import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import './collapse.css';

class ModifiedCollapse extends Component {
    state = {
        isOpened: this.props.isOpened,
    }
    toggleCollapse = () => {
        let state = this.state;
        state.isOpened = !state.isOpened;
        this.setState(state);
    }
    componentDidMount = () => {
        if(this.props.autoToggle){
            this.toggleCollapse();
        }
    }
    render() { 
        return (
            <Collapse isOpened={this.state.isOpened}>
                {this.props.children}
            </Collapse>
        );
    }
}
 
export default ModifiedCollapse;