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
      pos: [props.pickerMaxSize[0]/3-20, props.pickerMaxSize[1]/2-20],
      ctx: null,
      mouseDown: undefined,
      img: undefined
    }
    this.fileInp = React.createRef();
  }

  getCtx = (ctx) => {
    this.setState({ ctx: ctx });    
  }

  getColor = (x,y) => {
    const imgData = this.state.ctx.getImageData(x, y, 1, 1);
    return 'rgb(' + imgData.data[0] + ', ' + imgData.data[1] + ', ' + imgData.data[2] + ')';
  }

  onMouseDown = (e) => {
    this.setState({  
      pos: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
      mouseDown: true,
      color: this.getColor(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    });    
  }

  onMouseUp = () => {
    this.setState({ mouseDown: false });
    this.props.onColorPicked && this.props.onColorPicked(this.state.color);
  }

  onMouseMove = (e) => {    
    if (this.state.mouseDown) {
      this.setState({  
        pos: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
        color: this.getColor(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      });
      this.props.onColorPicking && this.props.onColorPicking(this.state.color);
    }     
  }

  onFileChange = () => {
    let img = new Image();
    img.onload = () => {
      this.setState( {img: img} )    
    }
    if (this.fileInp.current.files[0]) {
      img.src = URL.createObjectURL(this.fileInp.current.files[0]);
    }
  }

  render() {
    return (
      <div>
      <div style={{ borderColor: this.state.color, borderRadius: this.props.roundness }} id='frame' >
        <Canvas img={this.state.img} imgUrl={this.props.imgUrl} sizeX={this.props.pickerMaxSize[0]} sizeY={this.props.pickerMaxSize[1]} 
                roundness={this.props.roundness} getCtx={this.getCtx} ></Canvas>
        
        <Color color={this.state.color} pos={this.state.pos} mouseDown={this.state.mouseDown} 
        onColorPickedText={this.props.onColorPickedText} showRGB={this.props.showRGB} width={this.props.pickerMaxSize[0]} ></Color>
        
        <div id='mousecatcher' onMouseMove={ this.onMouseMove } onMouseDown={this.onMouseDown}  onMouseUp={ this.onMouseUp }
        style={ { borderRadius: this.props.roundness-13, cursor: this.state.mouseDown ? 'none' : 'default'  }} ></div>
      </div>
      <input ref={this.fileInp} type="file" onChange={this.onFileChange} style={this.props.selectImgButton ? { display:'block' } : { display:'none' } }></input>
      </div>
    );
  }
}

export default ImageColorPicker;
