import React, {Component} from 'react'
import './Login.css'
import {login} from '../../modules/user/user'
import * as Action from '../../actions/action'
import {connect} from 'react-redux'
class Login extends Component{
    constructor(props){
        super(props);
        this.authenticate=this.authenticate.bind(this);
        this.state={user:{},error:undefined};
    }

    authenticate(event){
        console.log("authenticate");
        this.setState({
            error:undefined
        })
        login(this.state.user.email,this.state.user.password).then((res)=>{
            this.props.loggedIn(res.data.user);
            console.log("1 props "+JSON.stringify(this.props));
           this.props.history.push('/');
             console.log("2");
        }).catch((err)=>{
            console.log("error");
        })

        event.preventDefault();
    }

    valChange(e,field){
            this.state.user[field]=e.target.value;
            this.setState({
                user:this.state.user
            })
        }
render(){
    const {user} = this.state;
    return(
        <div className="container"> <div className="signin-container ">  <form className="form-signin card " onSubmit={this.authenticate} >
            <div className="card-body">
        <h2 className="form-signin-heading">LeadCRM</h2>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"  autoFocus value={user.email} onChange={(e)=>this.valChange(e,'email')}></input>
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={user.password} onChange={(e)=>this.valChange(e,'password')}></input>

        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!user.email || !user.password}>Sign in</button></div>
      </form></div></div>
    )
}
}

const mapDispatchToProps = (dispatch,ownProps)=>{
  return {
      loggedIn:(user)=>{
          dispatch(Action.loggedIn(user))
      }
  }
}




const LoginConn = connect(undefined,mapDispatchToProps)(Login)

export default LoginConn