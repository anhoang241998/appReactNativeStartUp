'use strict';

import React, { useContext, useEffect } from 'react';

import {
  View,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';

import {
    Button
} from 'react-native-elements';

// import {
//     StackActions,
//     NavigationActions,
// } from 'react-navigation';

import {
    Title,
    Cache,
} from '../../components';

import {
    Icons,
    Sizes,
    Colors,
    Strings,
    RouteNames,
} from '../../constants';

const Menu = (props) => {

    // const logoutAction = StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: RouteNames.Login })],
    // });

    const onPressLogOut = async () => {
        await Cache.clearAll();
        // props.navigation.navigate("LOGIN");
    }

    const onLogOut = async () => {

        const [err, email] = await Cache.getEmail();

        Alert.alert(
            Strings.message,
            `${Strings.logoutAccount} "${email}"?`,
            [
                {
                    text: Strings.cancel,
                    style: 'cancel',
                },
                {
                    text: Strings.logOut,
                    style: 'destructive',
                    onPress: () => onPressLogOut(),
                },
            ], 
            {
                cancelable: false
            },
        )
    }

	return (
		<SafeAreaView style={styles.container}>
            <Title title={Strings.setting}/>
            <Button
                onPress={onLogOut}
                title={Strings.logOut}
                type="clear"
                titleStyle={styles.titleLogOut}
                // containerStyle={styles.btnLogOut}
            />
        </SafeAreaView>
	)
}

const styles = {
	container: {
		flex: 1,
        alignItems: "center",
	},
    titleLogOut: {
        color: 'red'
    },
    btnLogOut: {
        position: 'absolute',
        bottom: 16,
    }
}

export default Menu;