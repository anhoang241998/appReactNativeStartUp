'use strict';

import React from "react";

import AuthenticationStore, { AuthenticationContext } from './stores/AuthenticationStore';

const Store = ({ children }) => { return (
    <AuthenticationStore>
        {children}
    </AuthenticationStore>
)}

export {
    AuthenticationContext,
}

export default Store;