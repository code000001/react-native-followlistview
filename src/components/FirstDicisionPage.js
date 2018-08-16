import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import {emailChanged, passwordChanged, loginUser, createUser} from '../components/actions';
import {
    SIZE_LARGE,
    EMAIL_LABEL,
    EMAIL_PLACEHOLDER,
    PASSWORD_LABEL,
    PASSWORD_PLACEHOLDER,
    COLOR_WHITE,
    COLOR_RED,
    CENTER
    
} from '../config/var_name'

class FirstDecisionPage extends Component{

    onEmailChange(text){
        this.props.emailChanged(text);
    }
    onPasswordChange(text){
        this.props.passwordChanged(text);
    }
    onButtonLoginPress(){
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }
    onButtonCreateAccountPress(){
        const {email, password} = this.props;
        this.props.createUser({email, password});
    }
    renderError(){
        if(this.props.error){
            return (
                <View style={{backgroundColor: COLOR_WHITE}}>
                    <Text style={styles.errorTextStyle}>
                    {this.props.error}
                    </Text>
                </View>
            );
        }
    }
    renderButtonCreateAccout(){
        if(this.props.loadingCreate){
            return <Spinner size={SIZE_LARGE}/>;
        }
            return (
            <Button
                onPress = {this.onButtonCreateAccountPress.bind(this)}
            >
            Create Account
            </Button>
                );
    }
    renderButtonLogin(){
        if(this.props.loadingLogin){
            return <Spinner size={SIZE_LARGE}/>;
        }
            return (
            <Button
                onPress = {this.onButtonLoginPress.bind(this)}
            >
            Login
            </Button>
                );
    }


    render(){
        return (
            <Card>
                <CardSection>
                    <Input
                    secureTextEntry={false}
                    label={EMAIL_LABEL}
                    placeholder={EMAIL_PLACEHOLDER}
                    onChangeText={this.onEmailChange.bind(this)} 
                    value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                    secureTextEntry={true}
                    label={PASSWORD_LABEL}
                    placeholder={PASSWORD_PLACEHOLDER}
                    onChangeText={this.onPasswordChange.bind(this)} 
                    value={this.props.password}
                    />
                </CardSection>
                    { this.renderError()}
                <CardSection >
                    { this.renderButtonLogin()}
                </CardSection>
                <CardSection >
                    { this.renderButtonCreateAccout()}
                </CardSection>
            </Card>
        );
    }
}

const styles ={
    errorTextStyle:{
        fontSize: 20,
        alignSelf: CENTER,
        color: COLOR_RED
    }
}

const mapStateToProps = state =>{
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loadingLogin: state.auth.loadingLogin,
        loadingCreate: state.auth.loadingCreate
    };
};

export default connect(mapStateToProps,
    {
        emailChanged, 
        passwordChanged, 
        loginUser,
        createUser})(FirstDecisionPage);
