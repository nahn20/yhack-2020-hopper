import React, { Component } from 'react';

class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{fontFamily: "Poppins", fontSize: "1.3em"}}>
                <div className="navbar-brand" style={{fontWeight: "normal", fontSize: "2em"}}>Schedulio</div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Create Event</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="signin">Login/Sign Up</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" href="about">About</a>
                    </li>

                </ul>
          </nav>
        );
    }
}
 
export default NavBar;