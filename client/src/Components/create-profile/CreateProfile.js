import React, { Component } from 'react';
import {connect} from 'react-redux';
import{withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputFieldGroup from '../common/InputFieldGroup'
import {createProfile} from '../../actions/profileAction'



 class CreateProfile extends Component {
     constructor(props)
     {
         super(props)
         this.state = {
            displaySocialInputs: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            errors: {}
          };
          this.onChange=this.onChange.bind(this)
          this.onSubmit=this.onSubmit.bind(this)
     }
     onSubmit(e)
     {
         e.preventDefault()
         const profileData={
             handle:this.state.handle,
             company:this.state.company,
             website:this.state.website,
             status:this.state.status,
             location:this.state.location,
             skills:this.state.skills,
             githubusername:this.state.githubusername,
             bio:this.state.bio,
             twitter:this.state.twitter,
             facebook:this.state.facebook,
             instagram:this.state.hinstagram,
             linkedin:this.state.linkedin,
             youtube:this.state.youtube,
         

         }
         this.props.createProfile(profileData,this.props.history)
     }
     
     componentWillReceiveProps(nextProps){
         if(nextProps.errors)
         {
             this.setState({
                 errors:nextProps.errors
             })
         }
     }
     onChange(e)
     {
         this.setState({[e.target.name]:e.target.value})
     }
    render() {
        const {errors,displaySocialInputs}=this.state;


           let socialInputs;
           if(displaySocialInputs)
           {
               socialInputs=(
                   <div>

                   
                   <InputFieldGroup
                   placeholder="Twitter Profile Url"
                   name="twitter"
                   icon="fab fa-twitter"
                   value={this.state.twitter}
                   onChange={this.onChange}
                   error={errors.twitter}
                   />

                   <InputFieldGroup
                   placeholder="Facebook Profile Url"
                   name="facebook"
                   icon="fab fa-facebook"
                   value={this.state.facebook}
                   onChange={this.onChange}
                   error={errors.facebook}
                   />
                   <InputFieldGroup
                   placeholder="LinkedIn Profile Url"
                   name="linkedin"
                   icon="fab fa-linkedin"
                   value={this.state.linkedin}
                   onChange={this.onChange}
                   error={errors.linkedin}
                   />  
                   
                   <InputFieldGroup
                   placeholder="Youtube Channel Url"
                   name="youtube"
                   icon="fab fa-youtube"
                   value={this.state.youtube}
                   onChange={this.onChange}
                   error={errors.youtube}
                   /> 

                    <InputFieldGroup
                   placeholder="Instagram Page Url"
                   name="instagram"
                   icon="fab fa-instagram"
                   value={this.state.instagram}
                   onChange={this.onChange}
                   error={errors.instagram}
                   /> 

                   </div>

               )
           }

        const options=[
            {label:'*Select Professional Status', value:0},
            { label: "Developer", value: "Developer" },
            { label: "Junior Developer", value: "Junior Developer" },
            { label: "Senior Developer", value: "Senior Developer" },
            { label: "Manager", value: "Manager" },
            { label: "Student of Learning", value: "Student of Learning" },
            { label: "Instructor or Teacher", value: "Instructor or Teacher" },
            { label: "Intern", value: "Intern" },
            { label: "Other", value: "Other" }
        ]
                return (
            <div className="create-profile"> 
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                          <h1 className="display-4 text-center">Create your profile</h1>
                          <p className="lead text-center">
                              Let's get some information to make your Profile stand out
                          </p>
                          <small className="d-block pb-3">* =required fields</small>
                          <form onSubmit={this.onSubmit}>
                              <TextFieldGroup
                              placeholder="* Profile Hanlde"
                              name="handle"
                              value={this.state.handle}
                              onChange={this.onChange}
                              error={errors.handle}
                              info="A unique handle for your profile URL. Your full name, company name,nickname"/>

                              <SelectListGroup
                              placeholder="Status"
                              name="status"
                              value={this.state.status}
                              options={options}
                              onChange={this.onChange}
                              error={errors.status}
                              info="Give us idea of where you are at in your carrer"/>

                              <TextFieldGroup
                              placeholder="Company"
                              name="company"
                              value={this.state.company}
                              onChange={this.onChange}
                              error={errors.company}
                              info="Could be your company"/>

                              <TextFieldGroup
                              placeholder="Website"
                              name="website"
                              value={this.state.website}
                              onChange={this.onChange}
                              error={errors.website}
                              info="Could be your own website or a company"/>

                              <TextFieldGroup
                              placeholder="Location"
                              name="location"
                              value={this.state.location}
                              onChange={this.onChange}
                              error={errors.location}
                              info="City or city & state suggested (eg. Boston, MA)"/>


                              <TextFieldGroup
                              placeholder="Skills"
                              name="skills"
                              value={this.state.skills}
                              onChange={this.onChange}
                              error={errors.skills}
                              info="Please us comma seperated values . (eg. HTML, CSS, JavaScript, PHP)"/>

                             <TextFieldGroup
                              placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                 onChange={this.onChange}
                                   error={errors.githubusername}
                                     info="If you want your latest repos and a Github link, include your username"
                                              />
                

                                      <TextAreaFieldGroup
                                     placeholder="Short Bio"
                                       name="bio"
                                    value={this.state.bio}
                                     onChange={this.onChange}
                                   error={errors.bio}
                                   info="Tell us a little about yourself"
                                             />
                                             <div className="mb-3">
                                                 <button 
                                                 type="button"
                                                 onClick={()=>{
                                                     this.setState(prevState=>({
                                                        displaySocialInputs:!prevState.displaySocialInputs
                                                     }))
                                                 }}
                                                 className="btn btn-light">
                                                  Add Social Network Links
                                                 </button>
                                                 <span className="text-muted">Optional</span>
                                             </div>
                                             {socialInputs}
                                             <input type="submit" className="btn btn-info btn-block mt-4"/>

                          </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        profile:state.profile,
        errors:state.error
    }
}
const mapDispatchToProps=dispatch=>{
return {
    createProfile:(profileData,history)=>{dispatch(createProfile(profileData,history))}
}
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateProfile))
