import { FETCH_QUIZES_START, FETCH_QUIZES_ERROR, FETCH_QUIZES_SUCCESS} from './../actions/actionTypes';

const initialState = {
    quizes: [],
    isLoading: true,
    error: null
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
        default: 
            return state
    }
}