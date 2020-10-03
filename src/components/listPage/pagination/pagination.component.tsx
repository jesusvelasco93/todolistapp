import React from 'react';
import { Pagination } from 'react-bootstrap';

import Enviroment from '../../../services/enviroment';

const numPageInitial = Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");

function PaginationComponent(props:{currentPage: number, moveTo: Function}) {
  function moveTo(num: number) {
    props.moveTo(num);
  }

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
        { props.currentPage !== 1 ? <Pagination.Prev onClick={()=>{moveTo(props.currentPage - 1)}}/> : null}
        { pageButtons }
        <Pagination.Next onClick={()=>{moveTo(props.currentPage + 1)}}/>
    </Pagination>
  );
}

export default PaginationComponent;