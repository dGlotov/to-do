import React from 'react';

import './style.scss';import './style.scss';

const Button = ({
  nameClass,
  nameButton,
  setFlagFilter
}) => (
    <button className={nameClass} onClick={() => setFlagFilter(nameButton)}>{nameButton}</button>
 )

export default Button;