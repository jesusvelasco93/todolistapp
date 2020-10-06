import { QuestionPageAction, QuestionPageState } from "./type";
import { SET_INITIAL_CHARGE, ADD_QUESTIONS, CHANGE_SORT, CHANGE_PAGE } from "./actionTypes";

import IQuestion from "../schemas/IQuestion";
import Utils from "../services/utils";

const initialState: QuestionPageState = {
    sort: 'none',
    currentPage: 1,
    error: false,
    loading: true,
    questions: [] as IQuestion[],
    questionsSorted: [] as IQuestion[]
}

const questionsPageReducer = (state: QuestionPageState = initialState, action: QuestionPageAction): QuestionPageState => {
    console.log(action.type);
    switch (action.type) {
        case SET_INITIAL_CHARGE: {
            return {...state, 
                loading: false,
                error: action.payload.error,
                questions: state.questions.concat(action.payload.newQuestions), 
                questionsSorted: state.questions.concat(action.payload.newQuestions) 
            };
        }
        case ADD_QUESTIONS: {
            const newQuestions = state.questions.concat(action.payload.newQuestions);
            const questionsSorted = (state.sort !== "none") ? Utils.sortObjects(newQuestions, "category", state.sort) : newQuestions;
            return {...state, 
                loading: false,
                error: action.payload.error,
                currentPage: action.payload.numPage,
                questions: newQuestions,
                questionsSorted: questionsSorted
            };
        }
        case CHANGE_SORT: {
            const sortOrder = action.payload;
            const questionsSorted = (sortOrder !== "none") ? Utils.sortObjects([...state.questions], "category", sortOrder) : state.questions;
            return { ...state, sort: sortOrder, questionsSorted: questionsSorted };
        }
        case CHANGE_PAGE: {
            console.log(action.payload);
            return { ...state, currentPage: action.payload };
        }
        default: return state;
    }
}
  
export default questionsPageReducer;