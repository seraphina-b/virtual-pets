<<<<<<< HEAD
import React from "react";
import Header from "./views/Pet/Header.js";
import Footer from "./views/Pet/Footer.js";
=======
import React from 'react';
import Header from './views/Pet/Header.js';
import Footer from './views/Pet/Footer.js';
import LogIn from './views/LogIn.js';
import { BrowserRouter, Route } from "react-router-dom";
>>>>>>> working routes

class App extends React.Component {
  constructor(props) {
    super(props);
  }
<<<<<<< HEAD
=======

>>>>>>> working routes
  render() {
    return (
      <BrowserRouter>
      <div>
        <Header></Header>
<<<<<<< HEAD
        <h1>Virtual Pet</h1>
        <button>Create New Pet</button>
        <Footer></Footer>
      </div>
    );
=======
        <h1>Virtual Pet</h1> 
        <button>Create New Pet</button>
        <Footer></Footer>
        <Route path="/LogIn" component={LogIn} />
      </div> 
      </BrowserRouter>
    )
>>>>>>> working routes
  }
}
export default App;
