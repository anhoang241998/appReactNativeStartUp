import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Alert,
    NativeModules,

    // SafeAreaView,
    TouchableOpacity,
    FlatList,
    Switch,
    YellowBox,
    Image,
    ScrollView,
    RefreshControl,

} from 'react-native';

YellowBox.ignoreWarnings(['WebView']);

import DateTimePicker from 'react-native-modal-datetime-picker';
// import { ifIphoneX } from 'react-native-iphone-x-helper'
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import uuidv4 from 'uuid/v4';

// import { connect } from 'react-redux';
// import { navigationOnPressRight } from '../../redux/actions'

import {
    DateTime,
    NoData,
    HttpRequest,
    Indicator,
} from '../../components';

import {
    Strings,
    Icons,
    Colors,
    Sizes,
} from '../../constants';

class Schedule extends Component {

    constructor(props) {
        super(props);

        // this.arrData = [];
        this.config = 1; //1 => on, 0 => off
        this.state = {
            isLoadding: true,
            data: [],

            isDateTimePickerVisible: false,
            visibleProgress: false,
            switchValue: false,
            isReloading: false,
        }
    }

    componentDidMount() {
        this._onLoadSchedule();
    }

    _onCreateAlertExit = (message) => {
        Alert.alert(
            Strings.messages,
            message,
            [
                {
                    text: Strings.back,
                    style: 'cancel',
                    onPress: () => NativeModules.DismissViewController.exit(),
                },
            ], 
            {
                cancelable: false
            },
        )
    }

    _onLoadSchedule = async () => {

        const path = '/load-timer';
        const guid = this.props.screenProps.guid;
        const idSwitch = this.props.screenProps.idSwitch;

        const request = {
            guid: guid,
            idSwitch: idSwitch,
        }

        const [err, data] = await HttpRequest.post(path, request);

        if (err) {
            this.setState({
                isLoadding: false,
                isReloading: false,
            });
            return;
        }

        if (data.code == 504) {
            this._onCreateAlertExit(Strings.notSupportSchedule);
            return;
        }
        
        if (data.code != 200) {
            HttpRequest.showAlert(data.message);
            this._showObjects();
            return;
        }

        const arrData = sortTimeByKey(data.data, 'timer');

        this.setState({
            isLoadding: false,
            data: arrData,
            isReloading: false,
        });
    }

    _onRefresh = () => {
        this.setState({
            isLoadding: true,
            isReloading: true,
        }, () => {
            this._onLoadSchedule();
        });
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

    _handleDatePicked = (date) => {
        // console.log("A date has been picked: ", date);
        this._hideDateTimePicker();
        this._onAddSchedule(date);
    }

    _keyExtractor = (item, index) => index.toString()

    _onPressItem = (item) => {
        
    }

    _renderItem = ({item}) => (
        <MyListItem
            onPressItem={this._onPressItem}
            _onPressDelete={this._onPressDelete}
            item={item}
        />
    )

    renderSeparator = () => {
        return (
            <View
                style={{
                  height: 0.5,
                  width: "100%",
                  backgroundColor: Colors.lightGray,
                  marginLeft: MARGIN_RIGHT,
                }}
            />
        );
    }

    _onAddSchedule = (date) => {
        this.setState({
            isLoadding: true,
            isReloading: true,
        }, () => {
            this._onSaveSchedule(date);
        });
    }

    _onSaveSchedule = async (date) => {

        const path = '/create-timer';
        const guid = this.props.screenProps.guid;
        const idSwitch = this.props.screenProps.idSwitch;

        const request = {
            id: uuidv4(),
            guid: guid,
            config: this.config, // 1 on, 0 off switch
            type: 1, // 0 once, 1 every day
            timer: date,
            idSwitch: idSwitch,
            enable: true,
            notes: ""
        }

        const [err, data] = await HttpRequest.post(path, request);

        if (err) {
            this.setState({
                isLoadding: false,
                isReloading: false,
            });
            return;
        }
        
        if (data.code != 200) {
            HttpRequest.showAlert(data.message);
            this._showObjects();
            return;
        }

        this.state.data.push(request);

        const arrData = sortTimeByKey(this.state.data, 'timer');

        this.setState({
            isLoadding: false,
            data: arrData,
            isReloading: false,
        });
    }

    _onPressShowDatePicker = (config) => {
        this.config = config;
        this._showDateTimePicker();
    }

    _onPressDelete = async (id) => {

        this.setState({
            isLoadding: true,
            isReloading: true,
        });

        const path = '/delete-timer';

        const request = {
            idTimer: id,
        }

        const [err, data] = await HttpRequest.post(path, request);

        if (err) {
            this.setState({
                isLoadding: false,
                isReloading: false,
            });
            return;
        }
        
        if (data.code != 200) {
            HttpRequest.showAlert(data.message);
            this._showObjects();
            return;
        }

        this.removeItemById(id);
    }

    removeItemById = (id) => {
        let allItems = [...this.state.data];
        let filteredItems = allItems.filter(item => item.id.toUpperCase() != id.toUpperCase());
        this.setState({ 
            isLoadding: false,
            data: filteredItems,
            isReloading: false, 
        })
    }

    render() {

        const {
            isReloading,
            isLoadding,
            data,
        } = this.state;

        const MyFlatList = () => (
            <FlatList
                data={data}
                // extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this.renderSeparator}
            />
        )

        const MyActionButton = () => (
            <ActionButton buttonColor={Colors.appColor}>
                <ActionButton.Item 
                    buttonColor={Colors.purple} 
                    title={Strings.scheduleOn} 
                    onPress={() => this._onPressShowDatePicker(1)}>

                    <Icon name="lightbulb-on" style={styles.actionButtonIcon} />

                </ActionButton.Item>
                <ActionButton.Item 
                    buttonColor={Colors.green} 
                    title={Strings.scheduleOff} 
                    onPress={() => this._onPressShowDatePicker(0)}>

                    <Icon name="lightbulb" style={styles.actionButtonIcon} />

                </ActionButton.Item>
            </ActionButton>
        )

        if (isLoadding) {
            return ( <Indicator/> )
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    refreshControl={
                        <RefreshControl
                          refreshing={isReloading}
                          onRefresh={this._onRefresh}
                        />
                    }
                >
                { this.state.data.length != 0 ? 
                    <View>
                        <View style={styles.viewTop}>
                            <View style={{flex: 1}}/>
                            <View style={styles.viewImageOn}>
                                <Image
                                    style={styles.imageOnOff}
                                    source={Icons.ic_light_on}
                                />
                            </View>
                            <View style={{height: 30, width: 1, backgroundColor: Colors.lightGray, marginTop: 8}}></View>
                            <View style={styles.viewImageOff}>
                                <Image
                                    style={styles.imageOnOff}
                                    source={Icons.ic_light_off}
                                />
                            </View>
                        </View>
                        <MyFlatList/>
                    </View>
                    : 
                    <NoData/>
                }
                <View style={{height: 100}}/>
                </ScrollView>
                
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    confirmTextIOS={Strings.add}
                    cancelTextIOS={Strings.cancel}
                    titleIOS={Strings.schedule}
                    mode='time'
                    // onHideAfterConfirm={ (date) => this._onAddSchedule(date) }
                />
                <MyActionButton/>
            </View>
        );
    }
}

class MyListItem extends React.PureComponent {

    constructor(props) {
        super(props);

        const item = props.item;
        // console.log(item);

        let switchOnValue = false;
        let switchOffValue = false;

        if (item.enable) {
            if (item.config == 1) {
                switchOnValue = true;
            } else if (item.config == 0) {
                switchOffValue = true;
            }
        } else {
            switchOnValue = false;
            switchOffValue = false;
        };

        this.state = {
           switchOnValue: switchOnValue,
           switchOffValue: switchOffValue,
        };
    }

    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    _toggleSwitchOn = (value) => {
        if (value && this.state.switchOffValue) {
            return;
        }
        this.setState({switchOnValue: value})
    }

    _toggleSwitchOff = (value) => {
        if (value && this.state.switchOnValue) {
            return;
        }
        this.setState({switchOffValue: value})
    }

    _onPressDelete = () => {
        this.props._onPressDelete(this.props.item.id);
    }

    render() {

        const item = this.props.item;
        // console.log(item);

        // Buttons
        const swipeoutBtns = [
          {
            text: Strings.delete,
            backgroundColor: Colors.lightRed,
            onPress: this._onPressDelete,
          }
        ]

        let textType = Strings.once;
        if (item.type == 1)
            textType = Strings.everyDay;

        return (
            <Swipeout right={swipeoutBtns} backgroundColor='white'>
                <View style={styles.viewItem} onPress={this._onPress}>
                    <View style={styles.viewHour}>
                        <Text style={styles.textHour}>
                            {DateTime.getHour(new Date(item.timer))}
                        </Text>
                        <Text style={styles.textOnce}>
                            {textType}
                        </Text>
                    </View>
                    <Switch
                        style = {styles.switchItemOn}
                        // onValueChange = {this._toggleSwitchOn}
                        value = {this.state.switchOnValue}
                    />
                    <View style={{height: 30, width: 1, backgroundColor: Colors.lightGray}}/>
                    <Switch
                        style = {styles.switchItemOff}
                        // onValueChange = {this._toggleSwitchOff}
                        value = {this.state.switchOffValue}
                    />
                </View>
            </Swipeout>
        );
    }
}

const MARGIN_RIGHT = 16;
const SIZE_IMAGE = 40;
const SIZE_SWITCH = 50;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    textHour: {
        fontSize: 40,
        marginTop: MARGIN_RIGHT,
        marginLeft: MARGIN_RIGHT,
        marginRight: MARGIN_RIGHT,
        // marginBottom: 8,
    },
    textOnce: {
        fontSize: Sizes.medium,
        marginBottom: MARGIN_RIGHT,
        marginLeft: MARGIN_RIGHT + 5,
    },
    viewItem: {
        flexDirection: 'row', 
        alignItems: "center",
        backgroundColor: 'white',
    }, 
    switchItemOff: {
        marginRight: MARGIN_RIGHT,
        marginLeft: MARGIN_RIGHT,
        width: SIZE_SWITCH,
    },
    switchItemOn: {
        marginRight: MARGIN_RIGHT,
        width: SIZE_SWITCH,
    },
    viewHour: {
        flex: 1,
    },
    imageOnOff: {
        width: SIZE_IMAGE,
        height: SIZE_IMAGE,
        marginTop: MARGIN_RIGHT / 2,
    },
    viewImageOn: {
        // backgroundColor: 'red',
        width: MARGIN_RIGHT * 2 + SIZE_SWITCH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewImageOff: {
        // backgroundColor: 'blue',
        width: MARGIN_RIGHT * 2 + SIZE_SWITCH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewTop: {
        flexDirection: 'row', 
        alignItems: "center",
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

// const mapStateToProps = (state) => {
//     return { 
//         navigations: state.navigation,
//     };
// }

function sortTimeByKey(array, key) {
    return array.sort( (a, b) => {
        let x = DateTime.getHour(new Date(a[key])); let y = DateTime.getHour(new Date(b[key]));
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

// const ScheduleApp = connect(mapStateToProps, { navigationOnPressRight })(Schedule);

export default Schedule;