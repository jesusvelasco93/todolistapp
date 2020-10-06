import IQuestion from "../schemas/IQuestion";

type QuestionPageState = {
    sort: string,
    currentPage: number,
    error: boolean,
    loading: boolean,
    questions: IQuestion[],
    questionsSorted: IQuestion[]
}

type QuestionPageAction = {
    type: string
    payload: any
}
  
// type DispatchType = (args: QuestionPageAction) => QuestionPageAction