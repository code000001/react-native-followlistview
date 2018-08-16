import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL
 } from '../../config/type';
import firebase from '@firebase/app';
import '@firebase/auth';
import {Actions} from 'react-native-router-flux';

export const emailChanged = (text) =>{
    return {
      type: EMAIL_CHANGED,
      payload: text  
    };
};

export const passwordChanged = (text) =>{
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({email, password})=>{
    return (dispatch) =>{
    dispatch({type: LOGIN_USER});

    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(()=> loginUserFail(dispatch));

    };
};

export const createUser = ({email, password})=>{
    return (dispatch) =>{
        dispatch({type: CREATE_USER});
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user=> createUserSuccess(dispatch, user))
        .catch(()=> createUserFail(dispatch));
    }
};

const loginUserSuccess = (dispatch, user) =>{
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
};

const loginUserFail = (dispatch) =>{
    dispatch ({type: LOGIN_USER_FAIL});
};

const createUserSuccess = (dispatch) =>{
    dispatch ({type: CREATE_USER_SUCCESS});
};

const createUserFail = (dispatch) =>{
    dispatch ({type: CREATE_USER_FAIL});
};