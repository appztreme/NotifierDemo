import React from 'react-native';
import { connect } from 'react-redux';
import * as actions from './../actions';
import Login from './Login';

const mapStateToProps = (state) => {
    return {
        token: state.authentication.token,
        user: state.authentication.user,
        isAuthenticated: state.authentication.isAuthenticated,
        isAuthenticating: state.authentication.isAuthenticating,
        statusText: state.authentication.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: (email, pwd) => {
            dispatch(actions.loginRequest(email, pwd));
        },
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
