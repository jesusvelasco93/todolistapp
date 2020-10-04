import React from 'react';
import { Pagination } from 'react-bootstrap';
/* ENV variables */
import Enviroment from '../../../services/enviroment';
const numPageInitial = Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");

function PaginationComponent(props:{currentPage: number, moveTo: Function}) {
  // funtion to call parent with the number to view
  function moveTo(num: number) {
    props.moveTo(num);
  }
  // Generate buttons to show
  let pageButtons = [];
  for (let number = props.currentPage; number <= (props.currentPage + numPageInitial); number++) {
    pageButtons.push(
      <Pagination.Item key={number} active={number === props.currentPage} onClick={()=>{moveTo(number)}}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination className="paginationZone" size="lg">
        { props.currentPage !== 1 ? <Pagination.Prev onClick={()=>{moveTo(props.currentPage - 1)}}>{`<`}</Pagination.Prev> : null}
        { pageButtons }
        <Pagination.Next onClick={()=>{moveTo(props.currentPage + 1)}}>{`>`}</Pagination.Next>
    </Pagination>
  );
}

export default PaginationComponent;