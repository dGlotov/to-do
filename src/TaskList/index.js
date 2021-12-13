import React from "react";

import Task from "../Task/";

import "./style.scss";

const TaskList = ({ newArrTasks, deleteTask, chahgeCheckBox, errorCatcher }) => (
  <ul className="task-list">
    {newArrTasks.map((item, index) => (
      <Task
        key={`item-${item.uuid}`}
        item={item}
        errorCatcher={errorCatcher}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
      />
    ))}
  </ul>
);

export default TaskList;
