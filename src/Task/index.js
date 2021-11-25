import React, {useState} from "react";

import DeleteImg from "../images/delete.png";

import './style.scss';

const Task = ({
  item,
  setFlagEdit,
  deleteTask,
  chahgeCheckBox,
  flagEdit,
  changeTask,
}) => {
  const [editText, setEditText] = useState(item.name);

  return (
    <li className="task" onDoubleClick={() => setFlagEdit(item.id)}>
      <input type="checkbox"
        checked={item.isCheck}
        onChange={() => chahgeCheckBox(item)}
      />
      {flagEdit !== item.id 
        ? <p>{item.name}</p> 
        : <input 
            autoFocus
            className="edit-input"
            type='text' 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
            onKeyUp={(e) => changeTask(e, item)}
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