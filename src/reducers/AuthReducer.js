import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL
 } from '../config/type';

const INITIAL_STATE = {
    email:'',
    password:'',
    user: null,
    error: '',
    loadingLogin: false,
    loadingCreate: false
};

export default (state = INITIAL_STATE, action) =>{
    console.log(action);

    switch (action.type){
        case EMAIL_CHANGED:
        return {...state, email: action.payload};
        case PASSWORD_CHANGED:
        return {...state, password: action.payload};
        case LOGIN_USER:
        return {...state, loadingLogin: true, error: ''};
        case LOGIN_USER_SUCCESS:
        return {...state, ...INITIAL_STATE, user: action.payload};
        case LOGIN_USER_FAIL:
        return {...state, error: 'Authentication Failed', password: '',loadingLogin: false};
        case CREATE_USER:
        return {...state, loadingCreate: true, error: ''};
        case CREATE_USER_SUCCESS:
        return {...state, ...INITIAL_STATE, error: ''};
        case CREATE_USER_FAIL:
        return {...state, error: 'Account Creating Failed', password: '',loadingCreate: false};
        default:
            return state;
    }
};