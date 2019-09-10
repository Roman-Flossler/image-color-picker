import React from 'react';
// import logo from './logo.svg';

class Canvas extends React.Component {
  componentDidMount() {   // lifecycle metody spustí se až po renderu a díky tomu už existuje canvas
    // refs are used to get reference to a DOM
    const canvas = this.refs.canvas
    this.ctx = canvas.getContext("2d")
    this.img = new Image();
    this.img.src = this.props.imgUrl;
    this.img.onload = () => {
      this.ctx.drawImage(this.img, 0, 0)
      // this.ctx.font = "40px Courier"
      // this.ctx.fillText('just a test', 210, 75)
    }
  }

  render() {
    return (
      <canvas ref="canvas" style={{borderRadius:this.props.radius-13}}
      onMouseMove={(event) => { this.props.mouseMove(event, this.ctx) }} 
      onMouseDown={(event) => { this.props.mouseDown(event, this.ctx) }} 
      onMouseUp={ this.props.mouseUp } 
      width={this.props.imgSize[0]} height={this.props.imgSize[1]} />
    );
  }
}

export default Canvas;
