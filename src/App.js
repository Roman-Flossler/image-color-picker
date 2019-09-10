import React, { Component } from 'react';
import SimpleColorPicker from './simpleColorPicker/SimpleColorPicker';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      color: '',
    }
  }


changeTitle = (color) => {
  document.title = ' » ' + color;
}

changeColor = (color) => {
  this.setState( {color: color} );  
}


  render() {
    return (
        <div className="App">
        <h1 style={{color: this.state.color,  textShadow: '0 0 11px' + this.state.color }} >Simple Color Picker</h1>
          <header className="App-header">            
            <SimpleColorPicker imgUrl={'rgb.png'} imgSize={[300,300]} radius={200} afterMouseUp={this.changeTitle} afterMouseUpText={'is the new page title'} showRGB={true} >
            </SimpleColorPicker>
            <SimpleColorPicker imgUrl={'palette.png'} imgSize={[555,300]} radius={16} afterMouseUp={this.changeColor} afterMouseUpText={''} showRGB={false} >
            </SimpleColorPicker>
          </header>
        </div>
    );
  }
}

export default App;
