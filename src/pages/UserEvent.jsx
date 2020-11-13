import React, { Component } from 'react';
import Cell_Drag from '../components/Cell_Drag';
import TimeSelector from '../components/TimeSelector';
import Collapse from '../components/Collapse';
import TimeSelector_Canvas from '../components/TimeSelector_Canvas';
import './createEvent.css';
import '../components/collapse.css';
import '../components/fadeInUp.css';
import nextId from 'react-id-generator';
import { getFullString, parseTimeString, parseTimeList, THEME, smushData } from '../helper';
import { GetEvent } from '../firebase';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { Button } from '@material-ui/core';
import { CreateOrUpdateUserInEvent } from '../firebase';
const queryString = require('query-string');

class UserEvent extends Component {
    constructor(props){
        super(props);
        this.startDate = new Date();
        this.query = queryString.parse(this.props.location.search);
        this.timeSelectRef = React.createRef();
        this.collapseRef = React.createRef();
        this.inputBox = React.createRef();
        this.state = {
            data: parseTimeString(getFullString(0*96, "1"), this.startDate),
            eventName: null,
            error: "",
            adminMessage: this.query.admin ? 
                <div>
                    Share your calendar with friends! <br/><a style={{color: "#0000EE", cursor: "grab", textDecoration: "underline"}} onClick={() => this.copyLink(`${window.location.host}/event?id=${this.query.id}`)}>Copy link to clipboard</a>
                </div>
                 : <div></div>
        }
    }
    copyLink = (link) => {
        const el = document.createElement('textarea');
        el.value = link;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
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
        state.data = parseTimeList(getEvent.template, new Date(getEvent.time));
        state.eventName = getEvent.event_name;
        this.setState(state);
    }
    updateData = (ref) => {
        let data = ref.current.formatData();
        let startDay = ref.current.props.startDay;
        for(let day = 0; day < data.length; day++){
            if(!this.state.data[day+startDay]){
                this.state.data.push([]);
            }
            this.state.data[day+startDay].data = data[day];
        }
    }
    submit = () => {
        this.updateData(this.timeSelectRef);
        let data = smushData(this.state.data);
        for(let i = 0; i < data.length; i++){
            if(data[i] === 0 || data[i] === 1){
                data[i] = 0;
            }
            else if(data[i] === 2){
                data[i] = 1;
            }
        }
        console.log(data)
        let name = this.inputBox.current.value;
        if(name === ""){
            let state = this.state;
            state.error = "Don't forget to enter your name!"
            this.setState(state);
        }
        else{
            CreateOrUpdateUserInEvent(this.query.id, name, name, data);
            this.openResults();	
        }
    }
    openResults = () => {
        let id = this.query.id;
        setTimeout(function(){
            window.location.href = `/results?id=${id}`;
        }, 200);
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
                <Container fluid>
                    <Row>
                        <Col xl={2}>
                            <div style={{marginTop: "5vh", fontWeight: "bold", fontSize: "1.5em"}}>
                                {this.state.eventName}
                            </div>
                            <div style={{marginTop: "5vh"}}>
                                {this.state.adminMessage}
                            </div>
                            <div style={{display: "inline-block", marginTop: "5vh", width: "100%"}}>
                                <input ref={this.inputBox} className="align-top" placeholder="Enter Name" style={{
                                    borderRadius: "4px",
                                    padding: "8px",
                                    borderColor: THEME[5],
                                    fontSize: "1.2em",
                                    width: "100%", 
                                    textAlign: "center"
                                }}/>
                                <br/>
                                <Button variant="contained" size="large" disableEvalation onClick={this.submit} style={{backgroundColor: THEME[2], color: THEME[1], outline: "none", marginTop: "10vh", fontSize: "1.2em"}}>
                                    SUBMIT
                                </Button>
                                <Button variant="contained" size="large" disableEvalation onClick={this.openResults} style={{backgroundColor: THEME[2], color: THEME[1], outline: "none", marginTop: "10vh", fontSize: "1.2em"}}>
                                    See Results
                                </Button>
                                <div style={{marginTop: "5vh"}}>
                                    {this.state.error}
                                </div>
                            </div>
                        </Col>
                        <Col xl={10}>
                        <Collapse ref={this.collapseRef} isOpened={true} key={nextId()}>
                            <div className="animated animatedFadeUp fadeInUp">
                                <TimeSelector_Canvas ref={this.timeSelectRef} data={this.state.data} cellsAcross={this.state.data.length} cellWidth={(document.documentElement.clientWidth*(9/12))/this.state.data.length}/>
                            </div>
                        </Collapse>

                        </Col>
                    </Row>
                </Container>
                </div>
            </React.Fragment>

        );
    }
}
 
export default UserEvent;