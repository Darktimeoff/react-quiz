import {FETCH_QUIZES_ERROR, AUTH_LOGIN_CLICK, AUTH_SIGNUP_CLICK, AUTH_CHANGE_INPUT} from './actionTypes';
import axios from './../../axios/axios-quiz';
import { store } from './../../index';

export function onClickLoginHandler() {
    return async (dispatch, getState) => {
        const state = getState().auth;
        const API_KEY = "AIzaSyCSzer3p8FxV722uRTlFfqiG79a6GxG-2k";

        let {email, password} = state.formControls;
    
        const authData = {
            email: email.value, 
            password: password.value, 
            returnSecureToken: true
        }
        console.log(authData)
    
        try {
            const response  = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData);
            console.log(response.data);
            dispatch(authLoginClick(response.data));
        } catch (err) {
            dispatch(fetchError(err));
        }
    }
}

export function onClickRegisterHandler() {
    return async (dispatch, getState) => {
        const state = getState().auth;
        const API_KEY = "AIzaSyCSzer3p8FxV722uRTlFfqiG79a6GxG-2k";

        let {email, password} = state.formControls;

        const authData = {
            email: email.value, 
            password: password.value, 
            returnSecureToken: true
        }

        try {
            const response  = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData);
            console.log(response.data);
            dispatch(authSignUpClick(response.data))
        } catch (err) {
            dispatch(fetchError(err));
        }
    }
}

export function onChangeInputHandler (event, controlName) {
    const state = store.getState().auth;
    const formControls = {...state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid;
    });


    return authChangeInput(formControls, isFormValid);
}

function validateControl(value, validation) {
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

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function fetchError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}

function authLoginClick(data) {
    return {
        type: AUTH_LOGIN_CLICK,
        data
    }
}

function authChangeInput(formControls, isFormValid) {
    return {
        type: AUTH_CHANGE_INPUT,
        formControls, isFormValid
    }
}

function authSignUpClick(data) {
    return {
        type: AUTH_SIGNUP_CLICK,
        data
    }
}
