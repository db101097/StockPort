import React ,{Component} from 'react';
import Register from './register/Register'
import Login from './login/login'
import Navbar from "./Navbar"
import Buy from "./stock/buy"
import HomeBase from "./homeBase"
import Transaction from "./transactions/transactions"
import Portfolio from './portfolio/portfolio'
import Protected from './Protected'
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
      <Route exact path="/home" component={(props) => <Protected {...props} component={<HomeBase/>} />}/>
      <Route exact path="/buy" component={(props) => <Protected {...props} component={<Buy/>} />}/>
      <Route exact path="/transactions" render={(props) => <Protected {...props} component={<Transaction/>} />}/>
      <Route exact path="/portfolio" component={(props) => <Protected {...props} component={<Portfolio/>} />}/>
      </Switch>
      </div>
      </Router>
    )
  }
}

export default App;

