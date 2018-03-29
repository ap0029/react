import React,{Component,PropTypes} from 'react'
import {Link,NavLink,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Action from '../actions/action'
 class Header extends Component {

     constructor(props){
         super(props);
         this.logout = this.logout.bind(this);
     }
    isActive(match,location){
        //console.log("match "+JSON.stringify(match)+" location "+JSON.stringify(location));
        console.log("is active");
        return match==null?false:match.path==location.pathname;
    }

     logout(){
         this.props.logout();
         console.log("props header "+JSON.stringify(this.context.router));
        window.location='/login';
     }


    render(){
    return (
<div>
<nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
<a className="navbar-brand" href="#">LeadCRM</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarsExampleDefault">
<ul className="navbar-nav mr-auto w-100">
<li className="nav-item">
<NavLink to="/" className="nav-link" activeClassName="active" isActive={this.isActive}>Leads <span className="sr-only">(current)</span></NavLink>
</li>
<li className="nav-item">
<NavLink to="/new_lead" className="nav-link" activeClassName="active" isActive={this.isActive}>New Lead</NavLink>
</li>
     <li className="nav-item">
<NavLink to="/template" className="nav-link" activeClassName="active" isActive={this.isActive}>Template</NavLink>
</li>
<li className="nav-item">
<NavLink to="/team" className="nav-link" activeClassName="active" isActive={this.isActive}>Team</NavLink>
</li>
    <li className="nav-item" >
<NavLink to="/technology_stacks" className="nav-link" activeClassName="active" isActive={this.isActive} >Technology Stacks</NavLink>
</li>
    <li className="nav-item dropdown m-l-a">
            <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.user.name}</a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
              <a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
            </div>
          </li>

</ul>

</div>
</nav>
</div>
)}
}


const mapStateToProps = (state,ownProps)=>{
    return Object.assign({},ownProps,{user:state.leadApp.user})
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return{
        logout:()=>{
            dispatch(Action.logout())
        }
    }
}
const HeaderConn = connect(mapStateToProps,mapDispatchToProps,undefined, { pure: false })(Header)

export default HeaderConn;