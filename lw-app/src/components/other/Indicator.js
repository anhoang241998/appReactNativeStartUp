'use strict';

import React, { Component } from 'react';

import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';

export default class ProcessBar extends Component {
	render() {

	    const size = Platform.OS === 'android' ? 'large' : 'small';
	    const color = Platform.OS === 'android' ? Colors.appColor : 'gray';

	    return (
	    	<View style={styles.container}>
	        	<ActivityIndicator size={size} color={color} />
	        </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});