import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import CalendarCell from '../components/CalendarCell';

class CreateEvent extends Component {
    render() { 
        return (
            <div>
                <Calendar month={10} year={2020}>{CalendarCell}</Calendar>
            </div>
        );
    }
}
 
export default CreateEvent;