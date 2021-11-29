import React from 'react';

import './style.scss';import './style.scss';

const Button = ({
  nameClass,
  nameButton,
  handleFilter
}) => (
    <button className={nameClass} onClick={() => handleFilter(nameButton)}>{nameButton}</button>
 )

export default Button;