import React, { useState } from "react";

import './style.scss';

const Input = ({
  allTasks,
  setAllTasks,
  setFlagSort,
  handleFilter
}) => {
  const [textInput, setTextInput] = useState('');


  const entertTask = (e) => {
    if (e.code === 'Enter') {
      const trimTextInput = textInput.trim().replace(/\s+/g, " ");
      if (!trimTextInput) return setTextInput('');

      const task = {
        id: Math.round(Math.random() * 10000000),
        name: trimTextInput,
        isCheck: false,
        Date: new Date().toLocaleString()
      };
      setAllTasks([...allTasks, task])
      setTextInput('');

      handleFilter('All');
      setFlagSort('Down');
    }
  }

  return (
    <input
      autoFocus
      className="text-field"
      placeholder="I want to..."
      value={textInput}
      onChange={e => {setTextInput(e.target.value)}}
      onKeyUp={entertTask}
    />
  )
}


export default Input;