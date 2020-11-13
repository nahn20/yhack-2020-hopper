import React, { Component } from 'react';
import Collapse from '../components/Collapse';
import TimeDisplayer_Canvas from '../components/TimeDisplayer_Canvas';
import './createEvent.css';
import '../components/collapse.css';
import '../components/fadeInUp.css';
import nextId from 'react-id-generator';
import { getFullString, parseTimeString, parseTimeList, THEME } from '../helper';
import { GetEvent } from '../firebase';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { Button } from '@material-ui/core';
const queryString = require('query-string');

class EventResults extends Component {
    constructor(props){
        super(props);
        this.startDate = new Date();
        this.query = queryString.parse(this.props.location.search);
        this.timeSelectRef = React.createRef();
        this.collapseRef = React.createRef();
        this.state = {
            data: parseTimeString(getFullString(0*96, "1"), this.startDate),
            eventName: null,
        }
    }
    getEventData = async() => {
        let getEvent = await GetEvent(this.query.id);
        for(let i = 0; i < 10; i++){
            if(getEvent){
                break;
            }
            await setTimeout(function(){}, 200);
            getEvent = await GetEvent(this.query.id);
        }
        let state = this.state;
        state.data = parseTimeList(getEvent.time_heat_map, new Date(getEvent.time));
        state.eventName = getEvent.event_name;
        this.setState(state);
    }
    updateData = (ref) => {
        let data = ref.current.formatData();
        let startDay = ref.current.props.startDay;
        for(let day = 0; day < data.length; day++){
            this.data[day+startDay].data = data[day];
        }
        console.log(this.data)
    }
    componentDidMount = () => {
        this.getEventData();
    }
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <div className="animated animatedFadeInUp fadeInUp" style={{
                    textAlign: "center", 
                    fontFamily: "Poppins",
                    width: "100vw",
                    marginTop: "2vh",
                }}>
                    <div style={{fontWeight: "bold", fontSize: "1.5em", marginBottom: "10px"}}>
                        {this.state.eventName}
                    </div>
                    <Collapse ref={this.collapseRef} isOpened={true} key={nextId()}>
                        <div className="animated animatedFadeUp fadeInUp">
                            <TimeDisplayer_Canvas ref={this.timeSelectRef} data={this.state.data} cellsAcross={this.state.data.length} cellWidth={(document.documentElement.clientWidth*(9/12))/this.state.data.length}/>
                        </div>
                    </Collapse>
                </div>
            </React.Fragment>

        );
    }
}
 
export default EventResults;