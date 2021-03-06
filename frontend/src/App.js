import './App.css';

import { MemoryRouter, BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
// import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


import HomePage from './components/HomePage';
import {DevicePage} from './components/DevicePage';
import ControllerPage from './components/ControllerPage';
import SuperAdminPage from './components/SuperAdminPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Container className="p-3">
          <Jumbotron>
            <h1 className="header">Electrical Vehicles Charger Station</h1>

            <center>

            <ButtonToolbar className="custom-btn-toolbar">
              <Link to="/home">
                <Button> Home </Button>
              </Link>

              <Link to="/device">
                <Button> Device </Button>
              </Link>

              <Link to="/controller">
                <Button> Controller </Button>
              </Link>

              <Link to="/superAdmin">
                <Button> SuperAdmin </Button>
              </Link>
              </ButtonToolbar>
            </center>

            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/device" component={DevicePage} />
              <Route path="/controller" component={ControllerPage} />
              <Route path="/superAdmin" component={SuperAdminPage} />
            </Switch>

          </Jumbotron>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
