import React from 'react';
import Table from 'react-bootstrap/Table'
import IQuestion from '../../../schemas/IQuestion';
import TDWithToastComponent from './tdwithtoast.component';
/* Redux */
import { Dispatch } from "redux";
import { useDispatch, useSelector } from 'react-redux';
import { changeSort } from '../../../store/actions';
import { QuestionPageState } from '../../../store/type';
/* ENV variables */
import Enviroment from './../../../services/enviroment';
const numQuestionPage = Enviroment.getEnviromentVariable("REACT_APP_NUMQUESTION");

function TableComponent() {
  /* Redux */
  const questionsSorted: IQuestion[] = useSelector((state: QuestionPageState) => state.questionsSorted);
  const currentPage: number = useSelector((state: QuestionPageState) => state.currentPage);
  const sort: string = useSelector((state: QuestionPageState) => state.sort);
  const dispatch: Dispatch<any> = useDispatch();

  /* Change sort */
  function rotateSort() {
    const toSort = sort === "none" ? "dsc" : (sort === "dsc" ? "asc" : "none");
    dispatch(changeSort(toSort));
  }
  

  /* funtion to filter questions in view */
  function generateQuestionInView(): IQuestion[] {
    let questionsInView: IQuestion[] = [];
    try {
        if (currentPage > 0) {
            const firstQuestion = (currentPage-1) * numQuestionPage;
            // const lastQuestion = listPageState.currentPage * numQuestionPage;
            const auxQuestions = [...questionsSorted];
            console.log(auxQuestions);
            // questionsInView = auxQuestions.length > numQuestionPage ? auxQuestions.splice(firstQuestion, numQuestionPage) : [];
            questionsInView = auxQuestions.splice(firstQuestion, numQuestionPage) || [];
        }
    } catch (err) {
        console.error("An error happend while the questions were paginating");
    } finally {
        return questionsInView;
    }
  }
  /* Generate sort icon */
  function generateIconSort(): string {
    switch (sort){
      case 'asc': return 'oi-caret-top';
      case 'dsc': return 'oi-caret-bottom';
      default: return 'oi-caret-right';
    }
  }

  function generateTBody() {
    const questionsInView = generateQuestionInView();
    if (questionsInView.length > 0 ) {
      return questionsInView.map((question, index) =>
        <tr key={index}>
          <td>{decodeURIComponent(question.category)}</td>
          <td>{decodeURIComponent(question.type)}</td>
          <td>{decodeURIComponent(question.difficulty)}</td>
          <TDWithToastComponent text={decodeURIComponent(question.question)} question={question}/>
        </tr>
      );
    } else {
      return (<tr className="noData"><td colSpan={4}>Ohhhhh nooooo! We cant find any questions with in this search!</td></tr>);
    }
  }

  return (
      <Table bordered hover variant="dark" className="tableQuestions">
        <thead className="headerQuestions">
          <tr>
            <th className="sorteable" onClick={()=>{rotateSort()}}>Category <span className={`oi ${generateIconSort()}`}/></th>
            <th>Type</th>
            <th>Difficulty</th>
            <th>Question / Statement</th>
          </tr>
        </thead>
        <tbody className="bodyQuestions">
          { generateTBody() }
        </tbody>
      </Table>
  );
}

export default TableComponent;
