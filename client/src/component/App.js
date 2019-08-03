import React ,{Component} from 'react';
import Register from './register/Register'
import Login from './login/login'
import Navbar from "./Navbar"
import Buy from "./stock/buy"
import HomeBase from "./homeBase"
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
class App extends Component {
  render(){
    return (
      <Router>
      <div>
      <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/home" component={HomeBase}/>
      <Route exact path="/buy" component={Buy}/>
      </Switch>
      </div>
      </Router>
    )
  }
}

export default App;

