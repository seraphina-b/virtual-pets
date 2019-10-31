import React from 'react';
import NewPet from "./NewPet.js"


class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNewPet: false
        };
    }


    handleClick = () => {
        this.setState(prevState => ({
            isNewPet: !prevState.isNewPet
        }));
            console.log(this.state.isNewPet);
    }

  
    render() {
        return (
            <body>
                <button type="button" onClick={this.handleClick} className="nes-btn is-primary">Create New Pet</button>
                {this.state.isNewPet ? <NewPet/> : null } 
            </body>
        )
    }
}

export default Create;