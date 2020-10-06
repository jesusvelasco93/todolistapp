import React from 'react';
import Table from 'react-bootstrap/Table'
import IQuestion from '../../../schemas/IQuestion';
/* Redux */
import { Dispatch } from "redux";
import { useDispatch, useSelector } from 'react-redux';
import { changeSort } from '../../../store/actions';
import { QuestionPageState } from '../../../store/type';

function TableComponent(props:{data:IQuestion[]}) {
  // const data: readonly IQuestion[] = useSelector((state: QuestionPageState) => state.questions);
  const sort: string = useSelector((state: QuestionPageState) => state.sort);
  const dispatch: Dispatch<any> = useDispatch();

  /* Change sort */
  function rotateSort() {
    const toSort = sort === "none" ? "dsc" : (sort === "dsc" ? "asc" : "none");
    dispatch(changeSort(toSort));
  }
  // Generate sort icon
  function generateIconSort(): string {
    switch (sort){
      case 'asc': return 'oi-caret-top';
      case 'dsc': return 'oi-caret-bottom';
      default: return 'oi-caret-right';
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
          { props.data.map((question, index) =>
            <tr key={index}>
              <td>{decodeURIComponent(question.category)}</td>
              <td>{decodeURIComponent(question.type)}</td>
              <td>{decodeURIComponent(question.difficulty)}</td>
              <td>{decodeURIComponent(question.question)}</td>
            </tr>
          ) }
        </tbody>
      </Table>
  );
}

export default TableComponent;
