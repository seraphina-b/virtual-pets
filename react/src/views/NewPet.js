import React from 'react';


class NewPet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    handleChange = (e) => {
        this.setState({name: e.target.value});
    } 

    handleClick = () => {
        this.setState(prevState => ({
            isNewPet: !prevState.isNewPet
        }));
    }

    handleSubmit = () => {
        fetch("/api/pets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.state.name })
          })
          .then(res => res.json())
          .then(console.log("Posted your pet, baby!"))
          .catch(error => {
            console.log(error);
          });
    }
  
    render() {
        return (
            <body>
                <input className="nes-input" onChange={this.handleChange}/>
                <button type="button" onClick={this.handleClick} className="nes-btn is-success">Submit</button>
            </body>
        )
    }
}

export default NewPet;