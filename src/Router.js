import {Scene, Router, Actions} from 'react-native-router-flux';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
//import LoginForm from './components/LoginForm';
import GitUserList from './components/showlist/GitUserList';
import FirstDicisionPage from './components/FirstDicisionPage';
import {
    FIRST_PAGE_SCENE,
    FOLLOWING_LIST_SCENE,
    VIEW_PROFILE_SCENE,
    ROOT_SCENE,
    SELECTION_SCENE,
    AUTH_SCENE,
    USER_LIST,
    MAIN,
    PROFILE_SCENE

} from './config/var_name'
import ProfileDetail from './components/showlist/ProfileDetail';

const RouterComponent = () =>{
    return(
        <Router>
            <Scene key={ROOT_SCENE} hideNavBar>
                <Scene key={AUTH_SCENE} navigationBarStyle={{ backgroundColor: '#40E0D0' }} 
                    titleStyle={{ textAlign: 'center', flex: 1 }}>
                    <Scene key={SELECTION_SCENE} component={FirstDicisionPage} title={FIRST_PAGE_SCENE}/>
                </Scene>
                <Scene key={MAIN} navigationBarStyle={{ backgroundColor: '#40E0D0' }} 
                leftButtonIconStyle={{tintColor: "#FFF"}}>
                    <Scene key={USER_LIST} component={GitUserList} title={FOLLOWING_LIST_SCENE} />
                    <Scene key={PROFILE_SCENE} component={ProfileDetail} title={VIEW_PROFILE_SCENE} />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;