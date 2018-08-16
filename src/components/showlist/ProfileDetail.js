import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Card, CardSection, Button, Spinner} from '../common';
import axios from 'axios';
import _ from 'lodash';
import {connect} from 'react-redux';
import {
    CENTER,
    COLUMN,
    SPACE_AROUND,
    SIZE_LARGE,
    USER_LIST
} from '../../config/var_name';
import {gitUserFollow, gitUserUnfollow} from '../actions';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {
    prof_detail: '',
    buttonRender : '  Follow  ',
    buttonColor : '#5ef318',
    buttonPress : 'onButtonFollowPress',
    followState : false,
    loading : false
};

const UNFOLLOW_STATE = {
    buttonRender : '  Follow  ',
    buttonColor : '#5ef318',
    buttonPress : 'onButtonFollowPress',
    followState : false,
    loading : false
};

const FOLLOW_STATE = {
    buttonRender: 'Unfollow',
    buttonColor: '#878b83',
    buttonPress: 'onButtonUnfollowPress',
    followState: true
}

class ProfileDetail extends Component{
    state = INITIAL_STATE;
    componentWillMount(){
        console.log(this.props.folls);
        _.map(this.props.folls, val =>{
            if(this.props.git.node_id.toString() === val.node_id.toString()){
                this.setState(FOLLOW_STATE);
            }
        });
        axios.get(this.props.git.url).then(response => {
            //console.log(response.data);
            // const prof_detail = response.data; 
        this.setState({prof_detail : response.data});
        });
        
    }

    buttonRender(){
       // console.log(this.state.prof_detail.id);
        if(this.props.loading){
            return <Spinner size={SIZE_LARGE}/>;
        }
            return (
                <Button 
                textStyle={{fontSize:20, 
                paddingLeft:5, 
                paddingRight:5,
                color: this.state.buttonColor}} 
                buttonStyle={{alignSelf: 'center',
                    alignItems: 'flex-end', 
                    borderColor: this.state.buttonColor}}
                onPress={this.onButtonPress}
                >
                {this.state.buttonRender}
                </Button>
                );
    }

    onButtonPress = ()=>{
        if(this.state.followState){
            //console.log(this.state.uid_now);
        this.props.gitUserUnfollow({ login: this.props.git.login});
        this.setState(UNFOLLOW_STATE);
        }
        else{
            this.props.gitUserFollow({ node_id: this.props.git.node_id, login: this.props.git.login});
            this.setState(FOLLOW_STATE);
        }
    }

    render(){
        const {
            avatar_url, 
            name, login, 
            followers, following, 
            html_url,
            bio,
            location} = this.state.prof_detail;
        const {thumbnailContainerStyle, 
            thumbnailStyle, 
            headerContentStyle,
            headerTextStyle,
            contentTextStyle } = styles;
        return (
            <Card style={{marginTop:5}}>
                <CardSection>
                    <View style={{flex:1, alignItems: 'center'}}>
                    <View style={thumbnailContainerStyle}>
                        <Image 
                        style = {thumbnailStyle}
                        source={{uri : avatar_url}} 
                        />
                    </View>
                    <Text style={headerTextStyle}>
                        {name}
                    </Text>
                    <Text style={contentTextStyle}>
                        @{login}
                    </Text>
                    </View>
                </CardSection>
                <CardSection>
                    {/* <CardSection style={{flexDirection: COLUMN}}>
                    <View style={{flex:1}}>
                    <Text style={{height:150, alignItems:'flex-start'}}>
                    {followers}{"\n"}Follower
                    </Text>
                    </View>
                    </CardSection>
                    <CardSection style={{flexDirection: COLUMN}}>
                    <View style={{flex:1}}>
                    <Text style={{height:150}}>
                    {following}{"\n"}Following
                    </Text>
                    </View>
                    </CardSection>
                    <CardSection style={{flexDirection: COLUMN}}>
                    <View style={{flex:1}}>
                    <View style={{height:150, alignItems:'flex-end'}}>
                        {this.buttonRender()}
                    </View>
                    </View>
                    </CardSection> */}
                <View style={{flexDirection: COLUMN,
                     justifyContent: SPACE_AROUND, 
                     marginLeft: 5, 
                     flex:2}}>
                    <Text style = {{fontSize: 18, height:50, textAlign: CENTER}}>
                    {followers}{"\n"}Follower
                    </Text>
                </View>
                <View style={{flex: 2,
                     flexDirection: COLUMN, 
                     justifyContent: SPACE_AROUND,
                     marginLeft:15,
                     marginRight:15}}>
                        <Text style={{fontSize: 18, height:50, textAlign: CENTER}}>
                        {following}{"\n"}Following
                        </Text>
                </View>
                <View style={{marginRight: 5, flex:3}}>
                {this.buttonRender()}
                </View>
                </CardSection>
                <CardSection style={{flexDirection: COLUMN}}>
                    <View style={{
                        marginBottom:3,
                        marginLeft: 15
                    }}>
                        <Text style={{fontSize: 18, height:25}}>Bio: {bio}</Text>
                    </View>
                    <View style={{
                        marginBottom:3,
                        marginLeft: 15
                    }}>
                        <Text style={{fontSize: 18, height:25}}>Location: {location}</Text>
                    </View>
                    <View style={{
                        marginBottom:3,
                        marginLeft: 15
                    }}>
                        <Text style={{fontSize: 18, height:25}}>Url: {html_url}</Text>
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles ={
    headerContentStyle:{
        flexDirection: COLUMN,
        justifyContent: SPACE_AROUND,
        flex: 2
    },
    headerTextStyle:{
        fontSize: 20
    },
    contentTextStyle:{
        fontSize: 16
    },
    thumbnailStyle:{
        height:150,
        width:150,
        borderRadius: 150/2
    },
    thumbnailContainerStyle:{
        justifyContent: CENTER,
        alignItems: CENTER,
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle:{
        height: 500,
        flex: 1,
        width: null
    }
};

const mapStateToProps = state =>{
    const folls = _.map(state.folls, val=>{
        return {...val};
    });
    return {    folls,
                loading: state.gitFoll.loading, 
                error: state.gitFoll.error };
};

export default connect(mapStateToProps, {gitUserFollow, gitUserUnfollow})(ProfileDetail);