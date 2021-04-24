import React from 'react';
import { TextField, Button, Link } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import classes from './AuthComponent.scss';
import * as actions from './../../store/actions/index-action';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import googleImage from './../../assets/images/google-icon.png';

function AuthComponent(props) {
    let history = useHistory();
    const userInformation = {
        email: '',
        password: '',
    };

    function authStart() {
        if (userInformation.email !== '' && userInformation.password !== '') {
            props.AuthStart(
                userInformation.email,
                userInformation.password,
                history
            );
        }
    }

    const sendGoogleToken = (idToken) => {
        props.GoogleAuth(idToken, history);
    };

    function onChangeNameText(event) {
        userInformation.email = event.target.value;
    }

    const responseGoogle = (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        sendGoogleToken(response.tokenId);
    };

    function onChangeEmailText(event) {
        userInformation.password = event.target.value;
    }

    return (
        <div className={classes.AuthComponentClass}>
            <ToastContainer />
            <form onSubmit={authStart}>
                <TextField
                    id="outlined-basic"
                    label="Username"
                    onChange={onChangeNameText}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    onChange={onChangeEmailText}
                    variant="outlined"
                />
                <Link>Forgot password ?</Link>
                <Button onClick={authStart} variant="contained">
                    Login
                </Button>
                <GoogleLogin
                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    scope={
                        'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read'
                    }
                    render={(renderProps) => (
                        <button
                            className={classes.google}
                            style={{ backgroundImage: `url('${googleImage}')` }}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            Sign In with google
                        </button>
                    )}
                ></GoogleLogin>
            </form>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        AuthStart: (email, password, history) =>
            dispatch(actions.authStart(email, password, history)),
        GoogleAuth: (idToken, history) =>
            dispatch(actions.googleSign(idToken, history)),
    };
};

export default connect(null, mapDispatchToProps)(AuthComponent);
