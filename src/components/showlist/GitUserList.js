import React, {Component} from 'react';
import {ListView, View} from 'react-native';
import { SearchBar } from 'react-native-search-bar';
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import GitUserDetail from './GitUserDetail';
import { gitUserFetch, gitFollowFetch } from '../actions';
import {
    GITHUB_USERS
} from '../../config/var_name';
import { Actions } from 'react-native-router-flux';
class GitUserList extends Component{
    //state = {gits: []};
    componentWillMount(){
        this.props.gitFollowFetch();
        this.props.gitUserFetch();
        

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){

        this.createDataSource(nextProps);
    }

    createDataSource({ gits}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(gits);
    }

    renderRow(git){
    return (
    <GitUserDetail git={git}/>
        );
    }

    render(){
        console.log(this.state);
        return(
            <View>
            <ListView
                 enableEmptySections
                 dataSource={this.dataSource}
                 renderRow={this.renderRow}
            />
            </View>
        );  
    }
}
const mapStateToProps = state => {
    const gits = _.map(state.gits, (val, uid) => {
        return { ...val, uid };
    });
    return { gits};
};

export default connect(mapStateToProps,{ gitUserFetch, gitFollowFetch })(GitUserList);