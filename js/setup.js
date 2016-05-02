/**
 * Florian Edelmaier 2016
 */
'use strict';

import React, { Component,
    View } from 'react-native';
import Login from './components/Login';

class Root extends Component {
    render() {
        return (
            <View>
                <Login />
            </View>
        );
    }
}

export default Root;
