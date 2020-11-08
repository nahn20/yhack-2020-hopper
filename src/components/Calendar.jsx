import React, { Component } from 'react';


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
const tableStyle = {border: "1px solid black", borderCollapse: "collapse"};
class Calendar extends Component {
    constructor(props){
        super(props);
        let month = this.props.month;
        let year = this.props.year;
        this.state = {
            month: month,
            year: year,
            firstDay: (new Date(year, month)).getDay(),
            numDays: (32 - (new Date(year, month, 32)).getDate()),
        }
        console.log(this.state);
    }
    render() {
        let weekdays = [];
        for(let i = 0; i < WEEKDAY_NAME_LOOKUP.length; i++){
            weekdays.push(<th key={i} style={tableStyle}>{WEEKDAY_NAME_LOOKUP[i][0]}</th>)
        }
        const CellComponent = this.props.children;
        let dates = [[], [], [], [], []];
        for(let i = 0; i < this.state.numDays+this.state.firstDay; i++){
            let date = 1+i-this.state.firstDay;
            if(i < this.state.firstDay){
                date = "";
            }
            let weekday = i % 7;
            let week = Math.floor(i / 7);
            dates[week][weekday] = <td style={tableStyle} key={i}><CellComponent date={date}/></td>
        }
        let formattedDates = [];
        for(let i = 0; i < dates.length; i++){
            formattedDates[i] = <tbody key={i}><tr>{dates[i]}</tr></tbody>
        }
        return (
            <React.Fragment>
            <table style={tableStyle}>
                <thead>
                    <tr style={tableStyle}>
                        {weekdays}
                    </tr>
                </thead>
                {formattedDates}
            </table>
            </React.Fragment>
        );
    }
}
 
export default Calendar;