import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import Cell_Drag from '../components/Cell_Drag';
import TimeSelector from '../components/TimeSelector';
import TimeSelector_Canvas from '../components/TimeSelector_Canvas';
import './createEvent.css';

class Test extends Component {
    constructor(props){
        super(props);
        this.timeSelectRefs = [React.createRef()];
    }
    submitResults = () => {
        let data = this.timeSelectRefs[0].current.formatData();
        console.log(JSON.stringify(data));
    }
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
                <TimeSelector_Canvas ref={this.timeSelectRefs[0]} cellsAcross={7} cellWidth={40} cellHeight={30} height={800}/>
                <button onClick={this.submitResults}>
                    Submit
                </button>
            </div>
        );
    }
}
 
export default Test;