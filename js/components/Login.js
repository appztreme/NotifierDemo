'use strict';

import React, { Component,
    Text,
    TextInput,
    Image,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    StyleSheet } from 'react-native';
import * as actions from './../actions';
import store from './../store';
// import { LOGIN } form './../constants';
import authService from './../common/AuthService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            success: undefined,
            message: '',
            token: ''
        }
    }

    render() {
        let errorCtrl = <View />
        if(!this.state.success) {
            errorCtrl = <Text style={styles.error}>{ this.state.message }</Text>;
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('image!skier')} />
                <Text style={styles.heading}>WS Browser</Text>
                <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder="email"
                    autoCapitalize="none" />
                <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({ pwd: text })}
                    placeholder="password"
                    secureTextEntry={true} />
                <TouchableHighlight style={styles.button}
                    onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                { errorCtrl }
                <ActivityIndicatorIOS style={styles.loader}
                    animating={this.state.showProgress}
                    size="large" />
            </View>
        );
    }

    onLoginPressed() {
        //this.setState({showProgress: true});
        store.dispatch(actions.loginRequest('user@gmail.com', 'user'));
        // authService.login(this.state.email, this.state.pwd, result => {
        //     this.setState(Object.assign({ showProgress: false }, result));
        //     if(this.state.success) { this.props.onLogin(); }
        // });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 10,
        alignItems: 'center'
    },
    logo: {
        width: 140,
        height: 150
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 13,
        borderWidth: 1,
        borderColor: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    loader: {
        marginTop: 10
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

export default Login;
