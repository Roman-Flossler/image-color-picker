import React from 'react';
import './Color.css';

const Color = ({ color, pos, mouseDown, onColorPickedText, showRGB }) => {
    const pstyle = { left: pos[0]+8, top: pos[1]+8 };
    const ccstyle = { left: pos[0]-9, top: pos[1]-9, background: color };
    const display =  showRGB ? 'show' : 'hide';
    if (mouseDown) {
        return (
            <div className={display} >
            <p id='showinfo' style={pstyle}>{color}</p>
            </div>
            );
    } else if (mouseDown === false) {
        return (
            <div>
            <div id='pointer' style={ccstyle}></div>
            <p id='showinfo' style={pstyle} ><span className={display}>{color}</span> {onColorPickedText} </p>
            </div>);
    } else {
        return (
            <div>
            <div id='pointer' style={ccstyle}></div>
            <p id='showinfo' style={pstyle} >Select the color</p>
            </div>);
    }
}

export default Color;
