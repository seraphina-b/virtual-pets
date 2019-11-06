import React from "react";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  attemptLogin = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: this.state.name })
    })
      .then(res => res.json())
      .then(data => {
        //redirect the user to the new pets page
        this.props.history.push("/pets");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        {/* Main section  - user can choose to login or create pet*/}
        <section className="nes-container with-title">
          <h1>Virtual Pets</h1>
        </section>
        {/* added a <br> for a bit of spacing between the sections - but not sure if this is best practice */}
        <br></br>
        {/* Login section - users with an account - takes them to pets page (list of pets) */}
        <section className="nes-container with-title">
          <h3 className="title">Log In</h3>
          <p>Already have an account? Log in below!</p>
          <h4>Email</h4>
          <input
            className="nes-input"
            onChange={this.handleChange}
            type="email"
            placeholder="Type your email..."
          ></input>
          <h4>Password</h4>
          <input
            className="nes-input"
            type="password"
            placeholder="Type your password..."
          ></input>

          <button
            type="button"
            onClick={this.attemptLogin}
            className="nes-btn is-primary"
          >
            Log In
          </button>
        </section>
        {/* Create pet section - users sign up to create a pet - redirects them to create pet page*/}
        {/* <section className="nes-container with-title" id="createPet">
          <h3 className="title">Sign Up</h3>
          <p>Sign up to create a pet</p>
          <h4>Email</h4>
          <input
            className="nes-input"
            type="email"
            placeholder="Enter your email..."
          ></input>
          <h4>Password</h4>
          <input
            className="nes-input"
            type="password"
            placeholder="Create a password..."
          ></input>
          <button className="nes-btn is-primary" onClick={e => this.toLogin()}>
            Sign Up
          </button>
        </section> */}
      </div>
    );
  }
}

export default LogIn;
