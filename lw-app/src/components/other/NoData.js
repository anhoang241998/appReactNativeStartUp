'use strict';

import React from 'react';

import {
    View,
    Image,
    Text,
    Dimensions,
} from 'react-native';

import {
    Strings,
    Icons,
    Colors,
    Sizes,
} from '../../constants';

import {
    Button,
} from 'react-native-elements';

const {
    width,
    height,
} = Dimensions.get('window');

const NoDataComponent = ({ message, marginTop, buttonTitle, buttonOnPress }) => {

    let styleContainer = {...styles.container}

    if (marginTop) {
        styleContainer.top = marginTop;
    }

    return (
        <View style={styleContainer}>
            <Image
                style={styles.viewListIcon}
                source={Icons.ic_nodata}
            />
            <Text style={styles.viewListText}>
                {message}
            </Text>
            { buttonTitle ? 
                <Button
                    title={buttonTitle}
                    titleStyle={styles.btnStyle}
                    type="clear"
                    onPress={buttonOnPress}
                /> : null
            }
        </View>
    )
}

const SIZE = 100;

const styles = {
    container: {
        position: 'absolute',
        top: (height - SIZE) / 2,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    viewListIcon: {
        width: SIZE,
        height: SIZE,
    },
    viewListText: {
        color: 'gray',
        fontSize: Sizes.medium,
        margin: 30,
        marginTop: 20,
        marginBottom: 0,
        textAlign: 'center', 
    },
    btnStyle: {
        color: Colors.appColor,
        fontSize: Sizes.large,
    }
}


export default NoDataComponent;