import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import axios from 'axios';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                required: true, 
                placeholder: 'Введите email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                required: true, 
                placeholder: 'Введите Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            }
        }
    }

    onClickLoginHandler = async () => {
        const API_KEY = "AIzaSyCSzer3p8FxV722uRTlFfqiG79a6GxG-2k";

        let {email, password} = this.state.formControls;

        const authData = {
            email: email.value, 
            password: password.value, 
            returnSecureToken: true
        }

        try {
            const response  = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData);
            console.log(response.data);
        } catch (err) {
            console.error(err)
        }
    }

    onClickRegisterHandler = async () => {
        const API_KEY = "AIzaSyCSzer3p8FxV722uRTlFfqiG79a6GxG-2k";

        let {email, password} = this.state.formControls;

        const authData = {
            email: email.value, 
            password: password.value, 
            returnSecureToken: true
        }

        try {
            const response  = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData);
            console.log(response.data);
        } catch (err) {
            console.error(err)
        }

    }

    onSubmitFormHandler = (event) => {
        event.preventDefault();
    }

    validateControl(value, validation) {
        if(!validation) return true;

        let isValid = true;

        if(validation.required) {
            isValid = value.trim !== '' && isValid;
        }

        if(validation.email) {
            isValid = validateEmail(value)  && isValid;
        }

        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeInputHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        });


        this.setState({formControls, isFormValid});
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key={controlName + i} 
                    type={control.type}
                    value={control.value}
                    placeholder={control.placeholder}
                    valid={control.valid}
                    touched={control.touched}
                    required={control.required}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={Boolean(control.validation)}
                    onChange={event => this.onChangeInputHandler(event, controlName)}
                />
            )
        });
    }

    render() {
        return (
            <div className={classes.Auth}> 
                <div> 
                    <h1>Авторизация</h1>
                    <form className={classes.AuthForm} onSubmit={this.onSubmitFormHandler}>
                        {this.renderInputs()}
                        <Button type="success" disabled={!this.state.isFormValid} onClick={this.onClickLoginHandler}>Войти</Button>
                        <Button type="primary" disabled={!this.state.isFormValid} onClick={this.onClickRegisterHandler} >Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}