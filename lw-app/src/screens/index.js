'use strict';

import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';

// import FlashScreen from './flash';
import BottomBar from './bottom';

// import {
//     AuthenticationContext,
// } from '../contexts';

// const Stack = createStackNavigator();

const App = () => {

    // const [authState, { checkingLogin }] = React.useContext(AuthenticationContext);

    // React.useEffect(() => {
    //     checkingLogin();
    // }, []);
    
    // const renderScreens = () => {

    //     if (authState.isLogin === null) {
    //         return (
    //             <Stack.Screen name={RouterNames.flashScreen} component={FlashScreen}></Stack.Screen>
    //         )
    //     }
        
    //     if (authState.isLogin !== "") {
    //         return (
    //             <Stack.Screen 
    //                 name={RouterNames.mainStack} 
    //                 component={MainStackNavigator}
    //             />
    //         )
    //     }
        
    //     return (
    //         <Stack.Screen 
    //             name={RouterNames.authStack} 
    //             component={AuthStackNavigator}
    //         />
    //     )
    // }

    // return (
    //     <Stack.Navigator
    //         screenOptions={{
    //             headerShown: false,
    //         }}
    //     >   
    //     {
    //         renderScreens()
    //     }
    //     </Stack.Navigator>    
    // )

    return (
       <BottomBar/>
    )
}

export default App;