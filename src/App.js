import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import firebase from '@firebase/app';
import {Header} from './components/common';
import {
    FIRST_PAGE
} from './config/var_name'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated','Setting a timer'])

class App extends Component {
    componentWillMount(){
        const config = {
            apiKey: 'AIzaSyBM2RXy-UC4lx22VD6lkTzdDBbYvVNWH68',
            authDomain: 'devtest-26ee3.firebaseapp.com',
            databaseURL: 'https://devtest-26ee3.firebaseio.com',
            projectId: 'devtest-26ee3',
            storageBucket: 'devtest-26ee3.appspot.com',
            messagingSenderId: '21950336671'        
            };
            
            firebase.initializeApp(config);
            
        }

    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

export default App;