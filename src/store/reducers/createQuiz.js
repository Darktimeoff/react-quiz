import {createControl} from './../../form/FormLibrary';
import {QUIZCREATE_SUBMIT_QUIZ_SUCCESS, QUIZCREATE_SUBMIT_QUIZ_ERROR, QUIZCREATE_ADD_QUESTION_CLICK, QUIZCREATE_CHANGE_INPUT, QUIZCREATE_CHANGE_SELECT}from './../actions/actionTypes';

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true});
}

function initFormControl() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Введите не может быть пустым',     
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

const initialState = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    error: null,
    formControls: initFormControl()
}

export default function createQuizReducer(state = initialState, action) {
    switch (action.type) {
        case QUIZCREATE_SUBMIT_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: initFormControl()
            }
        case QUIZCREATE_SUBMIT_QUIZ_ERROR: 
            return {
                ...state,
                error: action.error,
            }
        case QUIZCREATE_ADD_QUESTION_CLICK: 
            return {
                ...state,
                quiz: action.quiz,
                isFormValid: false,
                rightAnswerId: 1,
                formControls: initFormControl()
            }
        case QUIZCREATE_CHANGE_INPUT: 
            return {
                ...state,
                formControls: action.formControls,
                isFormValid: action.isFormValid
            }
        case QUIZCREATE_CHANGE_SELECT: 
            return {
                ...state,
                rightAnswerId: action.rightAnswerId
            }
        default:
            return state;
    }
}