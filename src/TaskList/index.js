import React from "react";

import Task from "../Task/";

import './style.scss';

const TaskList = ({
  filterTasks,
  setFlagEdit,
  deleteTask,
  chahgeCheckBox,
  flagEdit,
  changeTask,
}) => (
  <ul className="task-list">
    {filterTasks.map((item) => 
      <Task 
        key={`item-${item.id}`}
        item={item}
        setFlagEdit={setFlagEdit}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
        flagEdit={flagEdit}
        changeTask={changeTask}
      />
    )}
  </ul>
)

export default TaskList;