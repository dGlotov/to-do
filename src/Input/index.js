import React, { useState } from "react";

import './style.scss';

const Input = ({
  entertTask
}) => {
  const [textInput, setTextInput] = useState('');


  const handelEnterTask = (e) => {
    if (e.code === 'Enter') {
      const trimTextInput = textInput.trim().replace(/\s+/g, " ");
      if (!trimTextInput) return setTextInput('');
      entertTask(trimTextInput)
      setTextInput('')
    }
  }

  return (
    <input
      autoFocus
      className="text-field"
      placeholder="I want to..."
      value={textInput}
      onChange={e => {setTextInput(e.target.value)}}
      onKeyUp={handelEnterTask}
    />
  )
}


export default Input;