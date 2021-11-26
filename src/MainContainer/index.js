import React, { useEffect, useState } from 'react';

import TaskList from '../TaskList';
import Button from '../Button/';
import { Pagination } from 'antd';



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
  const [newArrTasks, setNewArrTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [countItems, setCountItems] = useState(0);

  useEffect (() => {
    const _ = require('lodash');
    let filterTasks = [];

    localStorage.setItem('allTasks', JSON.stringify(allTasks));

    if (flagFilter === 'All') filterTasks = allTasks;
    
    if (flagFilter === 'Done') filterTasks = (allTasks.filter(task => task.isCheck));
  
    if (flagFilter === 'Undone') filterTasks = (allTasks.filter(task => !task.isCheck));

    if (flagSort === 'Up') filterTasks = _.sortBy(filterTasks, 'Date');
  
    if (flagSort === 'Down') filterTasks = _.sortBy(filterTasks, 'Date').reverse();


    setCountItems(filterTasks.length);

    filterTasks = filterTasks.filter((item, index) => index >= (pageNumber * 5) && index < ((pageNumber + 1) * 5));

    if (filterTasks.length === 0 && pageNumber !== 0) setPageNumber(pageNumber -1);

    setNewArrTasks(filterTasks);

  }, [allTasks, flagEdit, flagFilter, flagSort, pageNumber]);

  const entertTask = (e) => {
    if (e.code === 'Enter') {
      const trimTextInput = textInput.trim().replace(/ /g, "");
      if (!trimTextInput) return setTextInput('');

      const task = {
        id: Math.round(Math.random() * 10000000),
        name: trimTextInput,
        isCheck: false,
        Date: new Date().toLocaleString()
      };
      setAllTasks([...allTasks, task])
      setTextInput('');

      setPageNumber(0);
      setFlagFilter('All');
      setFlagSort('Down');
    }
  }

  const handlerPageNumber = (page, pageSize) => setPageNumber(page - 1);

  const handleFilter = (newFilter) => {
    setFlagFilter(newFilter)
    setPageNumber(0);
  }

  const chahgeCheckBox = (id) => {
    setAllTasks(allTasks.map(item => {
      if (item.id === id) {
        item.isCheck = !item.isCheck
      }
      return item;
    }))
  }

  const handleSort = (newSort) => {
    setFlagSort(newSort)
    setPageNumber(0);
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
            handleFilter={handleFilter} 
          />
          <Button
            nameClass="button-filter"
            nameButton="Done"
            handleFilter={handleFilter}
          />
          <Button
            nameClass="button-filter"
            nameButton="Undone"
            handleFilter={handleFilter}
          />
        </div>
        <div className="sort">
          <p>Sort by Date</p>
          <img
            src={UpButtonImg}
            alt="sort up"
            className="img-button"
            onClick={() => handleSort('Up')} />
          <img
            src={DownButtonImg}
            alt="sort down"
            className="img-button"
            onClick={() =>handleSort('Down')} />
        </div>
      </div>
      <TaskList
        newArrTasks={newArrTasks}
        flagEdit={flagEdit}
        setFlagEdit={setFlagEdit}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
      />
      <Pagination 
        className="pag"
        total={countItems}
        onChange={handlerPageNumber}
        defaultPageSize={5}
        current={pageNumber + 1}
        showSizeChanger={false} 
        hideOnSinglePage={true}
      />
    </div>
  );
}

export default MainContainer;
