import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom'
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Signup from './routes/Signup/Signup';

class App extends Component {
  render() {
    return (
        <Router>
      <div className="App">
          <Switch>
              <Route  path="/login" component={Login} />
                <Route  path="/signup" component={Signup}/>
        <Route  path="/" render={props=>(
            this.props.user?(<Home {...props}/>):(<Redirect to={{pathname:'/login',state:{from:props.location}}}/>)
        )}/>

              </Switch>
      </div>
            </Router>
    );
  }
}

export default connect((state,ownProps)=>{
    console.log("app "+JSON.stringify(state));
    return{
        user:state.leadApp.user
    }
},undefined)(App);
