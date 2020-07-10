'use strict';

let datetime = require('date-and-time');

function fixFromDate(date) {
	return datetime.format(date, 'YYYY-MM-DD 00:00:00');
}

function fixToDate(date) {
	return datetime.format(date, 'YYYY-MM-DD 23:59:59');
}

function getFullDate(date) {
	return datetime.format(date, 'DD/MM/YYYY HH:mm:ss');
}

function getFullDate1(date) {
	return datetime.format(date, 'DD/MM/YYYY HH:mm');
}

function getSimpleDate(date) {
	return datetime.format(date, 'DD/MM/YYYY');
}

function toMyDate(strDate) {
	let date = new Date(strDate.replace("Z", "") + '+07:00');
	return date;
}

const getDay = (date) => {
	return datetime.format(date, 'DD');
}

export default {
	fixFromDate,
	fixToDate,
	getFullDate,
	toMyDate,
	getSimpleDate,
	getFullDate1,
	getDay,
}