'use strict';
import React, { createContext } from "react";

import Reducer, { initialState } from '../reducers/AuthenticationReducer';
import {
    getActions,
} from '../actions/AuthenticationActions';

const Store = ({children}) => {

    const [state, dispatch] = React.useReducer(Reducer, initialState);

    const actions = getActions(dispatch);
    
    return (
        <AuthenticationContext.Provider value={[state, actions]}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const AuthenticationContext = createContext();
export default Store;