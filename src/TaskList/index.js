import React from "react";

import Task from "../Task/";

import './style.scss';

const TaskList = ({
  newArrTasks,
  deleteTask,
  chahgeCheckBox,
  setErrorMessage
}) => (
  <ul className="task-list">
    {newArrTasks.map((item, index) => 
      <Task 
        key={`item-${item.uuid}`}
        item={item}
        setErrorMessage={setErrorMessage}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
      />
    )}
  </ul>
)

export default TaskList;