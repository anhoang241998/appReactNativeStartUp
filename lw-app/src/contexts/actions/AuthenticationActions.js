import React from 'react';

import { createAction } from '../utils/createAction';
import {
    CHANGE_TOKEN,
    CHANGE_STATE_LOGIN,
} from '../types';

export const getActions = (dispatch) => {

    const actions = React.useMemo(
		() => ({
			changeToken: (token) => {
				dispatch(createAction(CHANGE_TOKEN, token));
			},
			checkingLogin: () => {
				dispatch(createAction(CHANGE_STATE_LOGIN, true));
			}
		}),
		[],
	);
	
    return actions;
}