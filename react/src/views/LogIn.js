import React from "react";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <section className="nes-container with-title">
          <h1>Virtual Pets</h1>
          <button className="nes-btn is-primary">Adopt</button>
          <button className="nes-btn is-primary">Login</button>
        </section>
        <br></br>
        <section className="nes-container with-title">
          <h3 className="title">Log In</h3>
          <h4>Email</h4>
          <input className="nes-input"></input>
          <h4>Password</h4>
          <input className="nes-input"></input>
          <button className="nes-btn is-primary">Log In</button>
        </section>
        <br></br>
        <section className="nes-container with-title">
          <h3 className="title">Adopt</h3>
          <h4>Email</h4>
          <input className="nes-input"></input>
          <h4>Password</h4>
          <input className="nes-input"></input>
          <button className="nes-btn is-primary">Sign Up</button>
        </section>
      </div>
    );
  }
}

export default LogIn;
