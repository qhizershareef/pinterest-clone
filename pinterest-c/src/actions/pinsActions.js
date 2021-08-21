import * as ActionTypes from '../actiontypes/pinsConstants';
import axios from "axios"

const getPins = () => async (dispatch,getState) =>{
    try {
        dispatch({type:ActionTypes.FETCH_PINS_REQUEST});

        const { userLogin:{ userInfo} } = getState();

        const {data} = await axios.get('/api/pins');

        dispatch({
            type:ActionTypes.FETCH_PINS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.FETCH_PINS_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

const pinDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type:ActionTypes.PIN_DETAILS_REQUEST});

        const {data} = await axios.get('/api/pins/'+id);

        dispatch({
            type:ActionTypes.PIN_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.PIN_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

const pinLikeAction = (id) => async (dispatch,getState) =>{

    try {
        dispatch({type:ActionTypes.PIN_LIKE_REQUEST});

        const { userLogin:{ userInfo} } = getState();

        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.put(`/api/pins/${id}/like`,{},config);

        //important note second parameter is necessary while updating or sending put request, send empty if there is no value in particular

        dispatch({
            type:ActionTypes.PIN_LIKE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.PIN_LIKE_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

const collectionCreateAction = (collectionName) => async (dispatch,getState) =>{

    try {

        dispatch({type:ActionTypes.PIN_COLLECTION_CREATE_REQUEST});

        const { userLogin:{ userInfo} } = getState();

        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.post(`/api/pins/create-Board/`,{collectionName},config);

        //important note second parameter is necessary while updating or sending post request, send empty if there is no value in particular

        dispatch({
            type:ActionTypes.PIN_COLLECTION_CREATE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.PIN_COLLECTION_CREATE_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export {getPins, pinDetails, pinLikeAction, collectionCreateAction};