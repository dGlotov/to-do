import React from "react";

import Task from "../Task/";

import './style.scss';

const TaskList = ({
  newArrTasks,
  setFlagEdit,
  deleteTask,
  flagEdit,
  chahgeCheckBox
}) => (
  <ul className="task-list">
    {newArrTasks.map((item, index) => 
      <Task 
        key={`item-${item.uuid}`}
        item={item}
        setFlagEdit={setFlagEdit}
        deleteTask={deleteTask}
        flagEdit={flagEdit}
        chahgeCheckBox={chahgeCheckBox}
      />
    )}
  </ul>
)

export default TaskList;