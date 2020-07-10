'use strict';

import AsyncStorage from '@react-native-community/async-storage';

const TOKEN_KEY = "TOKEN";
const EMAIL_KEY = "EMAIL";
// const ROLE_KEY = "ROLE";
// const PASSWORD_KEY = "PASSWORD";
// const BRANCH_KEY = "BRANCH";

// const storeRole = async (role) => {
// 	try {
// 		await AsyncStorage.setItem(ROLE_KEY, role)
// 		return [null, 'success'];
// 	} catch (e) {
// 		return [e];
// 	}
// }

// const getRole = async () => {
// 	try {
// 		let value = await AsyncStorage.getItem(ROLE_KEY);
// 		if (value == null) {
// 			value = "";
// 		}
// 		return [null, value];
// 	} catch(e) {
// 		return [e];
// 	}
// }

const storeEmail = async (email) => {
	try {
		await AsyncStorage.setItem(EMAIL_KEY, email)
		return [null, 'success'];
	} catch (e) {
		return [e];
	}
}

const getEmail = async () => {
	try {
		let value = await AsyncStorage.getItem(EMAIL_KEY);
		if (value == null) {
			value = "";
		}
		return [null, value];
	} catch(e) {
		return [e];
	}
}

// const storePass = async (pass) => {
// 	try {
// 		await AsyncStorage.setItem(PASSWORD_KEY, pass)
// 		return [null, 'success'];
// 	} catch (e) {
// 		return [e];
// 	}
// }

// const getPass = async () => {
// 	try {
// 		let value = await AsyncStorage.getItem(PASSWORD_KEY);
// 		if (value == null) {
// 			value = "";
// 		}
// 		return [null, value];
// 	} catch(e) {
// 		return [e];
// 	}
// }

const storeToken = async (data) => {
	try {
		await AsyncStorage.setItem(TOKEN_KEY, data)
		return [null, 'success'];
	} catch (e) {
		return [e];
	}
}

const getToken = async () => {
	try {
		let value = await AsyncStorage.getItem(TOKEN_KEY);
		if (value == null) {
			value = "";
		}
		return [null, value];
	} catch(e) {
		return [e];
	}
}

const clearAll = async () => {
	try {
		await AsyncStorage.removeItem(TOKEN_KEY);
		// await AsyncStorage.removeItem(ROLE_KEY);
		// await AsyncStorage.removeItem(PASSWORD_KEY);
		// await AsyncStorage.removeItem(BRANCH_KEY);
	} catch(e) {}
}

// const storeBranch = async (branch) => {
// 	try {
// 		await AsyncStorage.setItem(BRANCH_KEY, branch)
// 		return [null, 'success'];
// 	} catch (e) {
// 		return [e];
// 	}
// }

// const getBranch = async () => {
// 	try {
// 		let value = await AsyncStorage.getItem(BRANCH_KEY);
// 		if (value == null) {
// 			value = "[]";
// 		}
// 		return [null, value];
// 	} catch(e) {
// 		return [e];
// 	}
// }

export default {
	// storeBranch,
	// getBranch,
	// storePass,
	// getPass,
	// storeRole,
	// getRole,
	storeEmail,
	getEmail,
	storeToken,
	getToken,
	clearAll,
}