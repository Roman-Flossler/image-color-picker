import React from 'react';

class Canvas extends React.Component {
  componentDidMount() {   //componentDidMount will run after the render, so the canvas already exists  
    // refs are used to get reference to a DOM. this address actual object
    const canvas = this.refs.canvas
    this.ctx = canvas.getContext("2d")
    const img = new Image();
    img.src = this.props.imgUrl;
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0);
    } 
    this.props.getCtx(this.ctx);
  }
  
  // render is called only when the canvas image will change (url, size). 
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.imgUrl !== nextProps.imgUrl || this.props.imgSize[0] !== nextProps.imgSize[0] || this.props.imgSize[1] !== nextProps.imgSize[1] ) {
      this.props.getCtx(this.ctx);
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.log('canvasing')
    return (
      <canvas ref="canvas" style={{borderRadius:this.props.roundness-13}} 
      width={this.props.imgSize[0]} height={this.props.imgSize[1]} />
    );
  }
}

export default Canvas;
