import React, { Component } from 'react';
import ImageColorPicker from './image-color-picker/ImageColorPicker';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      color: '',
    }
  }


changeTitle = (color) => {
  document.title = ' 🎨 ' + color;
}

changeColor = (color) => {
  this.setState( {color: color} );  
}


  render() {
    return (
        <div className="App">
        <h1 style={{color: this.state.color,  textShadow: '0 0 11px' + this.state.color }} >image Color Picker</h1>
          <header className="App-header">            
            <ImageColorPicker imgUrl={'rgb.png'} pickerMaxSize={[300,300]} roundness={200} showRGB={true}
                              onColorPicked={this.changeTitle} onColorPickedText={'is the new page title'}  >
            </ImageColorPicker>
            <ImageColorPicker selectImgButton={true} imgUrl={'palette.png'} pickerMaxSize={[555,300]} onColorPicking={this.changeColor} 
                              onColorPicked={this.changeColor} roundness={16} >
            </ImageColorPicker>
          </header>
        </div>
    );
  }
}

export default App;
