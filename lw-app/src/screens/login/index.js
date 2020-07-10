'use strict';

import React from 'react';

import Login from './LoginScreen';
import Forgot from './ForgotPassword';

import {
    RouteNames,
} from '../../constants';

const LoginScreens = () => {

    let screens = {};

    screens[RouteNames.Login] = { 
        screen: (props) => <Login {...props}/>,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    null
                ),
                gesturesEnabled: false,
            };
        },
    }

    screens[RouteNames.Forgot] = { 
        screen: (props) => <Forgot {...props}/>,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    null
                ),
                gesturesEnabled: false,
            };
        },
    }

    return screens;
}

export default LoginScreens;