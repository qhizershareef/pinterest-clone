import * as ActionTypes from '../actiontypes/pinsConstants';

const getPinsReducer = (state={pins:[]},action) =>{
    switch(action.type){
        case ActionTypes.FETCH_PINS_REQUEST:
            return { loading:true, pins:[]}
        case ActionTypes.FETCH_PINS_SUCCESS:
            return { loading:false, pins:action.payload}
        case ActionTypes.FETCH_PINS_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}

const getPinByIdReducer = (state={ pin:{}},action) =>{

    switch(action.type){
        case ActionTypes.PIN_DETAILS_REQUEST:
            return {...state, loading:true}
        case ActionTypes.PIN_DETAILS_SUCCESS:
            return { loading:false, pin:action.payload}
        case ActionTypes.PIN_DETAILS_FAIL:
            return { loading:false, error:action.payload}
        case ActionTypes.PIN_DETAILS_RESET:
            return {}
        default:
            return state;
    }
}

const pinLikeReducer = (state={},action) =>{
    switch(action.type){
        case ActionTypes.PIN_LIKE_REQUEST:
            return {loading:true}
        case ActionTypes.PIN_LIKE_SUCCESS:
            return { loading:false, success:true}
        case ActionTypes.PIN_LIKE_FAIL:
            return { loading:false, error:action.payload}
        case ActionTypes.PIN_LIKE_RESET:
            return { }
        default:
            return state;
    }
}

// collectionName
const createCollectionReducer = (state={},action)=>{
    switch(action.type){
        case ActionTypes.PIN_COLLECTION_CREATE_REQUEST:
            return { loading:true}
        case ActionTypes.PIN_COLLECTION_CREATE_SUCCESS:
            return { loading: false, success:true}
        case ActionTypes.PIN_COLLECTION_CREATE_FAIL:
            return { loading:false, error:action.payload}
        case ActionTypes.PIN_COLLECTION_CREATE_RESET:
            return { }
        default:
            return state;
    }
}

export {getPinsReducer, getPinByIdReducer, pinLikeReducer, createCollectionReducer }