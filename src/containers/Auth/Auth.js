import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { onClickLoginHandler,  onClickRegisterHandler, onChangeInputHandler} from './../../store/actions/auth';


class Auth extends Component {
    onSubmitFormHandler = (event) => {
        event.preventDefault();
    }

    renderInputs() {
        return Object.keys(this.props.formControls).map((controlName, i) => {
            const control = this.props.formControls[controlName];
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
                    onChange={event => this.props.onChangeInputHandler(event, controlName)}
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
                        <Button type="success" disabled={!this.props.isFormValid} onClick={this.props.onClickLoginHandler}>Войти</Button>
                        <Button type="primary" disabled={!this.props.isFormValid} onClick={this.props.onClickRegisterHandler} >Зарегистрироваться</Button>
                        {this.props.error ? <span>Пароль или email не верный</span> : null}
                        {this.props.signIn ? <span>Вы успешно авторизовались</span> : null}
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isFormValid: state.auth.isFormValid,
        formControls: state.auth.formControls, 
        signIn: state.auth.signIn,
        error: state.auth.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickLoginHandler: () => dispatch(onClickLoginHandler()),
        onClickRegisterHandler: () => dispatch(onClickRegisterHandler()),
        onChangeInputHandler: (event, controlName) => dispatch(onChangeInputHandler(event, controlName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)