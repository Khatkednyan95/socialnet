import * as actionTypes from './types';
import axios from 'axios';

export const getCurrentProfile=()=>{
    return dispatch=>{
        dispatch(setProfileLoading())
        axios.get('/api/profile')
        .then(res=>
            dispatch({
             type:actionTypes.GET_PROFILE,
             payload:res.data
            }))
            .catch(err=>
                dispatch({
                    type:actionTypes.GET_PROFILE,
                    payload:{}
                }))
    }
}

export const setProfileLoading=()=>{
    return{
        type:actionTypes.PROFILE_LOADING
    }
}

export const deleteAccount=()=>{
    return dispatch=>{
        if(window.confirm('Are you ? This can NOT be undone !'))
        {
            axios
            .delete('/api/profile')
            .then(res=>
                dispatch({
                    type:actionTypes.SET_CURRENT_USER,
                    payload:{}
                })
                ).catch(err=>
                    dispatch({
                        type:actionTypes.GET_ERRORS,
                        payload:err.response.data
                    }))
        }
    }
}

export const addExperience=(expData,history)=>{
    return dispatch=>{
        axios
        .post('/api/profile/experience',expData)
        .then(res=>history.push('/dashboard'))
        .catch(err=>
            dispatch({
                type:actionTypes.GET_ERRORS,
                payload:err.response.data
            })
            )
    }
}

export const addEducation=(eduData,history)=>{
    return dispatch=>{
        axios
        .post('/api/profile/education',eduData)
        .then(res=>history.push('/dashboard'))
        .catch(err=>
            dispatch({
                type:actionTypes.GET_ERRORS,
                payload:err.response.data
            }))
    }
}

export const deleteExperience=id=>{
    return dispatch=>{
        axios
        .delete(`/api/profile/experience/${id}`)
        .then(res=>dispatch({
            type:actionTypes.GET_PROFILE,
            payload:res.data
        }))
        .catch(err=>
            dispatch({
                type:actionTypes.GET_ERRORS,
                payload:err.response.data
            }))
    }
}

export const deleteEducation=id=>{
    return dispatch=>{
        axios
        .delete(`/api/profile/education/${id}`)
        .then(res=>dispatch({
            type:actionTypes.GET_PROFILE,
            payload:res.data
        }))
        .catch(err=>
            dispatch({
                type:actionTypes.GET_ERRORS,
                payload:err.response.data
            }))
    }
}


export const createProfile=(profileData,history)=>{
   return  dispatch=>{
       axios.post('/api/profile',profileData)
       .then(res=>history.push("/dashboard"))
       .catch(err=>
        dispatch({
            type:actionTypes.GET_ERRORS,
            payload:err.response.data
        }))
       
   }
    
}

export const getProfile=()=>{
    return dispatch=>{
        axios.get('/api/profile/all')
        .then(res=>dispatch({
            type:actionTypes.GET_PROFILES,
            payload:res.data
        })).catch(err=>
            dispatch({
                type:actionTypes.GET_PROFILES,
                payload:null
            }))
    }

}
export const getProfileByHandle=(handle)=>{
    return dispatch=>{
        axios.get(`/api/profile/handle/${handle}`)
        .then(res=>{
            dispatch({
                type:actionTypes.GET_PROFILE,
                payload:res.data
            })
        }).catch(err=>{
            dispatch({
                type:actionTypes.GET_PROFILE,
                payload:null
            })
        })
    }
}

export const clearCurrentProfile=()=>{
    return{
        type:actionTypes.CLEAR_CURRENT_PROFILE
    }
}
