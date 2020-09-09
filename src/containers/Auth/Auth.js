import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';

export default class Auth extends Component {
    state = {
        isValid: false,
    }
    onClickLoginHandler = () => {

    }

    onClickRegisterHandler = () => {

    }

    onSubmitFormHandler = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className={classes.Auth}> 
                <div> 
                    <h1>Авторизация</h1>
                    <form className={classes.AuthForm} onSubmit={this.onSubmitFormHandler}>
                        <input type="email" placeholder='Введите email' required/>
                        <input type="password" placeholder='Введите пароль' required/>

                        <Button type="success" disabled={this.state.isValid} onClick={this.onClickLoginHandler}>Войти</Button>
                        <Button type="primary" disabled={this.state.isValid} onClick={this.onClickRegisterHandler} >Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}