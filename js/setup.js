/**
 * Florian Edelmaier 2016
 */
'use strict';

import React, { Component,
    View,
    Text,
    ActivityIndicatorIOS,
    StyleSheet } from 'react-native';
import authService from './common/AuthService';
import Login from './components/Login';

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false,
            isCheckingAuth: false };
    }

    componentDidMount() {
        this.setState({ isCheckingAuth: true });
        authService.getAuthInfo((err, authInfo) => {
            this.storeAuthInfo(err, authInfo);
        });
    }

    render() {
        if(this.state.isCheckingAuth) {
            return (<View style={styles.container}>
                <ActivityIndicatorIOS animating={true} size="large" />
            </View>);
        }
        if(this.state.isLoggedIn) {
            return (<View style={styles.container}><Text>Hallo</Text></View>);
        } else {
            return (<Login onLogin={() => this.onSuccessfullLogin()}/>);
        }
    }

    onSuccessfullLogin() {
        console.log("Logged In!");
        this.setState({ isLoggedIn: true });
        authService.getAuthInfo((err, authInfo) => {
            this.storeAuthInfo(err, authInfo);
        });
    }

    storeAuthInfo(err, authInfo) {
        console.log("ERROR:", err);
        console.log("INFO:", authInfo);
        if(!err) {
            if(authInfo && authInfo.hasOwnProperty('token')){
                this.setState(Object.assign({
                    user: authInfo.user,
                    token: authInfo.token
                }, { isLoggedIn: true, isCheckingAuth: false }));
            } else {
                this.setState({ isLoggedIn: false, isCheckingAuth: false });
            }
            console.log(this.state);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 10,
        alignItems: 'center'
    }
})

export default Root;
