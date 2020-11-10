import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import Cell_Drag from '../components/Cell_Drag';
import TimeSelector from '../components/TimeSelector';

class CreateEvent extends Component {
    render() { 
        return (
            <div>
                <Calendar month={10} year={2020}>{Cell_Drag}</Calendar>
                <TimeSelector header="Sun">{Cell_Drag}</TimeSelector>
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
                
            </div>
        );
    }
}
 
export default CreateEvent;