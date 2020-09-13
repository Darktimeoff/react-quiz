import { FETCH_QUIZES_ERROR, AUTH_LOGIN_CLICK, AUTH_SIGNUP_CLICK, AUTH_CHANGE_INPUT} from './../actions/actionTypes';
function initFormControl() {
    return {
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

const initialState = {
    isFormValid: false,
    error: null,
    signIn: null,
    signUp: null,
    formControls: initFormControl()
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_CLICK:
            return {
                ...state,
                signIn: action.data,
                isFormValid: false,
                error: null,
                formControls: initFormControl()
            }
        case AUTH_SIGNUP_CLICK: 
            return {
                ...state,
                signUp: action.data,
                isFormValid: false,
                error: null,
                formControls: initFormControl()
            }
        case AUTH_CHANGE_INPUT: 
            return {
                ...state,
                isFormValid: action.isFormValid,
                formControls: action.formControls
            }
        case FETCH_QUIZES_ERROR: 
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}