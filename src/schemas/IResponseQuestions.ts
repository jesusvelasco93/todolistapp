import IQuestion from "./IQuestion";
/* Response of service */
export default interface IResponseQuestions {
    result:boolean,
    data: IQuestion[]
}