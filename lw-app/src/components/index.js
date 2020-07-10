'use strict';

import Input from './Input';
import Progress from './Progress';
import { NaviButton } from './navigation';
import BarChart from './chart/BarChart';
import Title from './title';
import HTTPRequest from './request';
import Cache from './cache';
import Dates from './date';
import Roles from './role';
import {
	getBranchXML
} from './branch';
import NoData from './other/NoData';
import Indicator from './other/Indicator';
import SearchBar from './search';
import Delay from './other/Delay';

import {
	Device,
} from './device';

// import Text from './elements/Text';

import {
	initSocket,
} from './socket';

function sortByKey(array, key, sortBy = 'ASC') {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (sortBy.toUpperCase() == "DESC")
	        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	    else
	    	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export {
	initSocket,
	// Text,
	Device,
    Delay,
    SearchBar,
	Indicator,
	NoData,
	sortByKey,
	getBranchXML,
	Roles,
	Input,
	Progress,
	NaviButton,
	BarChart,
	Title,
	HTTPRequest,
	Cache,
	Dates,
}