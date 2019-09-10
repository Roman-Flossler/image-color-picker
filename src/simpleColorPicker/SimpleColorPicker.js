import React, { Component } from 'react';
import Canvas from './Canvas';
import Color from './Color';
import './SimpleColorPicker.css';

class App extends Component {
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
    this.props.afterMouseUp(this.state.color);
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
    }     
  }

  render() {    
    return (
            <div style={{ borderColor: this.state.color, borderRadius: this.props.radius }} id='frame'>
              <Canvas imgUrl={this.props.imgUrl} imgSize={this.props.imgSize} mouseMove={this.onMouseMove} mouseDown={this.onMouseDown} radius={this.props.radius} mouseUp={this.onMouseUp} ></Canvas>
              <Color color={this.state.color} pos={this.state.pos} mouseDown={this.state.mouseDown} afterMouseUpText={this.props.afterMouseUpText} showRGB={this.props.showRGB} ></Color>
            </div>
    );
  }
}

export default App;
