import React, {Component} from 'react'
import './Signup.css'
class Signup extends Component{
render(){
    return(
        <div className="container">  <div className="signin-container"> <form className="form-signin card" >
            <div className="card-body">
        <h2 className="form-signin-heading">LeadCRM</h2>
        <label for="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"  autofocus></input>
        <label for="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" ></input>
                <label for="inputPassword" className="sr-only">Confirm Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Confirm Password" ></input>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button></div>
      </form></div></div>
    )
}
}

export default Signup