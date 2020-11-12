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
import { getFullString, parseTimeString } from '../helper';

class CreateEvent extends Component {
    constructor(props){
        super(props);
        this.data = parseTimeString(getFullString(13*96, "1"), new Date);
        this.timeSelectRef = React.createRef();
        this.collapseRef = React.createRef();
        this.state = {
            timeSelector: [
                <Collapse ref={this.collapseRef} isOpened={true} key={nextId()}>
                    <div className="animated animatedFadeUp fadeInUp">
                        <TimeSelector_Canvas ref={this.timeSelectRef} data={this.data} startDay={0}/>
                    </div>
                </Collapse>],
        }
    }
    updateData = (ref) => {
        let data = ref.current.formatData();
        console.log(data)
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
                    <TimeSelector_Canvas ref={this.timeSelectRef} data={this.data} startDay={4}/>
                </div>
            </Collapse>,
            state.timeSelector[0]
        ];
        this.setState(state);
        this.collapseRef.current.toggleCollapse();
        this.collapseRef = newRef;
    }
    componentDidMount = () => {
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
 
export default CreateEvent;