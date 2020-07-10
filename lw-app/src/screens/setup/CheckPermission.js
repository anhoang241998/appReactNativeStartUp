'use strict';

import React, {
    useEffect,
} from 'react';

import {
    View,
    Button,
    ActivityIndicator,
    TextInput,
    Platform,
} from 'react-native';

import {
    RouteNames,
    Strings,
    Paths,
} from '../../constants';

import {
    HTTPRequest,
} from '../../components';

import {
    Text,
} from '../../elements';

import { NetworkInfo } from "react-native-network-info";

import Smartconfig from 'react-native-smartconfig-lw';

import { request, PERMISSIONS } from 'react-native-permissions';

const uuidv4 = require('uuid/v4');

const CheckPermission = (props) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [password, setPassword] = React.useState("");

    useEffect(() => {

        // request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
        //   // …
        // });
        request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }),
        ).then(result => {
            
        });

        NetworkInfo.getSSID().then(ssid => {
            props.navigation.setOptions({
                title: ssid
            })
        });

    }, []);

    const onPress = () => {
        onSmartConfig();
    }

    const onSmartConfig = async () => {

        if (password == "") {
            alert("Bạn phải nhập mật khẩu wifi");
            return;
        }

        setIsLoading(true);

        // NetworkInfo.getSSID().then(ssid => {
        //     // console.log(ssid);
        //     alert(ssid);
        // });

        const ssid = await NetworkInfo.getSSID();

        // alert(ssid);

        // return;

        // const ssid = "MSmobileT2_2.4GHz";
        // const password = "msmobile.com.vn";

        const configData = {
            type: 'esptouch', //or airkiss, now doesn't not effect
            ssid: ssid,
            bssid: '', //"" if not need to filter (don't use null)
            password: password,
            timeout: 50000 //now doesn't not effect
        }

        console.log('configData', configData);

        Smartconfig.start(configData).then( (results) => {

            console.log(results);

            const sendData = {
                SSID: ssid,
                PASSWORD: password,
                GUID: uuidv4(),
            }

            const formData = new FormData();

            formData.append('data', JSON.stringify(sendData));

            sendDataToArduino(formData, results[0].ipv4);

        }).catch( (error) => {

            console.log('error', error);

        });

        Smartconfig.stop(); //interrupt task
    }

    const sendDataToArduino = async (formData, ip) => {

        const [err, data] = await HTTPRequest.postArduino(`http://${ip}:${Strings.portEspServer}${Paths.espConnect}`, formData);

        console.log('err: ', err);
        console.log('data: ', data);

        if (err) {
            await Delay(500);
            sendDataToArduino(formData, ip); //connect again
            return;
        }

        HTTPRequest.showAlert(data.serial); //done
    }

    const onChangeText = (text) => {
        setPassword(text);
    }

    const LoadingView = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    }

    if (isLoading) {
        return (
            <LoadingView/>
        )
    }

	return (
      	<View style={styles.container}>
            <TextInput
                placeholder="Nhập mật khẩu wifi"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%", padding: 8, marginBottom: 10 }}
                clearButtonMode='while-editing'
                onChangeText={text => onChangeText(text)}
                value={password}
            />
            <Button
                title="Gửi cài đặt"
                onPress={onPress}
            />
        </View>
    );
}

const styles = {
	container: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
		backgroundColor: 'white',
	}
}

export default CheckPermission;