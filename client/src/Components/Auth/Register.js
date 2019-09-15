import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {authAction} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';

 class Register extends Component {
     constructor(props)
     {
         super(props)
         this.state={
           name:'',
           email:'',
           password:'',
           password2:'',
           errors:{}  
         }
      this.onChange=this.onChange.bind(this)
      this.onSubmit=this.onSubmit.bind(this)

     }
     componentDidMount(){
      if(this.props.auth.isAuthenticated)
      {
        this.props.history.push('/dashboard')
      }
    }

     componentWillReceiveProps(nextProps)
     {
       if(nextProps.errors)
       {
         this.setState({errors:nextProps.errors})
       }
     }
     onChange(e){
         this.setState({[e.target.name]:e.target.value})
     }
     onSubmit(e){
         e.preventDefault()
         const newUser={
             name:this.state.name,
             email:this.state.email,
             password:this.state.password,
             password2:this.state.password2,

         };
         
          this.props.authAction(newUser,this.props.history)
          

         

     }
    render() {
      
        const {errors} =this.state
        return (
            <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form onSubmit={this.onSubmit} noValidate>
          <TextFieldGroup
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}/>
            

            <TextFieldGroup
            placeholder="Email-Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            info="This sites uses Gravatar so if you want profile image use a Gravatar E-mail"
            />
           
           <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}/>

            
            <TextFieldGroup
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}/>
            
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>

        )
    }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.auth ,
    errors:state.error
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
   authAction:(user,history)=>dispatch(authAction(user,history))
  } 
}
export default  connect(mapStateToProps,mapDispatchToProps)(withRouter(Register)) 
