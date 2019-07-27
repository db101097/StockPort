import React ,{Component} from 'react';
import Register from './Register'
import Login from './login'
import Navbar from "./Navbar"
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
class App extends Component {
  render(){
    return (
      <Router>
      <div>
      <Navbar/>
      <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      </Switch>
      </div>
      </Router>
    )
  }
}

export default App;

