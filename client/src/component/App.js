import React ,{Component} from 'react';
import Register from './Register'
import Login from './login'
import Navbar from "./Navbar"
class App extends Component {
  render(){
    return (
      <div>
      <Navbar/>
      <Login/>
      </div>
    )
  }
}

export default App;

