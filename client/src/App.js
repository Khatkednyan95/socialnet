import React, { Component } from 'react';
import {setCurrentUser,logoutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileAction';
import PrivateRoute from './Components/common/PrivateRoute'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux'
import Navbar from './Components/Layout/Navbar'
import Footer from './Components/Layout/Footer'
import Landing from './Components/Layout/LandingPage';
import Register from './Components/Auth/Register';
import Dashboard from './Components/dashboard/Dashboard';
import AddEducation from './Components/add-credentials/AddEductaion';
import AddExperience from './Components/add-credentials/AddExperience';
import CreateProfile from './Components/create-profile/CreateProfile';
import EditProfile from './Components/Edit-profile/Edit-profile';
import Profiles from './Components/Profiles/Profiles';
import Profile from './Components/Profile/Profile'
import Login from './Components/Auth/Login';
import Posts from './Components/posts/Posts'
import Post from './Components/post/Post';
import store from './store'



import './App.css';

if(localStorage.jwtToken)
{
  setAuthToken(localStorage.jwtToken)


  const decoded=jwt_decode(localStorage.jwtToken)

  store.dispatch(setCurrentUser(decoded))


  const   CurrentTime=Date.now()/1000
  

  if(decoded.exp<CurrentTime)
  {
   
    store.dispatch(clearCurrentProfile())


    store.dispatch(logoutUser())


  }

}

 class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
      <div className="App">
        <Navbar/>
        <Route  exact path="/" component={Landing}/>
        <div className="container">
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profiles" component={Profiles}/>
          <Route exact path="/profile/:handle" component={Profile}/>

          <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
         </Switch>

         <Switch>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
         </Switch>
          
          <Switch>
            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
          </Switch>

          <Switch>
            <PrivateRoute exact path="/add-education" component={AddEducation}/>
          </Switch>

          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
          </Switch>
          <Switch>
            <PrivateRoute exact path="/feed" component={Posts}/>
          </Switch>
          <Switch>
            <PrivateRoute exact path="/post/:id" component={Post}/>
          </Switch>
        </div>
        <Footer/>
      </div>
      </Router>
      </Provider>
      
    )
  }
}

export default App


