import * as ActionTypes from '../actiontypes/userConstants';

const userLoginReducer = (state={},action) =>{
    switch(action.type){
        case ActionTypes.USER_LOGIN_REQUEST:
            return {loading:true}
        case ActionTypes.USER_LOGIN_SUCCESS:
            return { loading:false, userInfo:action.payload}
        case ActionTypes.USER_LOGIN_FAIL:
            return { loading:false, error:action.payload}
        case ActionTypes.USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

const userRegisterReducer = (state={},action) =>{
    switch(action.type){
        case ActionTypes.USER_REGISTER_REQUEST:
            return {loading:true}
        case ActionTypes.USER_REGISTER_SUCCESS:
            return { loading:false, userInfo:action.payload}
        case ActionTypes.USER_REGISTER_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state;
    }
}

const userFollowReducer = (state={},action) =>{
    switch(action.type){
        case ActionTypes.USER_FOLLOW_REQUEST:
            return {loading:true}
        case ActionTypes.USER_FOLLOW_SUCCESS:
            return { loading:false, success:true}
        case ActionTypes.USER_FOLLOW_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state;
    }
}
export {userLoginReducer, userRegisterReducer, userFollowReducer}