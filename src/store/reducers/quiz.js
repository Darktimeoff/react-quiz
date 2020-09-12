import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_ERROR, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZ_SUCCESS, 
    QUIZ_SET_STATE, 
    QUIZ_FINISH, 
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY_CLICK
} from './../actions/actionTypes';

const initialState = {
    quizes: [],
    isLoading: true,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null,
}



export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quiz: action.quiz
            }
        case QUIZ_SET_STATE: 
            return {
                ...state,
                answerState: action.answerState, 
                results: action.results
            }
        case QUIZ_FINISH: 
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION: 
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: null
            }
        case QUIZ_RETRY_CLICK: 
            return {
                ...state,
                isFinished: false,
                activeQuestion: 0,
                results: {}, 
                answerState: null
            }
        default: 
            return state
    }
}