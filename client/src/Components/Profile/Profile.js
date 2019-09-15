import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCred';
import ProfileGithub from './ProfileGithub';
import isEmpty from '../../validation/is-empty'
import Spinnner from '../common/Spinner';
import {getProfileByHandle} from '../../actions/profileAction';

 class Profile extends Component {
     componentDidMount(){
         if(this.props.match.params.handle)
         { 
            this.props.getProfileByHandle(this.props.match.params.handle)


         }
     }
    render() {
        const{profile,loading}=this.props.profile
        let profileContent;
        if(profile===null || loading)
        {
            profileContent=<Spinnner/>
        }else{
            profileContent= ( <div>
               <div className="row">
                    <div className="col-md-6">
                        <Link to="/profiles" className="btn btn-light mb-3 float-left">
                            Back To Profiles
                        </Link>
                    </div>
                    <div className="col-md-6"/>
                   
                </div>
                <ProfileHeader profile={profile}/>
               <ProfileAbout profile={profile}/>
               <ProfileCreds education={profile.education}
               experience={profile.experience}/>
               {isEmpty(profile.githubusername)?null:(<ProfileGithub username={profile.githubusername}/> )}
               
            </div>)
        }
        return (
            <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {profileContent}
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
    getProfileByHandle:(handle)=>{dispatch(getProfileByHandle(handle))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)
