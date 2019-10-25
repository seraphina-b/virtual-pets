import React from 'react';
import Header from './components/Header.js';

class App extends React.Component {
  constructor(props) {
    super(props);
   
  }

  

  render() {
    return (
      <div>
        <h1>Virtual Pet</h1>
        
        <button>Create New Pet</button>
        <Header></Header>
      </div>
    )
  }
}
export default App;
