import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import {clearCurrentProfile} from '../../actions/profileAction';


 class Navbar extends Component {


  onLogoutClick(e){
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser()

  }
    render() {
      const{isAuthenticated,user}=this.props.auth



    const authLink=(
      <ul className="navbar-nav ml-auto">
         <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard </Link>
      </li>
      <li className="nav-item">
          <Link className="nav-link" to="/feed">Post Fedds </Link>
      </li>
      
      <li className="nav-item">
          <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link" >
            <img   className="rounded-circle" src={user.avatar} 
             alt={user.name}  
             style={{width:'25px' ,  marginRight:'5px'}}
               title="you must have a Gravatar connected to your email to display an image"
               />{" "}
            Logout </a>
      </li>
    </ul>
    )
    
    const guestLink=(
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <Link  className="nav-link" to="/register">Register</Link>
      </li>
      <li className="nav-item">
          <Link className="nav-link" to="/login">Login </Link>
      </li>
    </ul>
    )



        return (
            
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="landing.html">DevConnector</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles"> Developers
            </Link>
          </li>
        </ul>
        {isAuthenticated?  authLink:guestLink}

       
      </div>
    </div>
  </nav> 
           
        )
    }
}

const mapStateToProps=(state)=>{
  return{
    auth:state.auth
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    logoutUser:()=>{dispatch(logoutUser())},
    clearCurrentProfile:()=>{dispatch(clearCurrentProfile())}
  }
}
export default  connect(mapStateToProps,mapDispatchToProps) (Navbar) 
