import React, { Component } from 'react';
import NavBar from '../components/NavBar';

class About extends Component {
    state = {  }
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
                    <div style={{fontWeight: "normal", fontSize: "3em"}}>
                        About Us
                    </div>
                    <hr style={{width: "82%"}}/>
                    <div style={{textAlign: "left", marginLeft: "10%", marginRight: "10%"}}>
                    Schedulio serves as a simple and streamlined service to efficiently schedule meetings and events. It ensures the ability for an event coordinator to choose a time that aligns with the availability of the majority. 
                    <br/>
                    Schedulio offers a variety of features, for both the users who prioritize efficiency and ones who prefer a choice of functions. Regardless, the minimal and clean interface is deliberate in keeping our website easily accessible and simple. 
                    <br/>
                    Get started by clicking on the create event tab above! Or check your emails or texts for that special link to fill out your availability for an event. If you would like to keep track of past or multiple present events, sign up for an account also found in the tab above!
                    <br/>
                    <br/>
                    Happy scheduling! - Schedulio team
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default About;