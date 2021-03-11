import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
// import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {LinkContainer} from 'react-router-bootstrap';


import HomePage from './components/HomePage';
import {DevicePage} from './components/DevicePage';
import {ControllerPage} from './components/ControllerPage';
import {SuperAdminPage} from './components/SuperAdminPage';


function App() {
  return (
      <>
        <BrowserRouter>
          <Container className="p-3">
            <Jumbotron>
              <h1 className="header">Electrical Vehicles Charger Station</h1>
              <ButtonToolbar className="custom-btn-toolbar">
                <LinkContainer to="/home">
                  <Button>Home</Button>
                </LinkContainer>
                <LinkContainer to="/device">
                  <Button>Device</Button>
                </LinkContainer>
                <LinkContainer to="/controller">
                  <Button>Controller</Button>
                </LinkContainer>
                <LinkContainer to="/superAdmin">
                  <Button>Super Admin</Button>
                </LinkContainer>
              </ButtonToolbar>

              <Switch>
                <Route path="/home" component={HomePage}/>
                <Route path="/device" component={DevicePage}/>
                <Route path="/controller" component={ControllerPage}/>
                <Route path="/superAdmin" component={SuperAdminPage}/>
              </Switch>

            </Jumbotron>
          </Container>
        </BrowserRouter>
      </>
  );
}

export default App;
