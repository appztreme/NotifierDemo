import React, { Component,
    Text,
    TextInput,
    Image,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    StyleSheet } from 'react-native';
import store from './../store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
    },
    logo: {
        width: 140,
        height: 150,
    },
    heading: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#48BBEC',
    },
    input: {
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        fontSize: 13,
        borderWidth: 1,
        borderColor: '#48BBEC',
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderRadius: 15,
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
    },
    loader: {
        marginTop: 10,
    },
    error: {
        color: 'red',
        paddingTop: 10,
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
        };
    }

    onLoginPressed() {
        this.props.onLoginClick(this.state.email, this.state.pwd);
    }

    render() {
        console.log('STATE from Login:', store.getState());

        let errorCtrl = <View />;
        if (!this.props.isAuthenticated && this.props.statusText) {
            errorCtrl = <Text style={styles.error}>{this.props.statusText}</Text>;
        }

        return (
            <View style={styles.container}>
                <Image source={require('image!skier')}
                    style={styles.logo}
                />
                <Text style={styles.heading}>WS Browser</Text>
                <TextInput autoCapitalize="none"
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder="email"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ pwd: text })}
                    placeholder="password"
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicatorIOS
                    animating={this.props.isAuthenticating}
                    size="large"
                    style={styles.loader}
                />
            </View>
        );
    }
}

Login.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    isAuthenticating: React.PropTypes.bool.isRequired,
    onLoginClick: React.PropTypes.func.isRequired,
    statusText: React.PropTypes.string,
};

export default Login;
