import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <button className="nes-btn">Feed Me!</button>
                <progress className="nes-progress" max="10" value="5"/>
            </div>
        )
    }
}

export default Header; 