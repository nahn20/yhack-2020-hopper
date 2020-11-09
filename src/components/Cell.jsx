import React, { Component } from 'react';

class CalendarCell extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: this.props.date,
        }
    }
    render() { 
        return (
            <div>
                {this.state.date}
            </div>
        );
    }
}
 
export default CalendarCell;