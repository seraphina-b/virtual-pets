<<<<<<< HEAD
import React from "react";
import Header from "./views/Pet/Header.js";
import Footer from "./views/Pet/Footer.js";
import LogIn from "./views/LogIn.js";
=======
import React from 'react';
import Header from './views/Pet/Header.js';
import Footer from './views/Pet/Footer.js';
import LogIn from './views/LogIn.js';
>>>>>>> installed nes
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
<<<<<<< HEAD
        <div>
          <Header></Header>
          <h1>Virtual Pet</h1>
          <button>Create New Pet</button>
          <Footer></Footer>
          <Route path="/LogIn" component={LogIn} />
        </div>
      </BrowserRouter>
    );
=======
      <div>
        <Header></Header>
        <h1>Virtual Pet</h1> 
        <button>Create New Pet</button>
        <Footer></Footer>
        <Route path="/LogIn" component={LogIn} />
      </div> 
      </BrowserRouter>
    )
>>>>>>> installed nes
  }
}
export default App;
