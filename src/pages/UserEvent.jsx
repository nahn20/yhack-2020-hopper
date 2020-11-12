import React, { Component } from 'react';
import Cell_Drag from '../components/Cell_Drag';
import TimeSelector from '../components/TimeSelector';
import Collapse from '../components/Collapse';
import TimeSelector_Canvas from '../components/TimeSelector_Canvas';
import './createEvent.css';
import '../components/collapse.css';
import '../components/fadeInUp.css';
import nextId from 'react-id-generator';
import { getFullString, parseTimeString } from '../helper';

class UserEvent extends Component {
    constructor(props){
        super(props);
        this.startDate = new Date;
        this.data = parseTimeString(getFullString(20*96, "1"), this.startDate);
        this.timeSelectRef = React.createRef();
        this.collapseRef = React.createRef();
        this.state = {
            timeSelector: [
                <Collapse ref={this.collapseRef} isOpened={true} key={nextId()}>
                    <div className="animated animatedFadeUp fadeInUp">
                        <TimeSelector_Canvas ref={this.timeSelectRef} data={this.data} cellsAcross={this.data.length}/>
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
        console.log(this.data)
    }
    componentDidMount = () => {
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    {this.state.timeSelector}
                </div>
                <button onClick={() => this.updateData(this.timeSelectRef)}>
                    Submit
                </button>
            </React.Fragment>

        );
    }
}
 
export default UserEvent;