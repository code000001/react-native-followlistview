import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import {
    GIT_USER_FETCH_SUCCESS,
    FOLLOW_UPDATE,
    FOLLOW_UPDATE_SUCCESS,
    FOLLOW_UPDATE_FAIL,
    UNFOLLOW_UPDATE,
    UNFOLLOW_UPDATE_FAIL,
    UNFOLLOW_UPDATE_SUCCESS,
    GIT_FOLLOW_PUSH_SUCCESS,
    GIT_UNFOLLOW_PUSH_SUCCESS,
    GIT_FOLLOW_FETCH_SUCCESS
} from '../../config/type';
import {
    USERS_PATH,
    GITHUB_PATH,
    FOLLOWS_PATH
} from '../../config/var_name';

// export const followUpdate = ({ prop, value}) =>{
//     return {
//         type: FOLLOW_UPDATE,
//         payload: {prop, value}
//     };
// };

// export const unfollowUpdate = ({ prop, value}) =>{
//     return {
//         type: UNFOLLOW_UPDATE,
//         payload: {prop, value}
//     };
// };

export const gitUserFetch = () =>{
    //const {currentUser} = firebase.auth();

    return (dispatch) =>{
        firebase.database().ref(`/${GITHUB_PATH}/`)
        .on('value', snapshot =>{
            dispatch({type: GIT_USER_FETCH_SUCCESS, payload: snapshot.val()});
        });
    };
};

export const gitFollowFetch = () =>{
    const {currentUser} = firebase.auth();

    return (dispatch) =>{
        firebase.database().ref(`/${USERS_PATH}/${currentUser.uid}/${FOLLOWS_PATH}/`)
        .on('value', snapshot =>{
            dispatch({type: GIT_FOLLOW_FETCH_SUCCESS, payload: snapshot.val()});
        });
    };
};

export const gitUserFollow = ({node_id, login})=>{
    const {currentUser} = firebase.auth();

    return (dispatch) =>{
        dispatch({type: FOLLOW_UPDATE });
    firebase.database().ref(`/${USERS_PATH}/${currentUser.uid}/${FOLLOWS_PATH}/`)
    .child(login)
    .set({node_id: node_id})
    .then(()=> {
        followUpdateSuccess(dispatch)
        }).catch(()=> followUpdateFail(dispatch));
    };
};

export const gitUserUnfollow = ({ login }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({type: UNFOLLOW_UPDATE});
        firebase.database().ref(`/${USERS_PATH}/${currentUser.uid}/${FOLLOWS_PATH}/`)
            .child(login)
            .set({node_id: '0'})
            .then(()=> {
                unfollowUpdateSuccess(dispatch)
            }).catch(()=> unfollowUpdateFail(dispatch));
    };
};


const followUpdateSuccess = (dispatch) =>{
    dispatch ({ type: FOLLOW_UPDATE_SUCCESS });
        //Actions.main();
};

const followUpdateFail = (dispatch) =>{
    dispatch ({type: FOLLOW_UPDATE_FAIL});
};

const unfollowUpdateSuccess = (dispatch) =>{
    dispatch ({type: UNFOLLOW_UPDATE_SUCCESS});
    //Actions.main();
};

const unfollowUpdateFail = (dispatch) =>{
    dispatch ({type: UNFOLLOW_UPDATE_FAIL});
};