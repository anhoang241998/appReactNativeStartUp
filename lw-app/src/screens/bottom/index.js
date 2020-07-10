'use strict';

import React from 'react';

import {
    Image,
    View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {
    Colors,
    Strings,
    RouteNames,
    Icons,
} from '../../constants';

import Home from '../home';
import Menu from '../menu/Menu';
import CheckPermission from '../setup/CheckPermission';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={RouteNames.Home}
                component={Home}
                options={{
                    title: "",
                }}
            />

            <Stack.Screen 
                name={RouteNames.CheckPermission}
                component={CheckPermission}
                options={{
                    title: "",
                }}
            />
            {/*<Stack.Screen 
                name={"LOGIN"}
                component={Login}
                options={{
                    title: "",
                }}
            />*/}
        </Stack.Navigator>
    );
}

const BottomBar = () => {
    return (
        <Tab.Navigator
            initialRouteName={RouteNames.HomeTab}
            tabBarOptions={styles.tabNavigatorOptions}
        >
            <Tab.Screen 
                name={RouteNames.HomeTab}
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => ( 
                        <AntDesign 
                            name="home" 
                            color={color} 
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={RouteNames.AutomationTab}
                component={Menu}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather 
                            name="sun" 
                            color={color} 
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = {
    tabNavigatorOptions: {
        activeTintColor: Colors.appColor,
        inactiveTintColor: Colors.gray,
        showLabel: false,
    }
}

export default BottomBar;