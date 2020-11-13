import React, { Component } from 'react';
import TimeSelector from '../components/TimeSelector';
import Collapse from '../components/Collapse';
import TimeSelector_Canvas from '../components/TimeSelector_Canvas';
import './createEvent.css';
import '../components/collapse.css';
import '../components/fadeInUp.css';
import nextId from 'react-id-generator';
import { getFullString, parseTimeString, getDataDict, getFullList, smushData, chopDataEnd, chopDataStart, THEME } from '../helper';
import Cell_OpenTimeSlot from '../components/Cell_OpenTimeSlot';
import Calendar from '../components/Calendar';
import { CreateOrUpdateEvent } from '../firebase';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { Button } from '@material-ui/core'
const randomstring = require("randomstring");

const OPACITY_TIMING_MS = 250;
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
        this.inputBox = React.createRef();
        this.state = {
            timeSelector: [
                <Collapse ref={this.collapseRef} isOpened={true} key={nextId()}>
                    <div className="animated animatedFadeUp fadeInUp">
                        <TimeSelector_Canvas ref={this.timeSelectRef} data={this.data} cellWidth={60} startDay={this.startIndex}/>
                    </div>
                </Collapse>],
            error: "",
        }
    }
    updateData = (ref) => {
        let data = ref.current.formatData();
        let startDay = ref.current.props.startDay;
        for(let day = 0; day < data.length; day++){
            if(this.data[day+startDay]){
                this.data[day+startDay].data = data[day];
            }
        }
    }
    switchCollapse = () => {
        this.updateData(this.timeSelectRef);
        let state = this.state;
        let newRef = React.createRef();
        state.timeSelector = [
            <Collapse ref={newRef} isOpened={false} autoToggle={true} key={nextId()}>
                <div className="animatedFast animatedFadeUp fadeInUp">
                    <TimeSelector_Canvas ref={this.timeSelectRef} data={this.data} cellWidth={60} startDay={this.startIndex}/>
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
        this.startIndex = newDifference;
        this.switchCollapse();
    }
    submit = () => {
        this.updateData(this.timeSelectRef);
        chopDataEnd(this.data);
        let shift = chopDataStart(this.data);
        this.startDate = new Date(this.startDate.getTime() + (shift * 86400000));
        let data = smushData(this.data);
        var found1 = false;
        for(let i = 0; i < data.length; i++){
            data[i]--;
            if(data[i] === 1){
                found1 = true
            }
        }
        let name = this.inputBox.current.value;
        if(!found1){
            let state = this.state;
            state.error = "Don't forget to fill in some time slots!"
            this.setState(state);
        }
        else if(name === ""){
            let state = this.state;
            state.error = "Don't forget an event name!"
            this.setState(state);
        }
        else{
            let id = randomstring.generate();
            CreateOrUpdateEvent({event_name: name, time: this.startDate.toString(), eventID: id, template: data, time_heat_map: data});
            setTimeout(function(){
                window.location.href = `/event?id=${id}`
            }, 200);
            
            // window.open(`/event?id=${id}`);
        }


    }
    componentDidMount = () => {
    }
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <div className="animated animatedFadeInUp fadeInUp" style={{
                    textAlign: "center", 
                    fontFamily: "Poppins",
                }}>
                    <Container fluid>
                        <Row>
                            <Col>
                                <div style={{width: "100%", alignContent: "center", marginTop: "10vh"}}>
                                    <div style={{fontWeight: "normal", fontSize: "1.8em", lineHeight: "3em"}}>
                                        Available Dates
                                    </div>
                                    <Calendar handleCalendarSelect={this.handleCalendarSelect} month={this.startDate.getMonth()} year={this.startDate.getFullYear()}/>
                                </div>
                                
                            </Col>
                            <Col>
                                <div style={{display: "inline-block", marginTop: "30vh"}}>
                                    <input ref={this.inputBox} className="align-top" placeholder="Enter Event Name" style={{
                                        borderRadius: "4px",
                                        padding: "8px",
                                        borderColor: THEME[5],
                                        fontSize: "1.2em"
                                    }}/>
                                    <br/>
                                    <Button variant="contained" size="large" disableEvalation onClick={this.submit} style={{backgroundColor: THEME[2], color: THEME[1], outline: "none", marginTop: "10vh", fontSize: "1.2em"}}>
                                        SUBMIT
                                    </Button>
                                    <div style={{marginTop: "5vh"}}>
                                        {this.state.error}
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div style={{display: "inline-block"}}>
                                    <div style={{fontWeight: "normal", fontSize: "1.8em", lineHeight: "3em"}}>
                                        Available Times
                                    </div>
                                    {this.state.timeSelector}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </React.Fragment>

        );
    }
}
 
export default CreateEvent;