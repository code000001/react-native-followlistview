import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import GitUserReducer from './GitUserReducer';
import GitFollowReducer from './GitFollowReducer';
import GitFollowUpdateReducer from './GitFollowUpdateReducer';

export default combineReducers({
    auth: AuthReducer,
    gits: GitUserReducer,
    folls: GitFollowReducer,
    gitFoll: GitFollowUpdateReducer
});