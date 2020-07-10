'use strict';

import {
    Alert,
} from 'react-native';

import axios from 'axios';

import {
	Strings,
} from '../../constants';

let headers = {
	'User-Agent': 	'Super Agent/1.0.0',
	'Content-Type': 'application/json',
}

const api = axios.create({
	baseURL: Strings.urlApi
});

const post = async (path, request) => {
	try {
	    const { data } = await api({
	        method: 'post',
	        url: path,
	        data: request,
	        headers: headers,
	    });
		return [null, data];
	} catch(err) {
		if (err)
			showAlert(err + "");
		return [err];
	}
}

const postArduino = async (url, formData) => {

    const options = {
        headers: {
            'Authorization': Strings.appKey,
        },
    }

    try {
        const { data } = await axios.post(url, formData, options);
        return [null, data];
    } catch(err) {
        return [err];
    }
}

const showAlert = (message) => {
	Alert.alert(
    	Strings.message,
    	message,
    )
}

export default {
    postArduino,
	post,
	showAlert,
}