import React, { Component } from 'react';
import {addComment} from '../../actions/postActions';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
 
 class Comments extends Component {
     
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
         const {postId}=this.props

         const newComment={
             text:this.state.text,
             name:user.name,
             user:user.id,
             avatar:user.avatar
         }
         this.props.addComment(postId,newComment);
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
                  placeholder="Reply to a post"
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
        addComment:(id,data)=>dispatch(addComment(id,data))
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Comments)
