import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import Cell_Drag from '../components/Cell_Drag';
import TimeSelector from '../components/TimeSelector';
import TimeSelector_Canvas from '../components/TimeSelector_Canvas';
import './createEvent.css';

class CreateEvent extends Component {
    render() { 
        return (
            <div>
                {/* <Calendar month={10} year={2020}>{Cell_Drag}</Calendar> */}
                {/* <table style={{marginTop: "10%", borderCollapse: "collapse", padding: 0}}>
                    <tbody>
                        <tr>
                            <td style={{margin: 0, padding: 0}}><TimeSelector header="Sun">{Cell_Drag}</TimeSelector></td>
                            <td style={{margin: 0, padding: 0}}><TimeSelector header="Mon">{Cell_Drag}</TimeSelector></td>
                            <td style={{margin: 0, padding: 0}}><TimeSelector header="Tue">{Cell_Drag}</TimeSelector></td>
                            <td style={{margin: 0, padding: 0}}><TimeSelector header="Wed">{Cell_Drag}</TimeSelector></td>
                            <td style={{margin: 0, padding: 0}}><TimeSelector header="Thu">{Cell_Drag}</TimeSelector></td>
                            <td style={{margin: 0, padding: 0}}><TimeSelector header="Fri">{Cell_Drag}</TimeSelector></td>
                            <td style={{margin: 0, padding: 0}}><TimeSelector header="Sat">{Cell_Drag}</TimeSelector></td>
                        </tr>
                    </tbody>

                </table> */}
                Cell Height: 10
                <TimeSelector_Canvas cellsAcross={7} cellWidth={20} cellHeight={10}/>
                Cell Height: 20
                <TimeSelector_Canvas cellsAcross={7} cellWidth={20} cellHeight={20}/>
                Cell Height: 40
                <TimeSelector_Canvas cellsAcross={7} cellWidth={20} cellHeight={40}/>
            </div>
        );
    }
}
 
export default CreateEvent;