const localhost = "https://backend-entr.herokuapp.com";
//const localhost = "https://tradeprev.pythonanywhere.com";
const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

//Authorization
export const loginURL = `${localhost}/rest-auth/login/`
export const registrationURL = `${localhost}/rest-auth/registration/`
export const changePasswordUrl = `${localhost}/rest-auth/password/change/`;
export const resetPasswordUrl = `${localhost}/rest-auth/password/reset/`;
export const resetPasswordConfirmUrl = `${localhost}/rest-auth/password/reset/confirm/`;
export const activateUserUrl = `${localhost}/rest-auth/registration/verify-email/`;
export const userProfileUrl = `${localhost}/rest-auth/user/`;
