import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import Cell_Drag from '../components/Cell_Drag';
import TimeSelector from '../components/TimeSelector';
import Collapse from '../components/Collapse';
import TimeSelector_Canvas from '../components/TimeSelector_Canvas';
import './createEvent.css';
import '../components/collapse.css';
import '../components/fadeInUp.css';
import nextId from 'react-id-generator';

class Test extends Component {
    constructor(props){
        super(props);
        this.timeSelectRefs = [React.createRef()];
        this.collapseRef = React.createRef();
        this.state = {
            timeSelector: [
                <Collapse ref={this.collapseRef} isOpened={true} key={nextId()}>
                    <div className="animated animatedFadeUp fadeInUp">
                        <TimeSelector_Canvas ref={this.timeSelectRefs[0]} cellsAcross={7} cellWidth={40} cellHeight={30} height={800}/>
                    </div>
                </Collapse>],
        }
    }
    submitResults = () => {
        let data = this.timeSelectRefs[0].current.formatData();
        console.log(JSON.stringify(data));
    }
    switchCollapse = () => {
        let state = this.state;
        let newRef = React.createRef();
        state.timeSelector = [
            <Collapse ref={newRef} isOpened={false} autoToggle={true} key={nextId()}>
                <div className="animatedFast animatedFadeUp fadeInUp">
                    <TimeSelector_Canvas ref={this.timeSelectRefs[0]} cellsAcross={7} cellWidth={40} cellHeight={30} height={800}/>
                </div>
            </Collapse>,
            state.timeSelector[0]
        ];
        this.setState(state);
        this.collapseRef.current.toggleCollapse();
        this.collapseRef = newRef;
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    {this.state.timeSelector}
                </div>
                <button onClick={this.switchCollapse}>
                    Toggle
                </button>
            </React.Fragment>

        );
    }
}
 
export default Test;