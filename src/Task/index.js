import React, {useState} from "react";

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import DeleteImg from "../images/delete.png";

import './style.scss';

const Task = ({
  item,
  setFlagEdit,
  deleteTask,
  flagEdit,
  chahgeCheckBox
}) => {
  const [editText, setEditText] = useState(item.name);

  // функция ввода отредактированной задачи
  const textTask = (e, item) => {
    if (e.code === 'Enter') {
      const trimTextInput = editText.trim().replace(/\s+/g, " ");;
      if (!trimTextInput) {
        setEditText(item.name);
        return setFlagEdit('');
      } 
  
      item.name = trimTextInput;
      setEditText(trimTextInput);
      setFlagEdit('');
    }

    if (e.code === 'Escape') {
        setEditText(item.name);
        setFlagEdit('');
    }
  }



  return (
    <li className="task">
      <Checkbox 
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />}
        checked={item.isCheck}
        onChange={() => chahgeCheckBox(item.id)} 
        className='check'
      />

      {flagEdit !== item.id 
        ? <p className={`text ${item.isCheck && "done"}`} onDoubleClick={() => setFlagEdit(item.id)}>{item.name}</p>
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
      <p  className={`date ${item.isCheck && "done"}`}>{item.Date}</p>
      <img 
        src={DeleteImg} 
        alt="delete"
        className="img-button"
        onClick={() => deleteTask(item.id)} />
    </li> 
  )
}

export default Task;