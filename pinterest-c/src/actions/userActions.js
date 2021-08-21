import axios from 'axios';
import * as ActionTypes from '../actiontypes/userConstants';


const userLogin = ( name,password ) => async ( dispatch ) => {
    
    try {
        dispatch({
            type:ActionTypes.USER_LOGIN_REQUEST
        })

        const config = {
            'Content-Type':'application/json',
        }

        const {data} = await axios.post('/api/users/login',{name,password},config)
        
        dispatch({
            type:ActionTypes.USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: ActionTypes.USER_LOGIN_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
};

const userRegister = (user) => async ( dispatch ) => {
    
    try {
        dispatch({
            type:ActionTypes.USER_REGISTER_REQUEST
        })

        const config = {
            'Content-Type':'application/json',
        }

        const {data} = await axios.post('/api/users/register',user,config)
        
        dispatch({
            type:ActionTypes.USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:ActionTypes.USER_LOGIN_SUCCESS,
            payload:data
        })
        
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: ActionTypes.USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
};


const userFollowAction = (id) => async (dispatch,getState) =>{

    try {
        dispatch({type:ActionTypes.USER_FOLLOW_REQUEST});

        const { userLogin:{ userInfo} } = getState();

        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.put(`/api/users/follow`,{id},config);

        //important note second parameter is necessary while updating or sending put request, send empty if there is no value in particular

        dispatch({
            type:ActionTypes.USER_FOLLOW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.USER_FOLLOW_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}


const userProfileRequest = () => async (dispatch,getState) => {
    try {
        dispatch({type:ActionTypes.USER_PROFILE_REQUEST});

        const { userLogin: {userInfo} } = getState();

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }

        const {data} = await axios.get('/api/users/profile',config);

        dispatch(
        {
            type:ActionTypes.USER_PROFILE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({ type:ActionTypes.USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

const userCollectionsRequest = () => async (dispatch,getState) => {
    try {
        dispatch({type:ActionTypes.USER_COLLECTIONS_REQUEST});

        const { userLogin: {userInfo} } = getState();

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }

        const {data} = await axios.get('/api/users/collections',config);

        dispatch(
        {
            type:ActionTypes.USER_COLLECTIONS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({ type:ActionTypes.USER_COLLECTIONS_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

const userSavePin = (id, collectionName) => async (dispatch,getState) => {
    try {
        dispatch({type:ActionTypes.USER_SAVE_PIN_REQUEST});

        const { userLogin: {userInfo} } = getState();

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }

        await axios.post('/api/users/save/pin/'+id, {collectionName},config);

        dispatch(
        {
            type:ActionTypes.USER_SAVE_PIN_SUCCESS
        })
        
    } catch (error) {
        dispatch({ type:ActionTypes.USER_SAVE_PIN_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

const getSavedPins = (collectionName) => async (dispatch,getState) => {
    try {
        dispatch({type:ActionTypes.USER_SAVED_PINS_REQUEST});

        const { userLogin: {userInfo} } = getState();

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }

        const {data} = await axios.get('/api/users/saved/'+collectionName,config);

        dispatch(
        {
            type:ActionTypes.USER_SAVED_PINS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({ type:ActionTypes.USER_SAVED_PINS_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

const logout = () => (dispatch) => {
    dispatch(
        {
            type:ActionTypes.USER_LOGOUT
        }
    )
    dispatch(
        {type: ActionTypes.USER_REGISTER_RESET}
    )
    localStorage.removeItem('userInfo');
    // document.location.href = '/'
};

export {userLogin, userRegister, userFollowAction, logout,userProfileRequest, userCollectionsRequest, userSavePin, getSavedPins}