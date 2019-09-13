import React ,{Component} from 'react';
import Register from './register/Register'
import Login from './login/login'
import Navbar from "./Navbar"
import Buy from "./stock/buy"
import HomeBase from "./homeBase"
import Transaction from "./transactions/transactions"
import Portfolio from './portfolio/portfolio'
import Protected from './Protected'
import Logout from './logout'
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
class App extends Component {
  render(){
    return (
      <Router>
      <div>
      <Switch>
      <Route exact path="/" component={(props) => <Protected {...props} component={<Buy/>} login={<Login/>}/>}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/buy" component={(props) => <Protected {...props} component={<Buy/>} login={<Login/>}/>}/>
      <Route exact path="/transactions" render={(props) => <Protected {...props} component={<Transaction/>} login={<Login/>}/>}/>
      <Route exact path="/portfolio" component={(props) => <Protected {...props} component={<Portfolio/>} login={<Login/>} />}/>
      <Route exact path="/logout" component={(props) => <Protected {...props} component={<Logout/>} login={<Login/>} />}/>
      </Switch>
      </div>
      </Router>
    )
  }
}

export default App;

