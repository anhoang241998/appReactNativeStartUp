'use strict';

import React from 'react';

import { 
    createStackNavigator,
} from 'react-navigation-stack';

import {
    getOptions,
} from '../../components';

import {
    RouteNames,
    Strings,
} from '../../constants';

import Menu from './Menu';

let stacks = {};

stacks['Menu'] = { 
    screen: (props) => <Menu {...props}/>,
    navigationOptions: ({ navigation }) => {

        return {
            header: null,
            headerBackTitle: ' ',
            headerTruncatedBackTitle: ` `,
        }

        // const params = {
        //     title: "Menu",
        //     navigation, //IMPORTANT
        // }

        // return getOptions(params);
    },
}

const MenuStackNavigator = createStackNavigator(stacks, {
	initialRouteName: 'Menu',
});

export default MenuStackNavigator;