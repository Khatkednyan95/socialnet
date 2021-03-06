import React, { Component } from 'react';
import {addPost} from '../../actions/postActions';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
 
 class PostForm extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
          text: "",
          errors: {}
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
     componentWillReceiveProps(newProps)
     {
         if(newProps.errors)
         {
             this.setState({errors:newProps.errors})
         }

         
        }

     onSubmit(e){
         e.preventDefault()
         console.log('submit')
         const {user}=this.props.auth

         const newPost={
             text:this.state.text,
             name:user.name,
             avatar:user.avatar
         }
         this.props.addPost(newPost);
         this.setState({
             text:"",
         })

     }
     onChange(e)
     {
         this.setState({ [e.target.name]:e.target.value})
     }
    render() {
        const {errors}=this.state
        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <TextAreaFieldGroup
                  placeholder="Create a Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text} />
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>

        )
    }
}

const mapStateToProps=state=>{
    return {
     errors:state.error,
     auth:state.auth
    }
}

const mapDispathToProps=dispatch=>{
    return{
        addPost:(data)=>dispatch(addPost(data))
    }
}

export default connect(mapStateToProps,mapDispathToProps)(PostForm)
