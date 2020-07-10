'use strict';

import React, {
	useState,
	useEffect,
	useRef,
} from 'react';

import {
	Image,
	View,
	TouchableOpacity,
	Dimensions,
	Animated,
} from 'react-native';

import {
	Colors,
} from '../../constants';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

const NaviButton = ({ size, onPress, containerStyle, image }) => {

	const scale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
        Dimensions.addEventListener("change", (e) => {
            if (e.window.width <= e.window.height) {
            	scaleToValue(1);
            } else {
            	scaleToValue(0.75);
            }
        });
    }, []);

    const scaleToValue = (value) => {

		let seq = []

		seq.push(
			Animated.timing(
				scale, {
					toValue: value,
					duration: 500,
					useNativeDriver: true,
				},
			)
		)

		Animated.sequence(seq).start();
	}

	const DefaultAvatar = () => (
		<EvilIcons
			name="image"
			size={imageSize}
			color={Colors.gray}
		/>
	)

	return (
		<Animated.View style={{ transform: [{ scale }] }}>
			<TouchableOpacity style={{...styles.userAvatar, ...containerStyle}} onPress={onPress}>
				{
					image ? React.createElement(image) : <DefaultAvatar/>
				}
			</TouchableOpacity>
		</Animated.View>
	)
}

const styles = {
	userAvatar: {

		//shadow
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
		//end shadow
	},
}

export {
	NaviButton,
}