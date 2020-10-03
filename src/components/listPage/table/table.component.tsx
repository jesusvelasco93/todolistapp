import React from 'react';
import Table from 'react-bootstrap/Table'
import IQuestion from '../../../schemas/IQuestion';

function TableComponent(props:{data:IQuestion[]}) {

  return (
      <Table bordered hover variant="dark" className="tableQuestions">
        <thead className="headerQuestions">
          <tr>
            <th>Category</th>
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
