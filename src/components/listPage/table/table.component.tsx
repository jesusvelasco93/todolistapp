import React from 'react';
import Table from 'react-bootstrap/Table'
import IQuestion from '../../../schemas/IQuestion';

function TableComponent(props:{data:IQuestion[], sort:string, changeSort:Function}) {
  // Generate sort icon
  function generateIconSort(): string {
    switch (props.sort){
      case 'asc': return 'oi-caret-top';
      case 'dsc': return 'oi-caret-bottom';
      default: return 'oi-caret-right';
    }
  }

  return (
      <Table bordered hover variant="dark" className="tableQuestions">
        <thead className="headerQuestions">
          <tr>
            <th className="sorteable" onClick={()=>{props.changeSort();}}>Category <span className={`oi ${generateIconSort()}`}/></th>
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
