import React, { Component } from 'react';
import { combine_dicts, THEME } from '../helper';
import '../font.css';

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
const OPACITY_TIMING_MS = 250;
const tableStyle = {borderCollapse: "collapse", padding: 0, fontFamily: "Poppins", fontWeight: "light", fontSize: "20px"};
class Calendar extends Component {
    constructor(props){
        super(props);
        let month = this.props.month;
        let year = this.props.year;
        this.width = 420;
        this.dateRefs = [];
        this.state = {
            month: month,
            year: year,
            highlighted: null,
            firstDay: (new Date(year, month)).getDay(),
            numDays: (32 - (new Date(year, month, 32)).getDate()),
            opacity: 0,
        }
    }
    handleClick = (date) => {
        if(date !== ""){
            let state = this.state;
            if(state.highlighted !== date){
                state.highlighted = date;
                this.props.handleCalendarSelect({month: state.month, date: date, year: state.year});
            }
            else{
                state.highlighted = null;
            }
            this.setState(state);
        }
    }
    slide = (direction) => { //Changes month
        this.opacitify(0.2);
        setTimeout(() => {
            let state = this.state;
            state.month += direction;
            if(state.month > 11){
                state.year += 1;
                state.month = 0;
            }
            else if(state.month < 0){
                state.year -= 1;
                state.month = 11;
            }
            state.firstDay = (new Date(state.year, state.month)).getDay();
            state.numDays = (32 - (new Date(state.year, state.month, 32)).getDate());
            state.opacity = 1;
            this.setState(state);
        }, OPACITY_TIMING_MS);
    }
    opacitify = (opacity) => {
        let state = this.state;
        state.opacity = opacity;
        this.setState(state);
    }
    componentDidMount = () => {
        this.opacitify(1);
    }
    render() {
        let weekdays = [];
        for(let i = 0; i < WEEKDAY_NAME_LOOKUP.length; i++){
            weekdays.push(<td key={i} style={combine_dicts(tableStyle, {width: this.width/7, backgroundColor: THEME[0], color: THEME[1], textAlign: "center", lineHeight: "2em"})}>{WEEKDAY_NAME_LOOKUP[i][0]}</td>)
        }
        let dates = [[], [], [], [], []];
        this.dateRefs = [];
        for(let i = 0; i < this.state.numDays+this.state.firstDay; i++){
            let date = 1+i-this.state.firstDay;
            if(i < this.state.firstDay){
                date = "";
            }
            let weekday = i % 7;
            let week = Math.floor(i / 7);
            let highlighted = 0;
            if(date === this.state.highlighted){
                highlighted = 1;
            }
            dates[week][weekday] = <td style={combine_dicts(tableStyle, {backgroundColor: THEME[0]})} key={i}>
                <div onClick={() => this.handleClick(date)} style={{
                    width: this.width/7,
                    height: this.width/7,
                    margin: "5px",
                    lineHeight: this.width/7 + "px",
                    textAlign: "center",
                    backgroundColor: THEME[0],
                }}>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        color: THEME[+!!!highlighted],
                        backgroundColor: THEME[highlighted],
                        transition: "background-color 0.3s ease",
                    }}>{date}</div>
                </div>
            </td>
        }
        let formattedDates = [];
        for(let i = 0; i < dates.length; i++){
            formattedDates[i] = <tbody key={i}><tr>{dates[i]}</tr></tbody>
        }
        return (
            <React.Fragment>
                
                <div style={{
                    MozUserSelect: "none",
                    WebkitUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                    fontFamily: "Poppins",
                    display: "inline-block",
                    transition: `opacity ${OPACITY_TIMING_MS}ms ease`,
                    opacity: this.state.opacity,

                }}>
                    <div style={{
                        width: this.width + 7*10, 
                        backgroundColor: THEME[2], 
                        color: THEME[1], 
                        textAlign: "center", 
                        fontWeight: "bold", 
                        fontSize: "20px", 
                        lineHeight: "60px"
                    }}>
                        <svg onClick={() => this.slide(-1)} style={{float: "left", marginTop: "20px", marginLeft: "20px"}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-left" fill={THEME[1]} xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        {MONTH_NAME_LOOKUP[this.state.month][1]} {this.state.year}

                        <svg onClick={() => this.slide(1)} style={{float: "right", marginTop: "20px", marginRight: "20px"}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill={THEME[1]} xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <table style={combine_dicts(tableStyle, {fontSize: "40px"})}>
                        <tbody>
                            <tr>
                                {weekdays}
                            </tr>
                        </tbody>
                        {formattedDates}
                    </table>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Calendar; 