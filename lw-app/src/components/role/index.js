'use strice';

const companyRoles = {
	SUPERADMIN: 0,
	ADMIN: 1,
	ACCOUNTANT: 2,
	SELER: 3,
	EMPLOYEE: 4,
}

const onChecking = (group) => {
	switch (group.toUpperCase()) {
		case 'D011C075-1983-4244-8742-5D5379FBD568': //admin
			return companyRoles.ADMIN;
		case '841DD064-E424-476F-A348-F14F74C3C622': //kế toán
			return companyRoles.ACCOUNTANT;
		case '86FF43A2-9F03-4453-BEAA-5E7649FFB96B': //Kinh doanh
			return companyRoles.SELER;
		default:
			return companyRoles.EMPLOYEE; 
	}
}

const checkingRole = (listGroups) => {

	let userRole = companyRoles.EMPLOYEE;

	for (const item of listGroups) {
		const role = onChecking(item.UserGroupID);
		if (role < userRole) {
			userRole = role;
		}
	}

	return userRole;

}

export default {
	companyRoles,
	checkingRole,
}