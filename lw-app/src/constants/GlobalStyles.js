// import { StyleSheet, Platform } from 'react-native';
// export default StyleSheet.create({
//     droidSafeArea: {
//         // flex: 1,
//         backgroundColor: 'white',
//         paddingTop: Platform.OS === 'android' ? 25 : 0
//     },
// });

import { StyleSheet, Platform } from 'react-native';
import Colors from './Colors';

const styleItemFlatList = function(index) {
	return {
    	flex: 1, 
    	backgroundColor: index % 2 == 0 ? 'white' : Colors.grayWhite
    }
}

const styles = StyleSheet.create({
    droidSafeArea: {
        // flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});

module.exports = {
	styleItemFlatList,
	styles,
}