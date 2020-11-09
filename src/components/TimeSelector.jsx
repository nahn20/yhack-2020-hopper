import React, { Component } from 'react';
import combine_dicts from '../helper';

const MONTH_NAME_LOOKUP = [
    ["Jan", "January"],
    ["Feb", "February"],
    ["Mar", "March"],
    ["Apr", "April"],
    ["May", "May"],
    ["Jun", "June"],
    ["Jul", "July"],
    ["Aug", "August"],
    ["Sep", "September"],
    ["Oct", "October"],
    ["Nov", "November"],
    ["Dec", "December"]
];
const WEEKDAY_NAME_LOOKUP = [
    ["Sun", "Sunday"],
    ["Mon", "Monday"],
    ["Tue", "Tuesday"],
    ["Wed", "Wednesday"],
    ["Thu", "Thursday"],
    ["Fri", "Friday"],
    ["Sat", "Saturday"]
];
const tableStyle = {border: "1px solid black", borderCollapse: "collapse", padding: 0};
class TimeSelector extends Component {
    constructor(props){
        super(props);
        let month = this.props.month;
        let year = this.props.year;
        this.state = {
            month: month,
            year: year,
            firstDay: (new Date(year, month)).getDay(),
            numDays: (32 - (new Date(year, month, 32)).getDate()),
            mouseMode: 0, //0 for not clicked, 1 for clicking and turning green, -1 for clicking and turning red
        }
    }
    componentDidMount = () => {
        // document.onmousedown = () => {
        //     let state = this.state;
        //     state.mouseDown = true;
        //     this.setState(state);
        // }
        document.onmouseup = () => {
            let state = this.state;
            state.mouseMode = 0;
            this.setState(state);
        }
    }
    updateMouseMode = (value) => {
        let state = this.state;
        state.mouseMode = value;
        this.setState(state);
    }
    render() {
        let weekdays = [];
        for(let i = 0; i < WEEKDAY_NAME_LOOKUP.length; i++){
            weekdays.push(<th key={i} style={combine_dicts(tableStyle, {padding: "2px 5px"})}>{WEEKDAY_NAME_LOOKUP[i][0]}</th>)
        }
        const CellComponent = this.props.children;
        return (
            <React.Fragment>
                <div style={{
                    MozUserSelect: "none",
                    WebkitUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableStyle}>
                                {weekdays}
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}
 
export default TimeSelector;