import React, {useState} from "react";
import axios from "axios";

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import DeleteImg from "../images/delete.png";

import './style.scss';

const Task = ({
  item,
  deleteTask,
  chahgeCheckBox,
  setErrorMessage
}) => {
  const [editText, setEditText] = useState(item.name);
  const [flagEdit, setFlagEdit] = useState('');

  const date = new Date(Date.parse(item.createdAt)).toLocaleString();

  // функция ввода отредактированной задачи
  const textTask = async (e, item) => {
    try {
      if (e.code === 'Enter') {
        const trimTextInput = editText.trim().replace(/\s+/g, " ");;
        if (!trimTextInput) {
          setEditText(item.name);
          return setFlagEdit('');
        } 
        await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/4/${item.uuid}`, {
          name: trimTextInput,
          done: item.done
        })
        setEditText(trimTextInput);
        setFlagEdit('');
    }
    if (e.code === 'Escape') {
        setEditText(editText);
        setFlagEdit('');
    }
  }
    catch (err) {
      setErrorMessage(err.response.data.message);
    }

  }



  return (
    <li className="task">
      <Checkbox 
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />}
        checked={item.done}
        onChange={() => chahgeCheckBox(item)} 
        className='check'
      />

      {flagEdit !== item.uuid 
        ? <p className={`text ${item.done && "done"}`} onDoubleClick={() => setFlagEdit(item.uuid)}>{editText}</p>
        : <textarea 
            onBlur={() => {setFlagEdit(''); setEditText(item.name);}}
            autoFocus
            className="edit-input"
            type='text' 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
            onKeyUp={(e) => textTask(e, item)}
          />
      }
      <p  className={`date ${item.done && "done"}`}>{date}</p>
      <img 
        src={DeleteImg} 
        alt="delete"
        className="img-button"
        onClick={() => deleteTask(item.uuid)} />
    </li> 
  )
}

export default Task;