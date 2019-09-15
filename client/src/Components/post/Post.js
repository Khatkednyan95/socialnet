import React, { Component } from 'react';
import Spinner from '../common/Spinner'
import {connect} from "react-redux";
import PostItem from '../posts/PostItem'
import {getPost} from '../../actions/postActions';
import CommentFeed from './CommentFeed'
import CommentForm from './CommentForm'

 class Post extends Component {
     componentDidMount(){
         this.props.getPost(this.props.match.params.id)
     }
    render() {
        const {post,loading}=this.props.post

        let postContent;
        if(post===null ||loading ||Object.keys(post).length===0)

        {
            postContent=<Spinner/>
        }
        else{
            postContent=(
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <CommentFeed postId={post._id} comments={post.comments}/>
                </div>
            )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {postContent}
                        </div>
                    </div>
                </div>
               
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        post:state.post
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        getPost:(id)=>dispatch(getPost(id))

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post) 
