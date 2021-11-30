import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../Input/';
import TaskList from '../TaskList';
import Button from '../Button/';

import { Pagination } from 'antd';

import Alert from '@mui/material/Alert';

import UpButtonImg from '../images/up.png'
import DownButtonImg from '../images/down.png'

import './style.scss';

const MainContainer = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [flagFilter, setFlagFilter] = useState('All');
  const [flagSort, setFlagSort] = useState('Down');
  const [pageNumber, setPageNumber] = useState(0);
  const [countItems, setCountItems] = useState(0);
  const [getTask, setGetTask] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect (() => {
    const statusFilter =flagFilter === 'All'
      ? "" 
      : flagFilter === 'Done'
        ? "filterBy=done" : "filterBy=undone";
          
    const statusSort = flagSort === "Down" ? "&order=desc" : "&order=asc";
    const href = `https://todo-api-learning.herokuapp.com/v1/tasks/4?${statusFilter}${statusSort}`;

    axios.get(href).then(res => {
      const arr = res.data.filter((item, index) => index >= (pageNumber * 5) && index < ((pageNumber + 1) * 5));
      setCountItems(res.data.length);
      setAllTasks(arr);
      setErrorMessage('');
    }).catch(err => setErrorMessage(err.response.data.message));
  }, [pageNumber, flagSort, flagFilter, getTask]);

  
  const entertTask = async (name) => {
    try {
      await axios.post('https://todo-api-learning.herokuapp.com/v1/task/4', {
        name,
        done: false,
      })
      handleFilter('All');
      setFlagSort('Down');
      setGetTask(!getTask);
    }
    catch(err) {
      setErrorMessage(err.response.data.message);
    }
  }

  const handlerPageNumber = (page, pageSize) => setPageNumber(page - 1);

  const handleFilter = (newFilter) => {
    setFlagFilter(newFilter)
    setPageNumber(0);
  }

  // функция изменения статуса Done Undone
  const chahgeCheckBox = async (item) => {
    try {
      await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/4/${item.uuid}`, {
        name: item.name,
        done: !item.done
      })
      setGetTask(!getTask);
    }
    catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }

  const handleSort = (newSort) => {
    setFlagSort(newSort)
    setPageNumber(0);
  }

  // функция удаления задач
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/4/${id}`);
      if (allTasks.length === 1 && pageNumber !== 0) setPageNumber(pageNumber -1);
      setGetTask(!getTask);
    }
    catch(err) {
      setErrorMessage(err.response.data.message);
    }
  }

  return (
    <div className="main">
      <h1 className="title">
        To Do
      </h1>
      <Input
        entertTask={entertTask}
      />
      <div className="nav">
        <div className="filter">
          <Button 
            nameClass={`button-filter ${(flagFilter === "All") && "active"}`} 
            nameButton="All" 
            handleFilter={handleFilter} 
          />
          <Button
            nameClass={`button-filter ${(flagFilter === "Done") && "active"}`}
            nameButton="Done"
            handleFilter={handleFilter}
          />
          <Button
            nameClass={`button-filter ${(flagFilter === "Undone") && "active"}`}
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
        newArrTasks={allTasks}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
