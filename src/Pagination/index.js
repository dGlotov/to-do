import React from "react";


import './style.scss'

const Paginations = ({countItems, handlerPageNumber, pageNumber}) => (
    <ul className="pagination">
      <li className='pageNumber'>
        <button onClick={() => setPageNumber(pagesAll[0])}>{pagesAll[0] + 1}...</button>
      </li>
      {pagesAll.map(page => (
        <li 
          className='pageNumber' 
          style= {{display: (Math.abs(page - pageNumber) > 1) && "none"}} 
          onClick={() => setPageNumber(page)}
        >
          {page + 1}
        </li>
      ))}
      <li className='pageNumber'>
        <button onClick={() => setPageNumber(pagesAll.length - 1)}>...{pagesAll.length}</button>
      </li>
    </ul>
  )

export default Paginations;