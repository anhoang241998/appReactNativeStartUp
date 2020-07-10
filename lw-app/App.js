'use strict';

import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Source from './src'

const App = () => {
	return ( 
		<NavigationContainer>
	        <Source/>
        </NavigationContainer>
    )
}

export default App;