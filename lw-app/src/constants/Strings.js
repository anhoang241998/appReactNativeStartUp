'use strict';

import React from 'react';

import LocalizedStrings from 'react-native-localization';

import vn from './localized/vn';
import en from './localized/en';

const url = {
	main: 'http://api.longway.vn:5555',
	test: 'http://192.168.0.111:5555',
}

const urlApi = url.test;
// const urlApi = url.main;

const sUrl = {
	main: 'http://api.longway.vn:15632',
	test: 'http://192.168.1.11:15632',
}

const urlSocket = sUrl.test;
// const urlApi = sUrl.main;

const otherString = {
	currency: 'đ',
	urlApi,
	urlSocket,
    portEspServer: 88,
    appKey: "xrZcgQpMcnB349qY",
    fontName: 'Roboto-Thin',
}

let strings = new LocalizedStrings({
	"en-US": en,
	en: en,
	vi: vn
});

Object.assign(strings, otherString);

export default strings;