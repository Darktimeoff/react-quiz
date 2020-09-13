import { QUIZCREATE_SUBMIT_QUIZ_SUCCESS, QUIZCREATE_SUBMIT_QUIZ_ERROR,  QUIZCREATE_ADD_QUESTION_CLICK, QUIZCREATE_CHANGE_INPUT,  QUIZCREATE_CHANGE_SELECT} from './actionTypes';
import axios from './../../axios/axios-quiz';
import { store } from './../../index';
import { validateForm, validate } from './../../form/FormLibrary';


export function onClickCreateQuizHandler() {
    return async (dispatch, getState) => {
        try {
            const state = getState().createQuiz;
            console.log(state)
            await axios.post('quizes.json', JSON.stringify(state.quiz));
            
            dispatch(submitQuizCreateSuccess())
            
        } catch(e) {
            console.error(e)
            dispatch(submitQuizCreateError(e))
        }
    }
}

export function onClickAddQuestionHandler() {
    const state = store.getState().createQuiz;
    const quiz = [...state.quiz];
    const index = quiz.length + 1;

    const {question, option1, option2, option3, option4} = state.formControls;

    const questionItem = {
        question: question.value, 
        id: index,
        rightAnswerId: state.rightAnswerId,
        answers: [
            {text: option1.value, id: option1.id},
            {text: option2.value, id: option2.id},
            {text: option3.value, id: option3.id},
            {text: option4.value, id: option4.id}
        ]
    }

    quiz.push(questionItem);


   return clickAddQuestion(quiz);
}

export function onChangeInputHandler (value, controlName) {
    const state = store.getState().createQuiz;
    const formControls = {...state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    return  changeInput(formControls, validateForm(formControls))
}

export function onChangeSelectHandler (event) {
    return {
        type: QUIZCREATE_CHANGE_SELECT,
        rightAnswerId: +event.target.value
    }
}

function submitQuizCreateSuccess() {
    return {
        type: QUIZCREATE_SUBMIT_QUIZ_SUCCESS
    }
}

function submitQuizCreateError(error) { 
    return {
        type: QUIZCREATE_SUBMIT_QUIZ_ERROR,
        error
    }
}

function changeInput(formControls, isFormValid) {
    return {
        type: QUIZCREATE_CHANGE_INPUT,
        formControls, isFormValid
    }
}

function clickAddQuestion(quiz) {
    return {
        type: QUIZCREATE_ADD_QUESTION_CLICK,
        quiz
    }
}