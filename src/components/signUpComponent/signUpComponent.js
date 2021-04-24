import React from 'react';
import classes from './signUpComponent.scss';
import { Button, TextField } from '@material-ui/core';
import signupleft from './../../assets/svg/signupleft.svg';
import signupbtnRight from './../../assets/svg/signupbtnRight.svg';
import Axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index-action';

class SignUpComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            signUpForm: {
                firstName: {
                    label: 'First Name',
                    type: 'text',
                    variant: 'outlined',
                    value: '',
                },
                lastName: {
                    label: 'Last Name',
                    type: 'text',
                    variant: 'outlined',
                    value: '',
                },
                username: {
                    label: 'Username',
                    type: 'text',
                    variant: 'outlined',
                    value: '',
                    helperText: '',
                    error: false,
                },
                email: {
                    label: 'Email',
                    type: 'text',
                    variant: 'outlined',
                    value: '',
                },
                password: {
                    label: 'Password',
                    variant: 'outlined',
                    type: 'password',
                    value: '',
                },
            },
        };
    }

    onChangeNameText = (control, event) => {
        const newValue = event.target.value;
        const { signUpForm } = this.state;
        signUpForm[control].value = newValue;
        this.setState({
            signUpForm,
        });
        if (control === 'username') {
            this.onUsernameChange(newValue, control);
        }
    };

    onUsernameChange = (username, control) => {
        const { signUpForm } = this.state;
        signUpForm[control].helperText = '';
        Axios.get(`user/find/username?username=${username}`)
            .then((success) => {
                console.log(success);
                signUpForm[control].helperText = success.data.message;
                signUpForm[control].error =
                    success.data.status === 'success' ? false : true;
                this.setState({
                    signUpForm,
                });
            })
            .catch((error) => {
                signUpForm[control].helperText = error.message;
                signUpForm[control].error = true;
                this.setState({
                    signUpForm,
                });
                console.log(error);
            });
    };

    createUser = (evt) => {
        evt.preventDefault();
        const { signUpForm } = this.state;
        const requestObj = {};
        Object.keys(signUpForm).forEach(
            (key) => (requestObj[key] = signUpForm[key].value)
        );
        const { history } = this.props;
        this.props.userSignup(requestObj, history);
    };

    render() {
        return (
            <div className={classes.signUpComponent}>
                <div className={classes.bottomEnd}>
                    <img src={signupleft} alt="Explore " />
                    <img src={signupbtnRight} alt="Explore " />
                </div>
                <div className={classes.center}>
                    <div className={classes.signupForm}>
                        <h1>Create your account</h1>
                        <form
                            className={classes.formFields}
                            onSubmit={this.createUser}
                        >
                            {Object.keys(this.state.signUpForm).map(
                                (control, index) => (
                                    <TextField
                                        className={classes.MuiTextFieldRoot}
                                        name={control}
                                        key={index}
                                        onChange={(event) =>
                                            this.onChangeNameText(
                                                control,
                                                event
                                            )
                                        }
                                        {...this.state.signUpForm[control]}
                                    />
                                )
                            )}
                            <Button type="submit" variant="contained">
                                Sign Up
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userSignup: (userDetail, history) =>
            dispatch(actions.userSignup(userDetail, history)),
    };
};

export default connect(null, mapDispatchToProps)(SignUpComponent);
