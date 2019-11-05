import React from "react";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   clickToLogin() {
  //     this.setState();
  //   }

  render() {
    return (
      <div class="container">
        {/* Main section  - user can choose to login or create pet*/}
        <section className="nes-container with-title">
          <h1>Virtual Pets</h1>
          <a href="#createPet">
            <button className="nes-btn is-primary">Create Pet</button>
          </a>
          <a href="#login">
            <button className="nes-btn is-primary">Login</button>
          </a>
        </section>
        {/* added a <br> for a bit of spacing between the sections - but not sure if this is best practice */}
        <br></br>
        {/* Login section - users with an account - takes them to pets page (list of pets) */}
        <section className="nes-container with-title" id="login">
          <h3 className="title">Log In</h3>
          <p>Already have an account? Log in below!</p>
          <h4>Email</h4>
          <input className="nes-input"></input>
          <h4>Password</h4>
          <input className="nes-input"></input>
          <link to="/Pets.js">
            <button className="nes-btn is-primary">Log In</button>
          </link>
        </section>
        <br></br>
        {/* Create pet section - users sign up to create a pet - takes them to create pet page*/}
        <section className="nes-container with-title" id="createPet">
          <h3 className="title">Create Pet</h3>
          <p>Sign up to create a pet</p>
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
