// Image color Picker created by Roman Flössler - https://github.com/Roman-Flossler

import React, { Component } from 'react';
import Canvas from './Canvas';
import Color from './Color';
import './ImageColorPicker.css';

class ImageColorPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      pos: [props.imgSize[0]/3-20, props.imgSize[1]/2-20],
      mouseDown: undefined
    }
  }

  updateColor = (pos, ctx) => {
    const imgData = ctx.getImageData(pos[0], pos[1], 1, 1);
      this.setState({
        color: 'rgb(' + imgData.data[0] + ', ' + imgData.data[1] + ', ' + imgData.data[2] + ')'
      });
  }

  onMouseDown = (e) => {    
    this.setState({  
      pos: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
      mouseDown: true
    });    
  }

  onMouseUp = () => {
    this.setState({ mouseDown: false });
    this.props.onColorPicked && this.props.onColorPicked(this.state.color);
  }

  onMouseMove = (e) => {    
    if (this.state.mouseDown) {
      this.setState({  
        pos: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
      });
      this.props.onColorPicking && this.props.onColorPicking(this.state.color);
    }     
  }

  render() {
    return (
      <div style={{ borderColor: this.state.color, borderRadius: this.props.roundness }} id='frame' >
        <Canvas imgUrl={this.props.imgUrl} imgSize={this.props.imgSize} roundness={this.props.roundness} pos={this.state.pos} updateColor={this.updateColor} ></Canvas>
        
        <Color color={this.state.color} pos={this.state.pos} mouseDown={this.state.mouseDown} 
        onColorPickedText={this.props.onColorPickedText} showRGB={this.props.showRGB} width={this.props.imgSize[0]} ></Color>
        
        <div id='mousecatcher' onMouseMove={ this.onMouseMove } onMouseDown={this.onMouseDown}  onMouseUp={ this.onMouseUp }
        style={ { borderRadius: this.props.roundness-13, cursor: this.state.mouseDown ? 'none' : 'default'  }} ></div>
      </div>
    );
  }
}

export default ImageColorPicker;
