'use strict';

import React from 'react';

import {
	Text,
} from 'react-native';

import {
	Sizes,
	Strings,
} from '../constants';

const TextElement = (props) => {
	return (
		<Text
			{...props}
			style={{...styles.text, ...props.style}}
		>
			{props.children}
		</Text>
	)
}

const styles = {
	text: {
		fontSize: Sizes.medium,
		fontFamily: Strings.fontName,
	}
}

export default TextElement;