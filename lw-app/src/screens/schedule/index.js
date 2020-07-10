'use strict';

import React, { Component } from 'react';

import { 
    createAppContainer
} from 'react-navigation-stack';

import { createStackNavigator } from 'react-navigation-stack';

import { 
    SCHEDULE,
    DETAIL_SCHEDULE
} from '../../namespaces';

import {
    Strings,
    Icons,
} from '../../constants';

import {
    NaviBar,
} from '../../components';

import Schedule from './Schedule'
// import Detail from './Detail'

class App extends React.Component {

    render() {
        const StackNavigator = createStackNavigator({
            Schedule: { 
                screen: (props) => <Schedule {...props} nameSpace={SCHEDULE}/>,
                navigationOptions: ({ navigation }) => {

                    const navigationParams = {
                        title: Strings.schedule,
                        subTitle: this.props.name,
                        nameSpace: SCHEDULE,
                        isShowBackButton: true,
                        // rightImage: Icons.ic_add,
                    }

                    return NaviBar.getOptions(navigationParams);
                },
            },
            // Detail: { 
            //     screen: (props) => <Detail {...props} nameSpace={DETAIL_SCHEDULE}/>,
            //     navigationOptions: ({ navigation }) => {

            //         const navigationParams = {
            //             title: Strings.schedule,
            //             nameSpace: DETAIL_SCHEDULE,
            //         }

            //         return NaviBar.getOptions(navigationParams);
            //     },
            // },
        }, {
            initialRouteName: "Schedule"
        });

        const Container = createAppContainer(StackNavigator)

        const screenProps = {
            guid: this.props.guid,
            serial: this.props.serial,
            idSwitch: this.props.idSwitch,
        }

        return (
            <Container screenProps={screenProps}/>
        );
    }
}

export default App;