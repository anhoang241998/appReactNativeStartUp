'use strict';

import React from 'react';

import Circle from 'react-native-progress/Circle';

import {
  View,
  Dimensions,
} from 'react-native';

import {
    Colors,
} from '../constants';

const {
    width,
    height,
} = Dimensions.get('screen');

const ProcessBar = () => {
	return (
		<View style={styles.container}>
			<View style={styles.viewProgress}>
	        	<Circle 
                    size={50} 
                    indeterminate={true} 
                    indeterminateAnimationDuration={1500}
                    color={Colors.appColor} 
                    borderWidth={3} 
                    // strokeCap="round"
                />
	        </View>
		</View>
	)
}

const SIZE = 80;

const styles = {
	container: {
		flex: 1,
		position: 'absolute',
        bottom: 0,
	},
	viewProgress: {
        left: (width - SIZE) / 2,
  		bottom: (height - SIZE) / 2,
        width: SIZE,
        height: SIZE,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderColor: '#f5f5f5',
        borderWidth: 0.5,
	},
}

export default ProcessBar;