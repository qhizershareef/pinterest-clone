import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getPinByIdReducer, getPinsReducer, pinLikeReducer } from './reducers/pinsreducer';
import { userFollowReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducer';

const reducer = combineReducers({
    getPins:getPinsReducer,
    pinDetails:getPinByIdReducer,
    userLogin: userLoginReducer,
    pinLike: pinLikeReducer,
    userRegister: userRegisterReducer,
    userFollow: userFollowReducer
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
