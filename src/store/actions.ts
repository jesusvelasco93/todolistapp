import IQuestion from "../schemas/IQuestion";
import { SET_INITIAL_CHARGE, ADD_QUESTIONS, CHANGE_SORT, CHANGE_PAGE } from "./actionTypes";

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
    // console.log("OK", CHANGE_PAGE);
    return  {
        type: CHANGE_PAGE,
        payload: numPage 
    }
}
// interface AddQuestionsAction {
//     type: typeof ADD_QUESTIONS
//     payload: IQuestion[]
// }

// interface ChangeSortAction {
//     type: typeof CHANGE_SORT
//     payload: string
// }

// interface ChangePageAction {
//     type: typeof CHANGE_PAGE
//     payload: number
// }
  
// export type ActionTypes = AddQuestionsAction | ChangeSortAction | ChangePageAction;