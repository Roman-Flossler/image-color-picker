import React from 'react';

class Canvas extends React.Component {
  componentDidMount() {   //componentDidMount will run after the render, so the canvas already exists  
    // refs are used to get reference to a DOM. this address actual object
    const canvas = this.refs.canvas
    this.ctx = canvas.getContext("2d")
    const img = new Image();
    img.src = this.props.imgUrl;
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0)  
    }    
  }

  // After a mouse position update the Canvas component updates a color
  // While the color is read from the canvas, the position is read from the Div.
  // This is because of ability to move by color circle across the image.
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.pos !== this.props.pos) {
      this.props.updateColor(nextProps.pos, this.ctx)      
    }
    if (this.props.imgUrl !== nextProps.imgUrl || this.props.imgSize !== nextProps.imgSize ) {
      return true;
    } else {
      return false;
    }

  }

  render() {
    return (
      <canvas ref="canvas" style={{borderRadius:this.props.roundness-13}}
      // onMouseMove={(event) => { this.props.mouseMove(event, this.ctx) }} 
      width={this.props.imgSize[0]} height={this.props.imgSize[1]} />
    );
  }
}

export default Canvas;
