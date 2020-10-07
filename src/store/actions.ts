import IQuestion from "../schemas/IQuestion";
import { SET_INITIAL_CHARGE, ADD_QUESTIONS, CHANGE_SORT, CHANGE_PAGE, CHANGE_SEARCH } from "./actionTypes";

export function setInitialCharge(error: boolean, newQuestions:IQuestion[]) {
    return  {
        type: SET_INITIAL_CHARGE,
        payload: { newQuestions, error }
    }
}
export function addQuestionsAndMove(error: boolean, newQuestions:IQuestion[], numPage: number) {
    return  {
        type: ADD_QUESTIONS,
        payload: { newQuestions, error, numPage }
    }
}
export function changeSort(sort:string) {
    return  {
        type: CHANGE_SORT,
        payload: sort
    }
}
export function changePage(numPage:number) {
    return  {
        type: CHANGE_PAGE,
        payload: numPage 
    }
}
export function changeSearch(textSearch:string) {
    return  {
        type: CHANGE_SEARCH,
        payload: textSearch 
    }
}