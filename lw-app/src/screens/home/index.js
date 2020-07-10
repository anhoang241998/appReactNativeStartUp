'use strict';

import React, { useState, useContext, useEffect } from 'react';

import {
  View,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  SectionList,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { request, PERMISSIONS } from 'react-native-permissions';

const DATA = [
  {
    room: "Living room",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    room: "Bed room",
    data: ["French Fries", "Onion Rings", "Fried Shrimps", "Tristiran Ho vi da Dung"]
  },
  {
    room: "Bath room",
    data: ["Water", "Coke", "Beer"]
  },
  {
    room: "Other",
    data: ["Cheese Cake", "Ice Cream"]
  }
];

// import {
//     fixNumber,
// } from 'longway-core';

// import Svg, {
//     G,
//     Rect,
// } from 'react-native-svg';

import {
    Text,
} from '../../elements';

import {
    Device,
    NaviButton,
    NoData,
    initSocket,
    HTTPRequest,
} from '../../components';

import {
    Icons,
    Sizes,
    Colors,
    Strings,
    RouteNames,
    Paths,
} from '../../constants';

var FormData = require('form-data');

var { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ITEM_COLUMNS = 3;

const Home = (props) => {

    const setNavigation = () => {

        const sizeAvatar = 36;
        const sizeAddButton = 25;
        const magrin = 14;

        const options = {
            headerLeft: () => (
                <NaviButton
                    image={() => (
                        <Icon
                            type='font-awesome'
                            name="user-circle"
                            size={sizeAvatar}
                            color={Colors.gray}
                        />
                    )}
                    containerStyle={{marginLeft: magrin}}
                    size={sizeAvatar}
                    onPress={onPressAvatar}
                />
            ),
            headerRight: () => (
                <NaviButton
                    image={() => (
                        <View style={{
                            backgroundColor: Colors.appColor, 
                            height: sizeAddButton, 
                            width: sizeAddButton, 
                            borderRadius: sizeAddButton/2
                        }}>
                            <Icon
                                type='ionicon'
                                name="ios-add"
                                size={sizeAddButton}
                                color={Colors.white}
                            />
                        </View>
                    )}
                    containerStyle={{marginRight: magrin}}
                    size={sizeAddButton}
                    onPress={onPressAvatar}
                />
            )
        }

        props.navigation.setOptions(options)
    }

    useEffect(() => {
        setNavigation();
        onStart();
    }, []);

    const [selectedValue, setSelectedValue] = useState("java");

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [revenue, setRevenue] = useState(0);
    const [invoice, setInvoice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [profit, setProfit] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
        }]
    });

    const showObjects = () => {
        setIsRefreshing(false);
    }

    const hiddenObjects = () => {
        setIsRefreshing(true);
    }

    const onStart = async () => {
        initSocket(); //Socket Io
    }

    const checkPermission = () => {
        request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }),
        ).then(result => {
            
        });
    }

    const onRefreshData = () => {
        
    }

    const checkingLogin = async () => {
        const [err, data] = await Cache.getToken();
        if (err || data == "") {
            props.navigation.navigate(RouteNames.Login);
            return false;
        }
        return true;
    }

    const onPressAddButton = () => {
        // props.navigation.navigate(RouteNames.Setup);
        // onSmartConfig();
        props.navigation.setOptions({ title: 'Updated!' })
    }

    const onPressRightButton = () => {
        props.navigation.navigate(RouteNames.Setup);
    }

    const onTestOnOff = () => {
        // alert('onTestOnOff'); http://192.168.1.79/?m=1&o=1
        // axios.get('http://192.168.1.79/', {
        //     params: {
        //         m: 1,
        //         o: 0,
        //     }
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
        // .then(function () {
        //     // always executed
        // });  

        if (x != null) {
            x.abort();
        }

        var x = new XMLHttpRequest();

        x.onreadystatechange = () => {
            console.log(x);
            // if (x.readyState == 4 && x.status == 200) {
            //     console.log(x.responseText)
            // }
        }
        x.open('GET', 'http://192.168.1.79/?m=1&o=0', true);
        x.send();
    }

    const onPressAvatar = () => {
        // alert('ok');
        // onSmartConfig();
        props.navigation.navigate(RouteNames.CheckPermission);
    }

    const NoDevice = () => (
        <ScrollView 
            contentContainerStyle={{
                alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefreshData}
                />
            }
        >
            <NoData 
                message={Strings.homeMessage} 
                marginTop={screenHeight/3}
                buttonTitle={Strings.start}
                buttonOnPress={onPressAddButton}
            />
        </ScrollView>
    )

    const RenderSectionSeoarator = ({ trailingItem }) => (
        !trailingItem ?
        <View
            style={styles.sectionSeparator}
        />
        :
        <View/>
    )

    const renderSectionItem = ({ section, index }) => {

        if (index !== 0) return null;

        const numberAddMore = section.data.length % ITEM_COLUMNS;

        // console.log('numberAddMore', numberAddMore);

        if (numberAddMore !== 0) {
            for (let i = 0; i < ITEM_COLUMNS - numberAddMore; i++) {
                section.data.push("");
            }
        }

        return (
            <FlatList
                data={section.data}
                numColumns={ITEM_COLUMNS}
                renderItem={({item, index}) => (
                    <Device 
                        item={item}
                        index={index}
                        numColumns={ITEM_COLUMNS}
                    />
                )}
                keyExtractor={(item, i) => item + i}
            />
        )
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                backgroundColor="black"
            />

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index }
                renderItem={renderSectionItem}
                renderSectionHeader={({ section: { room } }) => {
                    return (
                        <TouchableOpacity style={styles.section}>
                            <Text style={styles.header}>{room}</Text>
                            <Text style={styles.header1}>3 devices</Text>
                        </TouchableOpacity>
                    )}
                }
                SectionSeparatorComponent={ ({ trailingItem }) => (
                    <RenderSectionSeoarator trailingItem={trailingItem}/>
                )}
                ListHeaderComponent={() => (
                    <View
                        style={{ height: 8 }}
                    />    
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefreshData}
                    />
                }
            />

        </SafeAreaView>
    )
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    section: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontSize: Sizes.big,
        fontWeight: 'bold',
    },
    header1: {
        fontSize: Sizes.medium,
        // color: Colors.gray,
    },
    title: {
        fontSize: 24,
    },
    sectionSeparator: {
        height: 0.5,
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: Colors.lightGray,
        marginBottom: 16,
        marginTop: 8,
    }
}

export default Home;