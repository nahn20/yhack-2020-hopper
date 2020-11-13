import React, { Component } from 'react';
import { THEME } from '../helper';
import ButtonMaterial from '@material-ui/core/Button'

class Button extends Component {
    state = {  }
    render() { 
        return (
            <ButtonMaterial variant="primary" large style={{backgroundColor: THEME[2], color: THEME[1]}}>
                {this.props.children}
            </ButtonMaterial>
        );
    }
}
 
export default Button;