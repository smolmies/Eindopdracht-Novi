import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header";

function App() {
  return (

      <Router>
              <Header />
              <Switch>
                  <Route exact path="/">
                  {/*   hier komt de homepagina*/}
                  </Route>
                  <Route path="/about-us">
                  {/*   hier komt de info/over ons pagina*/}
                  </Route>
                  <Route path="/appointment">
                  {/*    hier komt de afspraak pagina*/}
                  </Route>
                  <Route path="/contact">
                  {/*    hier komt de contact pagina*/}
                  </Route>
              </Switch>

      </Router>
  );
}

export default App;
