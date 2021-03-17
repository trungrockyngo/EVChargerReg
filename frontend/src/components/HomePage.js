import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';


class HomePage extends React.Component {

    render() {
        return (
            <Container className="p-3">
                <Jumbotron>
                    <ul>
                        <li>
                            A blockchain registry for <b>Electric Vehicle Charging Stations</b>.
                        </li>
                        <li>
                            The system will <em>track, manage and enable accurate and reliable
                    data sharing</em> on an open platform where operators provide stations to serve owners of electric vehicles and all the participants are protected from unfair practises.
                        </li>
                    </ul>
                </Jumbotron>
            </Container>
        );
    }
}

export default HomePage;
