import React, { Component } from 'react';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import ProfileItems from './ProfileItem'
import {getProfile} from '../../actions/profileAction'

 class Profiles extends Component {
     componentDidMount()
     {
         this.props.getProfile()
     }
    render() {
        const {profiles,loading}=this.props.profile
        let profileItems;
        if(profiles ===null || loading)
        {
            profileItems=<Spinner/>
        }else{
            if(profiles.length>0)
            { 
                profileItems=profiles.map(profile=>(
                    <ProfileItems key={profile._id} profile={profile}/>
                ))
                

            }else{
                profileItems=<h4>No profiles found..</h4>
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">
                                Browse and connect with developers
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
    profile:state.profile    
    }
}
const mapDispatchToProps=dispatch=>{
    return{
   getProfile:()=>{dispatch(getProfile())}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profiles)
