import React, { Component } from 'react';
import { combine_dicts } from '../helper';

const WEEKDAY_NAME_LOOKUP = [
    ["Sun", "Sunday"],
    ["Mon", "Monday"],
    ["Tue", "Tuesday"],
    ["Wed", "Wednesday"],
    ["Thu", "Thursday"],
    ["Fri", "Friday"],
    ["Sat", "Saturday"]
];
const tableStyle = {borderCollapse: "collapse", padding: 0};
class TimeSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            mouseMode: 0, //0 for not clicked, 1 for clicking and turning green, -1 for clicking and turning red
        }
        this.allowedTimes = (this.props.allowedTimes ? this.props.allowedTimes : this.getTimeRange(6, 21));
    }
    getTimeRange = (start, end) => { //Takes a start and end hour (24-hour time, starts at 0) and converts into an array segmented into 15 minutes (length of 24*4)
        let timeRange = [];
        for(let i = 0; i < 4*24; i++){
            if(i >= start*4 && i < end*4){
                timeRange[i] = true;
            }
            else{
                timeRange[i] = false;
            }
        }
        return timeRange;
    }
    updateMouseMode = (value) => {
        let state = this.state;
        state.mouseMode = value;
        this.setState(state);
    }
    componentDidMount = () => {
        // document.onmousedown = () => {
        //     let state = this.state;
        //     state.mouseDown = true;
        //     this.setState(state);
        // }
        let existingMouseUp = document.onmouseup;
        document.onmouseup = () => {
            existingMouseUp();
            let state = this.state;
            state.mouseMode = 0;
            this.setState(state);
        }
    }
    render() {
        const CellComponent = this.props.children;
        let times = [];
        for(let i = 0; i < this.allowedTimes.length; i++){
            if(this.allowedTimes[i]){
                times[i] = <div key={i}><CellComponent updateMouseMode={this.updateMouseMode} mouseMode={this.state.mouseMode} style={{height: "4px"}}></CellComponent></div>
            }
        }
        return (
            <React.Fragment>
                <div style={{
                    MozUserSelect: "none",
                    WebkitUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                    width: (this.props.width ? this.props.width : "10vw"),
                }}>
                    <table style={combine_dicts(tableStyle, {tableLayout: "inherit", width: "100%"})}>
                        <thead>
                            <tr style={tableStyle}>
                                <th>{this.props.header}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {times}
                        </tbody>
                        
                    </table>
                </div>
            </React.Fragment>
        );
    }
}
 
export default TimeSelector;