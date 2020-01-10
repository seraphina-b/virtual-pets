import React, { useState } from 'react';


function LogInBox(props) {

    const [isLogIn, setLogin] = useState(props.login);

    return (
        <React.Fragment>
            <section className="nes-container with-title">
                <h3 className="title">Sign Up</h3>
                <h6>Don't have an account? Sign up below!</h6>
                <h3>Email</h3>
                <input 
                    className="nes-input"
                    placeholder="Type your email...">
                </input>
                <h3>Password</h3>
                <input
                    className="nes-input"
                    placeholder="Type your password...">
                </input>
                <button
                    className="nes-btn is-primary">
                    Sign Up
                </button>
            </section>
        </React.Fragment>
    )
}

export default LogInBox;