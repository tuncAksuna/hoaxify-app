import React from 'react';
import { signUp, changeLanguage } from '../api/apiCalls';
import Input from './input';
import { withTranslation } from 'react-i18next';
class UserSignUp extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {},
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { t } = this.props;
        const errors = { ... this.state.errors }; // copying errors object
        errors[name] = undefined;


        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password Mismatch !')
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.password = t('Password Mismatch !')
            }
        } else {
            errors.passwordRepeat = undefined;
        }

        this.setState({
            [name]: value,
            errors
        });
    }

    onClickSignUp = (event) => {
        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {
            username: username,      // this.state.username
            displayName: displayName,
            password: password
        }

        this.setState({
            pendingApiCall: true
        });


        signUp(body)
            .then(response => {
                this.setState({
                    pendingApiCall: false,
                });
            })
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    pendingApiCall: false,
                    errors: err.response.data.validationErrors
                });
            })

    }

    onChangeLanguage = (language) => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render() {

        const { pendingApiCall, errors } = this.state;
        const { t } = this.props;

        return (
            <div className="container">

                <form>
                    <h1 className='text-center'>{t('Sign Up')}</h1>
                    <Input
                        label={t('Username')}
                        error={errors.username}
                        name="username"
                        onChange={this.onChange} />
                    <Input
                        label={t('Display Name')}
                        error={errors.displayName}
                        name="displayName"
                        onChange={this.onChange} />

                    <Input
                        label={t('Password')}
                        error={errors.password}
                        name="password"
                        onChange={this.onChange}
                        type="password"
                    />
                    <Input
                        label={t('Password Repeat')}
                        error={errors.passwordRepeat}
                        name="passwordRepeat"
                        onChange={this.onChange}
                        type="password"
                    />
                    <div className="text-center">
                        <button className='btn btn-success mt-4'
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall === true || errors.passwordRepeat !== undefined}>
                            {t('Sign Up')}
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                        </button>
                    </div>
                    <div>
                        <img alt="Türkçe"
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.onChangeLanguage('tr')} />
                        <img alt="English/USA"
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.onChangeLanguage('en')} />
                    </div>
                </form >
            </div>
        )
    }
}

const UserSignUpWithTranslation = withTranslation()(UserSignUp);

export default UserSignUpWithTranslation;