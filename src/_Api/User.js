import axios from 'axios';


function loginUserApi(email, password) {
    return axios.post('/v0.1/user/login', {email, password});
}

function logoutUserApi() {
    return axios.post('/v0.1/user/logout');
}

function getUserDetailsApi() {
    return axios.get('/v0.1/user');
}

function forgotPasswordAPI(email, recaptcha) {
    return axios.post('/v0.1/user/forgot_password', {
        email,
        captcha_token: recaptcha
    });
}

function resetPasswordAPI(resetToken, new_password) {
    return axios.post(`/v0.1/user/reset_password/${resetToken}`, {
        new_password,
    });
}

function resendActivationMailApi(email, recaptcha) {
    return axios.post('/v0.1/user/resend_activation', {
        email,
        captcha_token: recaptcha
    });

}

function signupAPI(full_name, email, password, phone_no, college_id, captcha_token) {

    return axios.post('/v0.1/user/signup', {
        full_name,
        email,
        password,
        phone_no,
        college_id,
        captcha_token
    });

}

export {loginUserApi, signupAPI, logoutUserApi, resendActivationMailApi, getUserDetailsApi, forgotPasswordAPI, resetPasswordAPI};
