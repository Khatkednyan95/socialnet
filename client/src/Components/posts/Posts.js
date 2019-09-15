import React, { Component } from 'react';
import {getPosts} from '../../actions/postActions'
import PostForm from './PostForm';
import PostFeed from './PostFeed'
import Spinner from '../common/Spinner';
import {connect} from 'react-redux';

 class Posts extends Component {
     componentDidMount(){
         this.props.getPosts();
     }
    render() {
        const {posts,loading}=this.props.post
        let postContent;
        if(posts===null || loading)
        {
            postContent=<Spinner/>
        }
        else{
            postContent=<PostFeed posts={posts} />
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                         <PostForm/>
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
    getPosts:()=>dispatch(getPosts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts)
