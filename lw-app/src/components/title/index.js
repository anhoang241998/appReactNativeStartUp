'use strict';

import React from 'react';

import {
    Text,
    Dimensions,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';

import {
    Icons,
    Colors,
} from '../../constants';

import { Icon } from 'react-native-elements';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MARGIN = 20;
const TITLE_SIZE = 32;

const Title = ({ title, subtitle, rightIcon, onPressRightButton }) => {

    const SubTitle = () => {
        return (
            <Text style={styles.textSubtitle}>{subtitle}</Text>
        )
    }

    const RightIcon = () => {

        if (!rightIcon)
            return <View/>;

        if (rightIcon.type) {
            return (
                <Icon
                    // raised
                    name={rightIcon.name}
                    type={rightIcon.type}
                    color="black"
                    size={rightIcon.size}
                    iconStyle={{ 
                        width: rightIcon.size, 
                        height: rightIcon.size, 
                        textAlign: 'center', 
                    }}
                    containerStyle={{ marginRight: 8 }}
                    // underlayColor={Colors.whiteSmoke}
                    underlayColor="lightgray"
                    onPress={onPressRightButton} 
                />
            )
        }

        return (
            <TouchableOpacity onPress={onPressRightButton}>
                <Image
                    source={rightIcon}
                    style={styles.imgRightIcon}
                />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>
                    {title}
                </Text>
                <RightIcon/>
            </View>
            {subtitle ? <SubTitle/> : null}
        </SafeAreaView>
    );
}

const styles = {
    textTitle: {
        fontSize: TITLE_SIZE,
        fontWeight: 'bold',
        // marginTop: MARGIN,
        marginLeft: MARGIN,
        // width: screenWidth - MARGIN,
        flex: 1,
    },
    textSubtitle: {
        fontSize: 12,
        marginTop: 2,
        marginLeft: MARGIN,
        width: Dimensions.get('window').width - MARGIN,
        color: 'lightgray'
    },
    imgRightIcon: {
        height: TITLE_SIZE,
        width: TITLE_SIZE,
        marginRight: 16,
        // backgroundColor: 'red',
    },
    viewTitle: {
        alignItems: 'center', 
        flexDirection: 'row', 
        marginTop: MARGIN,
        // backgroundColor: 'red',
        width: '100%',
    }
}

export default Title;