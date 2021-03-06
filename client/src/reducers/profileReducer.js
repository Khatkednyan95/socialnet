import * as actionTypes from '../actions/types'
const initialstate={
    profile:null,
    profiles:null,
    loading:false
}
export default function(state=initialstate,action)
{
    switch(action.type)
    {
      case actionTypes.PROFILE_LOADING:
          return{
              ...state,
              loading:true
          }

      case actionTypes.GET_PROFILE:
          return{
              ...state,
              profile:action.payload,
              loading:false
          }
        case actionTypes.GET_PROFILES:
            
             return {
                ...state,
                profiles:action.payload,
                loading:false
        
            }
          case actionTypes.CLEAR_CURRENT_PROFILE:{
              return{
                  ...state,
                  profile:null
              }
          }
        default :
        return state;
    }
}