'use strict';

import {
    CHANGE_TOKEN,
    CHANGE_STATE_LOGIN,
} from '../types';

const initialState = {
    token: "",
    isLogin: null,
}

const Reducer = (state, action) => {
    
    switch (action.type) {
        case CHANGE_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        case CHANGE_STATE_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            }
        default:
            return state;
    }
}

export {
    initialState,
}

export default Reducer;

