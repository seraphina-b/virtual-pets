//make poop a component
import React from "react";
import Pusher from "pusher-js";
import { Router, useParams, Link } from "react-router-dom";

//poop images
import poop from "../.././images/petAlerts/poop.png";


class Poop extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match);
        this.state = {
            pet: {}
        };
    }

    // function to connect to pusher
    // this is a cron job controlled in petBars and sendNotifications
    // connectToPusher = () => {
    //     var pusher = new Pusher("a6e425669a496f8c754a", {
    //         cluster: "eu",
    //         forceTLS: true
    //     });

    //     var channel = pusher.subscribe("my-channel");
    //     channel.bind("my-event", data => {
    //         console.log(data);
    //         this.getData();
    //     });
    // };

    componentDidMount = () => {
        // this.connectToPusher();
        this.getData();
    };

    // getData captures the pet data and displays it on the screen
    // this basically refreshed the page and updates the pet info
    getData = () => {
        let id = this.props.match.params.id;
        fetch(`/pets/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    pet: data
                });
            })
            .catch(error => {
                console.log(error);
            });
    };


    render() {
        // making the pet 'grow' - changing the lifeStage images depending on time
        let poopPic;
        if (this.state.pet.foodTime <= "00:0:30") {
            poopPic = <img src={poop} alt="poop"></img>;
        } else poopPic = NULL;


        return (
            <div className="container">

                {poopPic}


            </div>
        );
    }
}
export default Poop;
