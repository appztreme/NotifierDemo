import React, { View } from 'react-native';
import { connect } from 'react-redux';
import LoginContainer from './LoginContainer';
import Main from './Main';

function showApp(isAuthenticated) {
    if (isAuthenticated) return <Main />;
    return <LoginContainer />;
}

const App = ({isAuthenticated}) => (
    <View>
        {showApp(isAuthenticated)}
    </View>
);

const mapStateToProps = (store) => {
    return {
        isAuthenticated: store.authentication.isAuthenticated,
    };
}

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
