//Pets (plural) frontend page
//not to be confused with Pet (singluar)
import React from 'react';
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
        this.state = {}
    }

    //nicole note: sort of nervous because the number of put pages will increase with use creation
    //may need a map function to map through like in sheba's project
    //it doesn't know which id we're talking about yet, shows up too literally
    render() {
        return (
            <div>
                <h1>Pets Page</h1>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/pet/:id">Pet name</Link>
                            </li>

                        </ul>

                        <Switch>


                        </Switch>
                    </div>
                </Router>

            </div>
        )
    }
}
export default Pets;