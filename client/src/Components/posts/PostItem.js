import React, { Component } from 'react';

import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deletePosts,addLikes,removeLikes} from '../../actions/postActions'
import classnames from 'classnames'

 class PostItem extends Component {
     onDeleteClick(id){
         this.props.deletePosts(id)

     }
     onLikePost(id)
     {
       this.props.addLikes(id)
     }
     unLikePost(id)
     {
         this.props.unLike(id)
     }
     findUserLike(likes)
     {
         const {auth}=this.props
         if(likes.filter(like=>like.user===auth.user.id).length >0)
         {
             return true
         }else{
             return false
         }

     }
    render() {
        const {post,auth,showActions}=this.props
        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>
                 {showActions ?(<span>

                    <button type="button" className="btn btn-light mr-1"
                  onClick={this.onLikePost.bind(this,post._id)}>
                    <i className={classnames('fas fa-thumbs-up',{
                        'text-info':this.findUserLike(post.likes)
                    })} ></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button type="button" className="btn btn-light mr-1" onClick={this.unLikePost.bind(this,post._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                   {post.user== auth.user.id ?(
                       <button type="button" onClick={this.onDeleteClick.bind(this,post._id)} className="btn btn-danger mr-1">
                       <i className="fas fa-times " />
                       </button>
                   ) :null}

                 </span>):null}
                </div>
              </div>
            </div>
        )
    }
}
PostItem.defaultProps = {
    showActions: true
  };


const mapStateToProps=state=>{
    return{
        auth:state.auth,

    }
}
const mapDispatchToProps=dispatch=>{
    return{
        deletePosts:(id)=>dispatch(deletePosts(id)),
        addLikes:(id)=>dispatch(addLikes(id)),
        unLike:(id)=>dispatch(removeLikes(id))


    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostItem)
