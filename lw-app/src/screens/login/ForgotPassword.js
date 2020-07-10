'use strict';

import React, { useState } from 'react';

import {
	View,
	ScrollView,
	Text,
	ImageBackground,
	Dimensions,
	Alert,
    KeyboardAvoidingView,
} from 'react-native';

import { Input, Button } from 'react-native-elements';

import {
    Strings,
    Icons,
    Colors,
    Sizes,
    Paths,
} from '../../constants';

import {
    HTTPRequest,
    Indicator,
    Cache,
} from '../../components';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MODES = {
	"FORGOT": "FORGOT",
	"CODE": "CODE",
}

const ForgotPassword = (props) => {

	const { params } = props.navigation.state;

	const [loading, setLoading] = useState(false);
	const [buttonTitle, setButtonTitle] = useState(Strings.getCode);
	const [textInput, setTextInput] = useState(params.email);
	const [placeholder, setPlaceholder] = useState(Strings.typeEmail);
	const [newPassword, setNewPassword] = useState("");
	const [email, setEmail] = useState(params.email);

	const [mode, setMode] = useState(MODES.FORGOT);

	const onLoginScreen = () => {
		props.navigation.goBack();
	}

	const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const onCheckingMode = () => {
    	if (mode == MODES.FORGOT) {
    		onGetCode();
    	} else if (mode == MODES.CODE) {
    		onChangePassword();
    	}
    }

    const onChangePassword = async () => {

    	if (textInput.length == 0) {
    		HTTPRequest.showAlert(Strings.checkingCode);
    		return;
    	}

    	if (newPassword.length < 8) {
    		HTTPRequest.showAlert(Strings.checkingPassword);
    		return;
    	}

		hideObjects();

        const request = {
            username: email,
            code: textInput,
            password: newPassword,
        }

        const [err, data] = await HTTPRequest.post(Paths.changePass, request);

        if (err) {
            showObjects();
            return;
        }
        
        if (data.code != 200) {
            showObjects();
            // console.log(data);
            HTTPRequest.showAlert(data.message);
            return;
        }

        onSucessChange();
    }

    const onSucessChange = () => {
    	Alert.alert(
            Strings.message,
            Strings.changePassSuccess,
            [
                {
                    text: Strings.ok,
                    style: 'default',
                    onPress: () => props.navigation.goBack(),
                },
            ], 
            {
                cancelable: false
            },
        )
    }

	const onGetCode = async () => {

		if (!validateEmail(textInput)) {
			HTTPRequest.showAlert(Strings.checkingEmail);
			return;
		}

		hideObjects();

        const request = {
            username: textInput,
        }

        const [err, data] = await HTTPRequest.post(Paths.forgot, request);

        if (err) {
            showObjects();
            return;
        }
        
        if (data.code != 200) {
            showObjects();
            HTTPRequest.showAlert(data.message);
            return;
        }

        onSuccessCode();
    }

    const onSuccessCode = () => {
    	setEmail(textInput);
    	setMode(MODES.CODE);
    	setTextInput("");
    	setButtonTitle(Strings.changePassword);
    	setPlaceholder(Strings.typeCode);
        showObjects();
    }

    const hideObjects = () => {
    	setLoading(true);
    }

    const showObjects = () => {
    	setLoading(false);
    }

	const onChangeText = (text) => {
		setTextInput(text);
    }

    const onChangeNewPassword = (text) => {
		setNewPassword(text);
    }

	return (
		<ImageBackground source={params.BG_IMAGE} style={styles.bgImage}>
			{ loading ? <Indicator/> : 
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
				<KeyboardAvoidingView style={styles.emailForm} behavior="padding" enabled>
					<Text style={styles.textInfo}>
						{Strings.forgotPassword}
					</Text>
					
					<Input
						leftIcon={
			                <Icon
			                    name='envelope-o'
			                    color='rgba(0, 0, 0, 0.38)'
			                    size={20}
			                    style={{backgroundColor: 'transparent', marginBottom: 3}}
			                />
			            }
                        keyboardType='email-address'
						value={textInput}
						clearButtonMode='while-editing'
					  	placeholder={placeholder}
					  	inputStyle={{marginLeft: 10, fontSize: Sizes.medium}}
					  	selectionColor={Colors.appColor}
					  	onChangeText={onChangeText}
					/>

					{
						mode == MODES.CODE ? 
						<Input
							leftIcon={
				                <SimpleIcon
		                            name='lock'
		                            color='rgba(0, 0, 0, 0.38)'
		                            size={20}
		                            style={{backgroundColor: 'transparent', marginBottom: 3, marginTop: 10}}
		                        />
				            }
							value={newPassword}
							clearButtonMode='while-editing'
						  	placeholder={Strings.typeNewPassword}
						  	inputStyle={{marginLeft: 10, fontSize: Sizes.medium, marginTop: 10}}
						  	selectionColor={Colors.appColor}
						  	secureTextEntry={true}
						  	onChangeText={onChangeNewPassword}
						/> : null
					}

					<View style={styles.viewButton}>
						<Button
		                    buttonStyle={styles.loginButton}
		                    // containerStyle={{marginTop: 32, flex: 0}}
		                    activeOpacity={0.8}
		                    title={Strings.back}
		                    onPress={onLoginScreen}
		                    titleStyle={styles.loginTextButton}
		                />
						<Button
		                    buttonStyle={styles.loginButton}
		                    // containerStyle={{marginTop: 32, flex: 0}}
		                    activeOpacity={0.8}
		                    title={buttonTitle}
		                    onPress={onCheckingMode}
		                    titleStyle={styles.loginTextButton}
		                />
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
			}
		</ImageBackground>
    );
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center', 
        alignItems: 'center',
        // backgroundColor: 'red',
	},
	loginButton: {
        backgroundColor: Colors.appColor,
        borderRadius: 10,
        height: 50,
        width: 120,
        elevation: 0,
        margin: 16,
    },
    loginTextButton: {
        fontSize: Sizes.medium,
        color: 'white',
        fontWeight: 'bold',
    },
    viewButton: {
    	flexDirection: 'row',
    	alignItems: 'center',
    	// backgroundColor: 'red',
    	margin: 8,
    },
	emailForm: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
	},
	textInfo: {
		fontSize: Sizes.large,
		marginBottom: 10,
		margin: 20,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,
        // width: '100%', 
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
}

export default ForgotPassword;