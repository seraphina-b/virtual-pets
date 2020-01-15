import React, { useState } from 'react';


function SignUp(props) {

    const [isLogIn, setLogin] = useState(props.login);

    return (
        <div className="container">
        {/* Main section  - user can choose to login or create pet*/}
            <section className="nes-container">
                <div className="row">
                    <div className="col">
                        <h1>Virtual Pets</h1>
                    </div>
                    <button className="nes-btn is-primary">Log In</button>
                </div>
            </section>

        <br></br>

            <section className="nes-container with-title">
                <h3 className="title">Sign Up</h3>
                <p>Don't have an account? Sign up below!</p>
                <h4>Email</h4>
                <input 
                    className="nes-input"
                    placeholder="Type your email...">
                </input>
                <h4>Password</h4>
                <input
                    className="nes-input"
                    placeholder="Type your password...">
                </input>
                <button
                    className="nes-btn is-primary">
                    Sign Up
                </button>
            </section>
            </div>
        
    )
}

export default SignUp;