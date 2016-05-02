'use strict';

import React, { Component,
    Text,
    TextInput,
    Image,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    StyleSheet } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false
        }
    }

    render() {
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
                <ActivityIndicatorIOS style={styles.loader}
                    animating={this.state.showProgress}
                    size="large" />
            </View>
        );
    }

    onLoginPressed() {
        console.log(`Login is pressed with username: ${this.state.email}`);
        this.setState({showProgress: true});
        fetch("http://localhost:3000/api/authenticate", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail: this.state.email,
                                   password: this.state.pwd })
        })
        .then(res => res.json())
        .then(resp => console.log(resp))
        .then(() => {
            this.setState({ showProgress: false });
        });
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
    }
});

export default Login;
