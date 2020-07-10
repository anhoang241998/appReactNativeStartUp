import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
    StatusBar,
    Keyboard,  
    TouchableWithoutFeedback,
    Alert,
    Image,
    Platform,
    NativeModules,
} from 'react-native';

import {
    StackActions,
    NavigationActions,
} from 'react-navigation';

import { Input, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import {
    Strings,
    Icons,
    Colors,
    Sizes,
    Paths,
    RouteNames,
} from '../../constants';

import {
    Cache,
    HTTPRequest,
} from '../../components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = Icons.BG_IMAGE

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected}/>
        </View>
    );
};

const DismissKeyboard = ({ children }) => { return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1, backgroundColor: 'red'}}>
        {children}
    </TouchableWithoutFeedback>
)};

const signInAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: RouteNames.TabNavigator })],
});

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

export default class LoginScreen2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
        };

        this.checkEmail();
    }

    componentDidMount() {
        Cache.clearAll();
    }

    checkEmail = async () => {
        
        const [, email_c] = await Cache.getEmail();

        if(email_c)
            this.setState({email: email_c})
    }

    selectCategory = (selectedCategory) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    checkValidate = (state) => {

        const {
            email,
            password,
            passwordConfirmation,
            selectedCategory,
        } = this.state;

        LayoutAnimation.easeInEaseOut();

        state.setState({
            isLoading: false,
            isEmailValid: state.validateEmail(email) || state.KeyboardView.emailInput.shake(),
            isPasswordValid: password.length >= Sizes.minLengthPassword || state.KeyboardView.passwordInput.shake(),
        });

        if (selectedCategory == 1) {
            state.setState({
                isConfirmationValid: password == passwordConfirmation || state.KeyboardView.confirmationInput.shake(),
            });
        }
    }

    login = async () => {

        Keyboard.dismiss();

        const {
            email,
            password,
        } = this.state;

        this.setState({ isLoading: true });

        if (password.length < Sizes.minLengthPassword || !this.validateEmail(email)) {
            this.checkValidate(this);
            return;
        }

        const request = {
            username: email,
            password: password
        }

        const [err, data] = await HTTPRequest.post(Paths.signIn, request);

        if (err) {
            this.checkValidate(this);
            return;
        }
        
        if (data.code != 100) {
            this.checkValidate(this);
            HTTPRequest.showAlert(data.message);
            return;
        }

        //Save cache
        await Cache.storeToken(data.tokenId);
        await Cache.storeEmail(email);

        this.props.navigation.dispatch(signInAction);
    }

    signUp = async () => {

        Keyboard.dismiss();

        const {
            email,
            password,
            passwordConfirmation,
        } = this.state;

        this.setState({ isLoading: true });

        if (password.length < Sizes.minLengthPassword || !this.validateEmail(email) || password != passwordConfirmation) {
            this.checkValidate(this);
            return;
        }

        const request = {
            username: email,
            password: password,
            email: email,
            phonenumber: '',
            birthday: new Date(),
            gender: '',
            nationality: '',
            address: '',
            job: '',
            notes: '', 
        };

        const [err, data] = await HTTPRequest.post(Paths.register, request);

        if (err) {
            this.checkValidate(this);
            return;
        }
        
        if (data.code != 200) {
            this.checkValidate(this);
            HTTPRequest.showAlert(data.message);
            return;
        }

        this.setState({
            selectedCategory: 0,
            isLoading: false,
            password: '',
            passwordConfirmation: '', 
        });

        Alert.alert(
            Strings.message, 
            `${Strings.success}!!!`,
        );
    }

    onChangeEmail = (email) => {
        this.setState({ email });
    }

    onChangePassword = (password) => {
        this.setState({ password });
    }

    onChangeConfirmation = (passwordConfirmation) => {
        this.setState({ passwordConfirmation });
    }

    render() {

        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            email,
            password,
            passwordConfirmation,
        } = this.state;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;

        return (
            <ImageBackground source={BG_IMAGE} style={styles.container}>
                <DismissKeyboard>
                    <KeyboardAvoidingView style={styles.bgImage} behavior="padding" enabled>
                        <StatusBar
                            backgroundColor="transparent"
                            barStyle="light-content"
                        />
                        <View>
                            <View contentContainerStyle={styles.loginContainer} behavior='position'>
                                <MyTitle/>
                                <TopFormButton
                                    isLoading={isLoading}
                                    isLoginPage={isLoginPage}
                                    isSignUpPage={isSignUpPage}
                                    selectCategory={this.selectCategory}
                                />
                                <View style={styles.rowSelector}>
                                    <TabSelector selected={isLoginPage}/>
                                    <TabSelector selected={isSignUpPage}/>
                                </View>
                                
                                <KeyboardView
                                    selectedCategory={selectedCategory}
                                    isLoading={isLoading}
                                    isEmailValid={isEmailValid}
                                    isPasswordValid={isPasswordValid}
                                    isConfirmationValid={isConfirmationValid}
                                    email={email}
                                    password={password}
                                    passwordConfirmation={passwordConfirmation}
                                    onChangeEmail={this.onChangeEmail}
                                    onChangePassword={this.onChangePassword}
                                    onChangeConfirmation={this.onChangeConfirmation}
                                    login={this.login}
                                    signUp={this.signUp}
                                    ref={(node) => { this.KeyboardView = node; }}
                                />
                            </View>
                            <HelpButton 
                                navigation={this.props.navigation} 
                                email={this.state.email}
                                isLoading={isLoading}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </DismissKeyboard>
            </ImageBackground>
        );
    }
}

class MyTitle extends Component {
    render() {
        return (
            <View style={styles.titleContainer}>
                <Image
                    source={Icons.ic_logo_white}
                    style={styles.imageLogo}
                />
            </View>
        );
    }
}

class TopFormButton extends Component {

    selectCategory = (category) => {
        this.props.selectCategory(category);
    }

    render() {

        const {
            isLoading,
            isLoginPage,
            isSignUpPage,
        } = this.props;

        return (
            <View style={{flexDirection: 'row'}}>
                <Button
                    disabled={isLoading}
                    type="clear"
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(0)}
                    containerStyle={{flex: 1}}
                    titleStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
                    title={Strings.login}
                />
                <Button
                    disabled={isLoading}
                    type="clear"
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(1)}
                    containerStyle={{flex: 1}}
                    titleStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
                    title={Strings.signUp}
                />
            </View>
        );
    }
}

const HelpButton = ({navigation, email, isLoading}) => {

    const onPress = () => {
        navigation.navigate(RouteNames.Forgot, { email: email, BG_IMAGE: BG_IMAGE });
    }

    return (
        <View style={styles.helpContainer}>
            {/*<Text style={{color: 'white', fontSize: Sizes.medium, fontWeight: 'bold'}}>
                {Strings.needHelp}
            </Text>*/}
            <Button
                title={`${Strings.forgotPassword}?`}
                titleStyle={{color: 'white', fontSize: Sizes.medium}}
                buttonStyle={{backgroundColor: 'transparent'}}
                underlayColor='transparent'
                onPress={onPress}
                disabled={isLoading}
                disabledStyle={{backgroundColor: 'transparent'}}
            />
        </View>
    );
}

class KeyboardView extends Component {

    login = () => {
        this.props.login();
    }

    signUp = () => {
        this.props.signUp();
    }

    onChangeEmail = (email) => {
        this.props.onChangeEmail(email);
    }

    onChangePassword = (password) => {
        this.props.onChangePassword(password);
    }

    onChangeConfirmation = (passwordConfirmation) => {
        this.props.onChangeConfirmation(passwordConfirmation);
    }

    render() {

        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            email,
            password,
            passwordConfirmation,
        } = this.props;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;

        return (
            <View style={styles.formContainer}>
                <Input
                    leftIcon={
                        <Icon
                            name='envelope-o'
                            color='rgba(0, 0, 0, 0.38)'
                            size={20}
                            style={{backgroundColor: 'transparent', marginBottom: 3}}
                        />
                    }
                    value={email}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    inputStyle={{marginLeft: 10, fontSize: Sizes.medium}}
                    placeholder={'Email'}
                    containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    ref={input => this.emailInput = input}
                    clearButtonMode='while-editing'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={email => this.onChangeEmail(email)}
                    errorMessage={isEmailValid ? null : Strings.checkingEmail}
                    selectionColor={Colors.appColor}
                />
                <Input
                    leftIcon={
                        <SimpleIcon
                            name='lock'
                            color='rgba(0, 0, 0, 0.38)'
                            size={20}
                            style={{backgroundColor: 'transparent', marginBottom: 3}}
                        />
                    }
                    value={password}
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                    blurOnSubmit={true}
                    containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    inputStyle={{marginLeft: 10, fontSize: Sizes.medium}}
                    placeholder={Strings.passWord}
                    ref={input => this.passwordInput = input}
                    onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
                    clearButtonMode='while-editing'
                    onChangeText={(password) => this.onChangePassword(password)}
                    errorMessage={isPasswordValid ? null : Strings.checkingPassword}
                    selectionColor={Colors.appColor}
                />
                {
                    isSignUpPage &&
                    <Input
                        leftIcon={
                            <SimpleIcon
                                name='lock'
                                color='rgba(0, 0, 0, 0.38)'
                                size={20}
                                style={{backgroundColor: 'transparent', marginBottom: 3}}
                            />
                        }
                        value={passwordConfirmation}
                        secureTextEntry={true}
                        keyboardAppearance='light'
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                        inputStyle={{marginLeft: 10, fontSize: Sizes.medium}}
                        placeholder={Strings.confirmPassword}
                        ref={input => this.confirmationInput = input}
                        onSubmitEditing={this.signUp}
                        clearButtonMode='while-editing'
                        onChangeText={passwordConfirmation => this.onChangeConfirmation(passwordConfirmation)}
                        errorMessage={isConfirmationValid ? null : Strings.checkingConfirmPass}
                        selectionColor={Colors.appColor}
                    />
                }
                <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{marginTop: 32, flex: 0}}
                    activeOpacity={0.8}
                    title={isLoginPage ? Strings.login : Strings.signUp}
                    onPress={isLoginPage ? this.login : this.signUp}
                    titleStyle={styles.loginTextButton}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </View>
        );
    }
}

const SIZE_LOGO = 115;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    imageLogo: {
        height: SIZE_LOGO,
        width: SIZE_LOGO * 2142 / 3076,
        marginBottom: SIZE_LOGO/2,
        // borderRadius: SIZE_LOGO/2,
        opacity: 0.9,
    },
    viewImageLogo: {
        marginBottom: SIZE_LOGO/2,
        borderRadius: SIZE_LOGO/2,
        backgroundColor: 'red',
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: Sizes.medium,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: Colors.appColor,
        borderRadius: 10,
        height: 50,
        width: 200,
        elevation: 0,
    },
    titleContainer: {
        // height: 150,
        // backgroundColor: 'red',
        justifyContent: 'center',
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems:'center',
    },
    loginText: {
        fontSize: Sizes.medium,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,
        // width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: Sizes.large,
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        marginBottom: 50,
        // fontWeight: 'bold',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
