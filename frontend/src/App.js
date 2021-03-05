import './App.css';
import { Route, Switch, Link, BrowserRouter } from "react-router-dom";
import HomePage from './components/HomePage';

function App() {
  return (
    <>
      <HomePage/>
        <BrowserRouter>
          <center>
            <ul>
              <li>
                <Link to="">  new component</Link>
                
              </li>
              </ul>
          </center>
          <Switch> 
            <Route path="" component=""/>
            <Route path="" component=""/>
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
