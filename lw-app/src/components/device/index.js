'use strict';

import React from 'react';

import {
	View,
	TouchableOpacity,
	Image,
} from 'react-native'

import {
    Text,
} from '../../elements';

import {
	Colors,
	Icons,
    Sizes,
} from '../../constants';

const Device = ({ item, numColumns, index }) => {

    var value = 1;

    // await global.socketIo.on('STT', (response) => {
    //     console.log('STT data', response);
    // });

    const onControl = async () => {
        const CONTROL = {
            GUID: "26450d25-2e48-4a6e-9ec5-bed806bba99d",
            ID: "B1",
            VALUE: value
        }
        await global.socketIo.emit('CONTROL', CONTROL);
    }

    return (
    	item !== "" ?
    	<TouchableOpacity 
            style={{ ...styles.item,flex: numColumns}}
            onPress={onControl}
        >
    		<Image
    			style={styles.iconDevice}
    			source={index % 2 !== 0 ? Icons.ic_bulb_on : Icons.ic_bulb_off}
    		/>
            <View
                style={{
                    position: 'absolute',
                    left: 8,
                    right: 8,
                    bottom: 8}
                }
            >
                <Text style={{fontWeight: 'bold', fontSize: Sizes.medium, flex: 1}} ellipsizeMode="tail" numberOfLines={2}>
                    {item}
                </Text>
                <Text style={{color: Colors.gray, fontWeight: 'bold'}}>On</Text>
            </View>
            <View
                style={{...styles.status, backgroundColor: index % 2 !== 0 ? Colors.green : Colors.lightGray}}
            >
            </View>
        </TouchableOpacity>
        :
        <View
        	style={{ ...styles.item, flex: numColumns, backgroundColor: 'white'}}
        />
    )
}

const ITEM_SIZE = 120;
const ICON_SIZE = 35;
const STATUS_SIZE = 12;

const styles = {
    status: {
        position: 'absolute',
        right: 8,
        top: 8,
        height: STATUS_SIZE,
        width: STATUS_SIZE,
        borderRadius: STATUS_SIZE/2, 
    },
    iconDevice: {
        width: ICON_SIZE, 
        height: ICON_SIZE,
        margin: 8,
        // backgroundColor: 'red',
    },
	item: {
        backgroundColor: Colors.whiteSmoke,
        height: ITEM_SIZE,
        width: ITEM_SIZE,
        margin: 8,
        borderRadius: 15,
    },
    itemShadow: {
    	//shadow
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.15,
		shadowRadius: 2,

		elevation: 1,
		//end shadow
    }
}

export {
	Device,
}