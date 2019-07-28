import React ,{Component} from 'react';
import Register from './Register'
import Login from './login'
import Navbar from "./Navbar"
import HomeBase from "./homeBase"
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
      <Route exact path="/home" component={HomeBase}/>
      </Switch>
      </div>
      </Router>
    )
  }
}

export default App;

