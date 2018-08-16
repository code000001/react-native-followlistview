import {
    GIT_FOLLOW_FETCH_SUCCESS
} from '../config/type';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case GIT_FOLLOW_FETCH_SUCCESS:
            console.log(action);
            return action.payload;
        default :
            return state;
    }
};