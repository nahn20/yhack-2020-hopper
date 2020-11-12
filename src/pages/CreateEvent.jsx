import React, { Component } from 'react';
import TimeSelector from '../components/TimeSelector';
import Collapse from '../components/Collapse';
import TimeSelector_Canvas from '../components/TimeSelector_Canvas';
import './createEvent.css';
import '../components/collapse.css';
import '../components/fadeInUp.css';
import nextId from 'react-id-generator';
import { getFullString, parseTimeString, getDataDict, getFullList } from '../helper';
import Cell_OpenTimeSlot from '../components/Cell_OpenTimeSlot';
import Calendar from '../components/Calendar';

const MAX_ROW_LENGTH = 7;
class CreateEvent extends Component {
    constructor(props){
        super(props);
        let d = new Date();
        this.startIndex = 0;
        this.startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        this.data = parseTimeString(getFullString(13*96, "1"), new Date(this.startDate.getTime()));
        this.timeSelectRef = React.createRef();
        this.collapseRef = React.createRef();
        this.state = {
            timeSelector: [
                <Collapse ref={this.collapseRef} isOpened={true} key={nextId()}>
                    <div className="animated animatedFadeUp fadeInUp">
                        <TimeSelector_Canvas ref={this.timeSelectRef} data={this.data} startDay={this.startIndex}/>
                    </div>
                </Collapse>],
        }
    }
    updateData = (ref) => {
        let data = ref.current.formatData();
        let startDay = ref.current.props.startDay;
        for(let day = 0; day < data.length; day++){
            this.data[day+startDay].data = data[day];
        }
    }
    switchCollapse = () => {
        this.updateData(this.timeSelectRef);
        let state = this.state;
        let newRef = React.createRef();
        state.timeSelector = [
            <Collapse ref={newRef} isOpened={false} autoToggle={true} key={nextId()}>
                <div className="animatedFast animatedFadeUp fadeInUp">
                    <TimeSelector_Canvas ref={this.timeSelectRef} data={this.data} startDay={this.startIndex}/>
                </div>
            </Collapse>,
            state.timeSelector[0]
        ];
        this.setState(state);
        this.collapseRef.current.toggleCollapse();
        this.collapseRef = newRef;
    }
    handleCalendarSelect = (dateInfo) => {
        let calendarDate = new Date(dateInfo.year, dateInfo.month, dateInfo.date);
        let difference = (calendarDate.getTime() - this.startDate.getTime()) / 86400000;
        if(difference < 0){ //Repairs the front
            for(let i = -1; i >= difference; i--){
                let dataDict = getDataDict(new Date(this.startDate.getTime() + (i * 86400000)));
                dataDict.data = getFullList(96, 1);
                this.data.unshift(dataDict);
            }
            this.startDate = calendarDate;
        }
        if(difference + MAX_ROW_LENGTH > this.data.length){ //Repairs the back
            for(let i = this.data.length; i < difference + MAX_ROW_LENGTH; i++){
                let dataDict = getDataDict(new Date(this.startDate.getTime() + (i * 86400000)));
                dataDict.data = getFullList(96, 1);
                this.data.push(dataDict);
            }
        }
        let newDifference = (calendarDate.getTime() - this.startDate.getTime()) / 86400000;
        console.log(newDifference);
        this.startIndex = newDifference;
        this.switchCollapse();
    }
    componentDidMount = () => {
    }
    render() {
        return (
            <React.Fragment>
                <div style={{float: "left", margin: "20px"}}>
                    <Calendar handleCalendarSelect={this.handleCalendarSelect} month={this.startDate.getMonth()} year={this.startDate.getFullYear()}/>
                </div>
                <div style={{float: "right", margin: "20px"}}>
                    {this.state.timeSelector}
                </div>
            </React.Fragment>

        );
    }
}
 
export default CreateEvent;