'use strict';

import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  Keyboard,
  Image,
  Platform,
} from 'react-native';

import {
    Strings,
    Colors,
    Sizes,
    Icons,
} from '../../constants';

import Input from '../Input';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        width: 0,
        marginLeft: 0,
        value: '',
    }
  }

  componentDidMount () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillShowListener.remove();
  }

  //---------------Function----------------//

  _keyboardWillShow = () => {
    this.setState({ width: null, marginLeft: 8 });
  }

  _keyboardWillHide = () => {
    this.setState({ width: 0, marginLeft: 0 });
  }

  _onPressCancel() {
    Keyboard.dismiss()
  }

  //---------------------------------------//

  render() {
    return (
      
      <SafeAreaView style={{...styles.viewHeader, ...this.props.style}}>
        <View style={styles.viewSearch}>
          {/*<Ionicons 
            style={styles.searchIcon}
            name="ios-search" 
            size={Sizes.largeText} 
            color="gray"/>*/}
          <Image
            style={styles.searchIcon}
            source={Icons.ic_search}
          /> 
          {/*<TextInput
            textAlignVertical={'center'}
            style={styles.searchTextInput}
            // clearButtonMode='while-editing'
            placeholder={Strings.filter}
            onChangeText={(searchString) => {this.props.onChangeText(searchString)}}
            underlineColorAndroid="transparent"
            selectionColor={Colors.appColor}/>*/}
            <Input 
                textAlignVertical={'center'}
                value={this.state.value}
                onChangeText={(searchString) => {
                    this.setState({
                        value: searchString,
                    });
                    this.props.onChangeText(searchString)
                }}
                // placeholder={Strings.filter} 
                placeholder={this.props.placeholder} 
                containerStyle={styles.searchTextInput} 
                inputStyle={styles.searchTextInput}
                underlineColorAndroid="transparent"
                selectionColor={Colors.appColor}
            />
        </View>
        <TouchableOpacity>
          <Text style={[styles.textCancel, {width: this.state.width, marginRight: this.state.marginLeft}]} onPress={() => this._onPressCancel()}>
            {Strings.cancel}
          </Text>
        </TouchableOpacity>
      {/*<View style={styles.line}></View>*/}
      </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  viewHeader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSearch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteSmoke, 
    borderRadius: 10,
    marginTop: 8, 
    marginRight: 8, 
    marginBottom: Platform.OS === 'android' ? 0 : 8, 
    marginLeft: 8,
    // height: Platform.OS === 'android' ? 50 : 38,
    height: 38,
  },
  searchIcon: {
    margin: 9,
    width: 15,
    height: 15,
    tintColor: Colors.appColor,
  },
  searchTextInput: {
    flex: 1,
    backgroundColor: Colors.whiteSmoke,
    marginRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  textCancel: {
    color: Colors.appColor,
    // marginRight: 8,
    // paddingLeft: 10,
    fontSize: 17,
    // marginBottom: 3,
  },
  line: {
    height: 0.17, 
    backgroundColor: 'gray',
  },
});