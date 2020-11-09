import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import Cell_Drag from '../components/Cell_Drag';
import TimeSelector from '../components/TimeSelector';

class CreateEvent extends Component {
    render() { 
        return (
            <div>
                <Calendar month={10} year={2020}>{Cell_Drag}</Calendar>
                <div style={{marginTop: "10%"}}>
                    <TimeSelector>{Cell_Drag}</TimeSelector>
                </div>
                
            </div>
        );
    }
}
 
export default CreateEvent;