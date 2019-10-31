import React from 'react';
import bread from "../.././images/bread.png";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <section className="nes-container with-title">
                  <h3 className="title">Actions</h3>
                  <button className="nes-btn"> <img src={bread} alt="Bread icon"/></button>
                  
                </section>
            </div>
        )
    }
}

export default Header; 