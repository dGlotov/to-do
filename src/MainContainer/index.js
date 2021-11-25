import React, { useEffect, useState } from 'react';

import TaskList from '../TaskList';
import Button from '../Button/'

import UpButtonImg from '../images/up.png'
import DownButtonImg from '../images/down.png'

import './style.scss';

const MainContainer = () => {
  if (JSON.parse(localStorage.getItem('allTasks')) === null) {
    localStorage.setItem('allTasks', JSON.stringify([]));
  }

  const [allTasks, setAllTasks] = useState(JSON.parse(localStorage.getItem('allTasks')));
  const [textInput, setTextInput] = useState('');
  const [flagFilter, setFlagFilter] = useState('All');
  const [flagSort, setFlagSort] = useState('Down');
  const [flagEdit, setFlagEdit] = useState('');
  const [newArrTasks, setNewArrTasks] = useState(allTasks);
  const date = new Date();
  
  useEffect (() => {
    let filterTasks = [];
    const _ = require('lodash');

    localStorage.setItem('allTasks', JSON.stringify(allTasks));

    if (flagFilter === 'All') filterTasks = allTasks;
    
    if (flagFilter === 'Done') filterTasks = (allTasks.filter(task => task.isCheck));
  
    if (flagFilter === 'Undone') filterTasks = (allTasks.filter(task => !task.isCheck));

    if (flagSort === 'Up') filterTasks = _.sortBy(filterTasks, 'Date');
  
    if (flagSort === 'Down') filterTasks = _.sortBy(filterTasks, 'Date').reverse();

    setNewArrTasks(filterTasks);

  }, [allTasks, flagEdit, flagFilter, flagSort]);

  const chahgeCheckBox = (item) => {
    item.isCheck = !item.isCheck;
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    setAllTasks(JSON.parse(localStorage.getItem('allTasks')));
  }
  
  const entertTask = (e) => {
    if (e.code === 'Enter') {
      const trimTextInput = textInput.trim().replace(/ /g, "");
      if (!trimTextInput) return setTextInput('');

      const task = {
        id: Math.round(Math.random() * 10000000),
        name: trimTextInput,
        isCheck: false,
        Date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}--${date.getHours()}:${date.getMinutes()}`
      };
      setAllTasks([...allTasks, task])
      setTextInput('');
    }
  }

  const changeTask = (e, item) => {
    if (e.code === 'Enter') {
      item.name = e.target.value;
      setFlagEdit('');
    }

    if (e.code === 'Escape') {
      setFlagEdit('');
    }
  }

  const deleteTask = (id) => setAllTasks(allTasks.filter(element => element.id !== id));

  return (
    <div className="main">
      <h1 className="title">
        To Do
      </h1>
      <input
        autoFocus
        className="text-field"
        placeholder="I want to..."
        value={textInput}
        onChange={e => {setTextInput(e.target.value)}}
        onKeyUp={entertTask}
         />
      <div className="nav">
        <div className="filter">
          <Button 
            nameClass="button-filter" 
            nameButton="All" 
            setFlagFilter={setFlagFilter} 
          />
          <Button
            nameClass="button-filter"
            nameButton="Done"
            setFlagFilter={setFlagFilter}
          />
          <Button
            nameClass="button-filter"
            nameButton="Undone"
            setFlagFilter={setFlagFilter}
          />
        </div>
        <div className="sort">
          <p>Sort by Date</p>
          <img
            src={UpButtonImg}
            alt="sort up"
            className="img-button"
            onClick={() => setFlagSort('Up')} />
          <img
            src={DownButtonImg}
            alt="sort down"
            className="img-button"
            onClick={() =>setFlagSort('Down')} />
        </div>
      </div>
      <TaskList
        filterTasks={newArrTasks}
        flagEdit={flagEdit}
        setFlagEdit={setFlagEdit}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
        changeTask={changeTask}
      />
    </div>
  );
}

export default MainContainer;
