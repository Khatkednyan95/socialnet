import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/postActions'

 class CommentItem extends Component {
     onDeleteClick(postId,commentId)
     {
         this.props.deleteComment(postId,commentId)
     }
    render() {
        const {auth,comment,postId}=this.props
        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                  </a>
                  <br />
                  <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{comment.text}</p>
                  {comment.user === auth.user.id ?(
                       <button type="button" onClick={this.onDeleteClick.bind(this,postId,comment._id,)} className="btn btn-danger mr-1">
                       <i className="fas fa-times " />
                       </button>
                   ) :null}
                </div>
              </div>
            </div>

        )
    }
}

const mapStateToProps=state=>{
    return{
        auth:state.auth
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        deleteComment:(postId,commentId)=>dispatch(deleteComment(postId,commentId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CommentItem)
