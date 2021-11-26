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

  const textTask = (e, item) => {
    if (e.code === 'Enter') {
      const trimTextInput = editText.trim().replace(/ /g, "");
      if (!trimTextInput) {
        setEditText(item.name);
        return setFlagEdit('');
      } 
  
      item.name = trimTextInput;
      setEditText(trimTextInput);
      setFlagEdit('');
    }

    if (e.code === 'Escape') {
      setFlagEdit('');
    }
  }



  return (
    <li className="task" onDoubleClick={() => setFlagEdit(item.id)}>
      <Checkbox 
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />}
        checked={item.isCheck}
        onChange={() => chahgeCheckBox(item.id)} 
        className='check'
      />

      {flagEdit !== item.id 
        ? <p>{item.name}</p> 
        : <input 
            autoFocus
            className="edit-input"
            type='text' 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
            onKeyUp={(e) => textTask(e, item)}
          />
      }
      <p>{item.Date}</p>
      <img 
        src={DeleteImg} 
        alt="delete"
        className="img-button"
        onClick={() => deleteTask(item.id)} />
    </li> 
  )
}

export default Task;