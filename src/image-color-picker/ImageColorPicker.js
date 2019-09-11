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

  onMouseDown = (e, ctx) => {
    this.setState({ mouseDown: true });    
    this.getColorPosToState (e,ctx);
  }

  onMouseUp = () => {
    this.setState({ mouseDown: false });
    this.props.onColorPicked && this.props.onColorPicked(this.state.color);
  }

  getColorPosToState = (e, ctx) => {
    const imgData = ctx.getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
      this.setState({
        color: 'rgb(' + imgData.data[0] + ', ' + imgData.data[1] + ', ' + imgData.data[2] + ')',
        pos: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
      });
  }

  onMouseMove = (e, ctx) => {    
    if (this.state.mouseDown) {
      this.getColorPosToState (e,ctx);
      this.props.onColorPicking && this.props.onColorPicking(this.state.color);
    }     
  }

  render() {    
    return (
      <div style={{ borderColor: this.state.color, borderRadius: this.props.roundness }} id='frame'>
        <Canvas imgUrl={this.props.imgUrl} imgSize={this.props.imgSize} mouseMove={this.onMouseMove} 
        mouseDown={this.onMouseDown} roundness={this.props.roundness} mouseUp={this.onMouseUp} ></Canvas>
        
        <Color color={this.state.color} pos={this.state.pos} mouseDown={this.state.mouseDown} 
        onColorPickedText={this.props.onColorPickedText} showRGB={this.props.showRGB} ></Color>
      </div>
    );
  }
}

export default ImageColorPicker;
