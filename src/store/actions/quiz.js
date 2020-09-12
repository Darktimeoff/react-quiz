import axios from './../../axios/axios-quiz';
import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR, 
    FETCH_QUIZ_SUCCESS, 
    QUIZ_SET_STATE, 
    QUIZ_FINISH, 
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY_CLICK
 } from './actionTypes';

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart());
          try{
            const {data} = await axios.get('quizes.json');
    
            const quizes = []
            Object.keys(data).forEach((key, i)  => {
                quizes.push({
                    id: key,
                    name: `Test №${i + 1}`
                });
            });
            dispatch(fetchQuizesSuccess(quizes))
        } catch (err) {
            dispatch(fetchQuizesError(err)) //
            console.error(err);
        }
    }
}

export function fetchQuizeById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const {data} = await axios.get('quizes/' + quizId + '.json');
            let quiz = [];
    
            Object.keys(data).forEach(key => {
                quiz.push(data[key]);
            });
    
            dispatch(fetchQuizSuccess(quiz))
        } catch (err) {
           dispatch(fetchQuizesError(err))
        } 
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function quizFinish() {
    return {
        type: QUIZ_FINISH
    }
}

export function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}

export function onAnswerClickHandler(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if(state.answerState) {
            const key = Object.keys(state.answerState)[0]; 
            if(state.answerState[key] === 'success') {
                return;
            }
        }

        const results = state.results;
        const question = state.quiz[state.activeQuestion];

        if(answerId === question.rightAnswerId) {
           if(!results[question.id]) {
               results[question.id] = 'success'
           }

           dispatch(quizSetState({[answerId]: 'success'}, results))


            const timeout = window.setTimeout(() => {
                if(isQuizFinish(state)) {
                    dispatch(quizFinish())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

export function onRetryClickHandler() {
    return {
        type: QUIZ_RETRY_CLICK
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}



export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}

function isQuizFinish(state) {
    return state.activeQuestion + 1 === state.quiz.length
}