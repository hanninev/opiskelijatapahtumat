import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    window.localStorage.setItem('user', response.accessToken)
}

const FacebookLoginButton = () => {
    return (
        <FacebookLogin
            appId="567551756946948"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook} />
    )
}

export default FacebookLoginButton