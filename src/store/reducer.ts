import { QuestionPageAction, QuestionPageState } from "./type";
import { SET_INITIAL_CHARGE, ADD_QUESTIONS, CHANGE_SORT, CHANGE_PAGE, CHANGE_SEARCH } from "./actionTypes";

import IQuestion from "../schemas/IQuestion";
import Utils from "../services/utils";

const initialState: QuestionPageState = {
    sort: 'none',
    textSearch: '',
    currentPage: 1,
    error: false,
    loading: true,
    questions: [] as IQuestion[],
    questionsSorted: [] as IQuestion[]
}

const questionsPageReducer = (state: QuestionPageState = initialState, action: QuestionPageAction): QuestionPageState => {
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
            const showQuestions = generateSortFilterQuestions([...newQuestions], state.sort, state.textSearch);
            return {...state, 
                loading: false,
                error: action.payload.error,
                currentPage: action.payload.numPage,
                questions: newQuestions,
                questionsSorted: showQuestions
            };
        }
        case CHANGE_SORT: {
            const sortOrder = action.payload;
            const showQuestions = generateSortFilterQuestions([...state.questions], sortOrder, state.textSearch);
            return { ...state, sort: sortOrder, questionsSorted: showQuestions };
        }
        case CHANGE_SEARCH: {
            const textSearch = action.payload;
            const showQuestions = generateSortFilterQuestions([...state.questions], state.sort, textSearch);
            return { ...state, textSearch: textSearch, currentPage: 1, questionsSorted: showQuestions }
        }
        case CHANGE_PAGE: {
            return { ...state, currentPage: action.payload };
        }
        default: return state;
    }
}
  
const generateSortFilterQuestions = (questions: IQuestion[], sort: string, textSearch: string) =>{
    const questionsFilter = (textSearch !== "") ? Utils.filterObjects(questions, "question", textSearch) : questions;
    const questionsSorted = (sort !== "none") ? Utils.sortObjects(questionsFilter, "category", sort) : questionsFilter;
    return questionsSorted;
}

export default questionsPageReducer;