import {
    FOLLOW_UPDATE,
    FOLLOW_UPDATE_SUCCESS,
    FOLLOW_UPDATE_FAIL,
    UNFOLLOW_UPDATE,
    UNFOLLOW_UPDATE_FAIL,
    UNFOLLOW_UPDATE_SUCCESS
} from '../config/type';
import {
    FOLLOW_UPDATE_ERROR,
    UNFOLLOW_UPDATE_ERROR,
} from '../config/var_name';

const INITIAL_STATE = {
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case FOLLOW_UPDATE:
            return {...state, loading: true, error: ''};
        case FOLLOW_UPDATE_SUCCESS:
            console.log(action.payload);
            return {...state, loading: false, error: ''};
        case FOLLOW_UPDATE_FAIL:
            return {...state, loading:false, error: FOLLOW_UPDATE_ERROR};
        case UNFOLLOW_UPDATE:
            return {...state, loading: true, error: ''};
        case UNFOLLOW_UPDATE_SUCCESS:
            return {...state, ...INITIAL_STATE};
        case UNFOLLOW_UPDATE_FAIL:
            return {...state, loading:false, error: UNFOLLOW_UPDATE_ERROR};
        default :
            return state;
    }
};