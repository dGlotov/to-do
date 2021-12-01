import React from "react";

import UpButtonImg from '../images/up.png'
import DownButtonImg from '../images/down.png'

const SortBy = ({ handleSort} ) => (
  <div className="sort">
    <p>Sort by Date</p>
    <img
      src={UpButtonImg}
      alt="sort up"
      className="img-button"
      onClick={() => handleSort('Up')} />
    <img
      src={DownButtonImg}
      alt="sort down"
      className="img-button"
      onClick={() =>handleSort('Down')} />
  </div>
)

export default SortBy;