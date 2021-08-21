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
        case ActionTypes.USER_REGISTER_RESET:
            return {}
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


const userProfileReducer = (state={},action)=>{
    switch(action.type){
        case ActionTypes.USER_PROFILE_REQUEST:
            return {loading:true}
        case ActionTypes.USER_PROFILE_SUCCESS:
            return {loading:false, profileInfo: action.payload}
        case ActionTypes.USER_PROFILE_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state;
    }
}

const userCollectionsReducer = (state={},action)=>{
    switch(action.type){
        case ActionTypes.USER_COLLECTIONS_REQUEST:
            return {loading:true}
        case ActionTypes.USER_COLLECTIONS_SUCCESS:
            return {loading:false, collections: action.payload}
        case ActionTypes.USER_COLLECTIONS_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state;
    }
}

const userSavePinReducer = (state={},action)=>{
    switch(action.type){
        case ActionTypes.USER_SAVE_PIN_REQUEST:
            return {loading:true}
        case ActionTypes.USER_SAVE_PIN_SUCCESS:
            return {loading:false, success: true}
        case ActionTypes.USER_SAVE_PIN_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state;
    }
}

const userSavedPinsReducer = (state={},action)=>{
    switch(action.type){
        case ActionTypes.USER_SAVED_PINS_REQUEST:
            return {loading:true}
        case ActionTypes.USER_SAVED_PINS_SUCCESS:
            return {loading:false, savedPins: action.payload}
        case ActionTypes.USER_SAVED_PINS_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state;
    }
}


export {userLoginReducer, userRegisterReducer, userFollowReducer, userProfileReducer, userCollectionsReducer,
    userSavePinReducer, userSavedPinsReducer
}