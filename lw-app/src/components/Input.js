'use strice';

/*
	React native TextInput be customized 
	Created by Longnp
	Version 1.0.0
*/

import React, { useState } from 'react';
import {
	TextInput,
	Image,
	View,
	TouchableOpacity,
} from 'react-native';

import {
    Icons,
} from '../constants';

const Input = (props) => {

	const onPressClear = () => {
		props.onChangeText("");
	}

	const ClearButton = () => { return (
		<TouchableOpacity onPress={onPressClear} style={{height: '100%', flexDirection: 'row', alignItems: "center", paddingLeft: 5}}>
		    <Image
		    	style={{...styles.imgClear, ...{tintColor: props.clearButtonColor ? props.clearButtonColor : 'lightgray'}}}
				source={Icons.ic_clear}
		    />
	    </TouchableOpacity>
	)}

	return (
		<View style={props.containerStyle ? {...props.containerStyle, ...{flexDirection: 'row', alignItems: "center", padding: 8}} : styles.containerStyle}>
		    {props.rightIcon ? props.rightIcon : null}
		    <TextInput 
		    	{...props}
		    	style={props.inputStyle ? {...props.inputStyle, ...{flex: 1, height: '100%'}} : styles.inputStyle}
		    />
		    {props.value != "" && props.value ? <ClearButton/> : null}
	    </View>
	)
}

const styles = {
    imgClear: {
    	height: 17,
        width: 17,
    },
    containerStyle: {
		flexDirection: 'row',
		alignItems: "center" ,
		backgroundColor: 'white',
		padding: 8,
        margin: 10,
        height: 43,
        width: '80%',
	},
	inputStyle: {
		flex: 1,
		fontSize: 15,
	},
}

export default Input;