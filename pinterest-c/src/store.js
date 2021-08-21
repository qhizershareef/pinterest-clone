import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createCollectionReducer, getPinByIdReducer, getPinsReducer, pinLikeReducer } from './reducers/pinsreducer';
import { userCollectionsReducer, userFollowReducer, userLoginReducer, userProfileReducer, userRegisterReducer, userSavedPinsReducer, userSavePinReducer } from './reducers/userReducer';

const reducer = combineReducers({
    getPins:getPinsReducer,
    pinDetails:getPinByIdReducer,
    userLogin: userLoginReducer,
    pinLike: pinLikeReducer,
    userRegister: userRegisterReducer,
    userFollow: userFollowReducer,
    userProfile: userProfileReducer,
    createCollection: createCollectionReducer,
    userCollections:userCollectionsReducer,
    userSavePin: userSavePinReducer,
    userSavedPins: userSavedPinsReducer
})

const userInfoFromLocal = localStorage.getItem('userInfo');
const userInfo = userInfoFromLocal ? JSON.parse(userInfoFromLocal):null;

const initialState={
    userLogin:{
        userInfo
    }
}

const middleware =[thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
