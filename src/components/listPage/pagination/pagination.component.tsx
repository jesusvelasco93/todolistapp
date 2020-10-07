import React from 'react';
import { Pagination } from 'react-bootstrap';
/* Services */
import Api from '../../../services/api';
/* Redux */
import { Dispatch } from "redux";
import { useDispatch, useSelector } from 'react-redux';
import { QuestionPageState } from '../../../store/type';
import { addQuestionsAndMove, changePage } from '../../../store/actions';
/* ENV variables */
import Enviroment from '../../../services/enviroment';
import IResponseQuestions from '../../../schemas/IResponseQuestions';
const numPageInitial = Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");
const numQuestionPage = Enviroment.getEnviromentVariable("REACT_APP_NUMQUESTION");

// Property to save maxLoadPage
let maxPageLoaded = numPageInitial;

function PaginationComponent() {
  const currentPage: number = useSelector((state: QuestionPageState) => state.currentPage);
  const dispatch: Dispatch<any> = useDispatch();

  /* funtion to move to other page */
  async function moveTo(page: number): Promise<void> {
    // If page is not loaded, load data and move
    if (page > maxPageLoaded) {
        const diffToLoad = page-maxPageLoaded;
        const numQuestionToLoad = numQuestionPage * diffToLoad;
        const result: IResponseQuestions = await Api.getQuestions(numQuestionToLoad);
        maxPageLoaded += diffToLoad; // Ajust num load pages
        dispatch(addQuestionsAndMove(!result.result, result.data, page));
    // If page is loaded only move
    } else {
        dispatch(changePage(page));
    }
  }

  // Generate buttons to show
  let pageButtons = [];
  for (let number = currentPage; number <= (currentPage + numPageInitial); number++) {
    pageButtons.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={()=>{moveTo(number)}}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination className="paginationZone" size="lg">
        { currentPage !== 1 ? <Pagination.Prev onClick={()=>{moveTo(currentPage - 1)}}>{`<`}</Pagination.Prev> : null}
        { pageButtons }
        <Pagination.Next onClick={()=>{moveTo(currentPage + 1)}}>{`>`}</Pagination.Next>
    </Pagination>
  );
}

export default PaginationComponent;