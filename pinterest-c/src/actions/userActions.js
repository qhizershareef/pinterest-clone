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


const logout = () => (dispatch) => {
    dispatch(
        {
            type:ActionTypes.USER_LOGOUT
        }
    )
    // dispatch(
    //     {type: ActionTypes.USER_DETAILS_RESET}
    // )
    localStorage.removeItem('userInfo');
    // document.location.href = '/'
};

export {userLogin, userRegister, userFollowAction, logout}