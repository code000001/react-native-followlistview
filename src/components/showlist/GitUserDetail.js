import React, {Component} from 'react';
import {Text, View, Image, Linking, TouchableWithoutFeedback} from 'react-native';
import {Card, CardSection, Button, Spinner} from '../common';
import _ from 'lodash';
import {
    CENTER,
    COLUMN,
    SPACE_AROUND,
    SIZE_LARGE
} from '../../config/var_name';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {gitUserFollow, gitUserUnfollow} from '../actions';

const INITIAL_STATE = {
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
};

const UNFOLLOW_STATE = {
    buttonRender : '  Follow  ',
    buttonColor : '#5ef318',
    buttonPress : 'onButtonFollowPress',
    followState : false
};

class GitUserDetail extends Component{
    state = INITIAL_STATE;
    componentWillMount(){
        //console.log(this.props.folls);
        //this.setState({now_node_id : this.props.git.node_id});
        this.updateDataState(this.props);
    }

    componentWillReceiveProps(nextProps){

        this.updateDataState(nextProps);
    }

    updateDataState({folls, git}){
                this.setState(INITIAL_STATE);
                for(let i=0; i< git.node_id.length ; i++){
                _.each(folls, (val)=> {
                    //console.log(val.node_id.toString());
                    if(git.node_id.toString() === val.node_id.toString()){ 
                        this.setState(FOLLOW_STATE);
                        }
                    });
                }         
    }

    renderButton =()=>{
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

    onImagePress =()=>{
        console.log(this.props.git);
        Actions.profile(this.props);
    }

    onButtonPress = ()=>{
        if(this.state.followState){
            //console.log(this.state.uid_now);
        this.props.gitUserUnfollow({ login: this.props.git.login});
        this.setState(INITIAL_STATE);
        }
        else{
            this.props.gitUserFollow({ node_id: this.props.git.node_id, login: this.props.git.login});
            this.setState(FOLLOW_STATE);
        }
    }

    render(){
        const { login, avatar_url, url } = this.props.git;
        const {thumbnailContainerStyle, 
            thumbnailStyle, 
            headerContentStyle,
            headerTextStyle } = styles;
        return (
        <Card style={{marginTop:1}}>
            <CardSection>
                <TouchableWithoutFeedback onPress={this.onImagePress}>
                <View style={{flex:1, alignItems: 'flex-start'}}>
                    <View style={thumbnailContainerStyle}>
                        <Image 
                        style = {thumbnailStyle}
                        source={{uri : avatar_url}} 
                        />
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{login}</Text>
                </View>
                <View style={{alignItems: 'flex-end', flex:2}}>
                {this.renderButton()}
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
    thumbnailStyle:{
        height:55,
        width:55,
        borderRadius: 150/2
    },
    thumbnailContainerStyle:{
        justifyContent: CENTER,
        alignItems: CENTER,
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle:{
        height: 300,
        flex: 1,
        width: null
    }
};

const mapStateToProps = state => {
    const folls = _.map(state.folls, (val)=>{
        return { ...val};
    });

    return { folls , error : state.gitFoll.error,
            loading : state.gitFoll.loading
    };
};


export default connect(mapStateToProps, {gitUserFollow, gitUserUnfollow})(GitUserDetail);