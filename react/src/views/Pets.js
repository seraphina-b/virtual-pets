//Pets (plural) frontend page
//not to be confused with Pet (singluar)
import React from 'react';
import Pet from "./Pet/Pet.js";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

class Pets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pet: []
        };

    }

    componentDidMount = () => {


        fetch(`/pets/`)
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


    //nicole note: sort of nervous because the number of put pages will increase with use creation
    //may need a map function to map through like in sheba's project
    //it doesn't know which id we're talking about yet, shows up too literally
    render() {
        //i need a function that grabs the text
        const names = this.state.pet.map(pet =>
            (
                <div>

                    <Link to="/pet/:id">{pet.name}</Link>

                </div>

            ));
        return (

            <div>
                <h1>Pets Page</h1>
                <Router>
                    <div>
                        <ul>
                            <li>
                                {names}
                            </li>

                        </ul>

                        <Switch>
                            <Route path="/pet/:id" component={Pet}></Route>

                        </Switch>
                    </div>
                </Router>

            </div>
        )
    }
}
export default Pets;