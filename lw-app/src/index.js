'use strict';

import React from 'react';

import Store from './contexts'
import Screens from './screens';

const Source = () => {
	return ( 
        <Store>
            <Screens/>
        </Store>
    )
}

export default Source;