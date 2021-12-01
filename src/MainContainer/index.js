import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../Input';
import FilterBy from '../FilterBy';
import SortBy from '../SortBy';
import TaskList from '../TaskList';

import { Pagination } from 'antd';

import Alert from '@mui/material/Alert';

import './style.scss';

const MainContainer = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [sortByDate, setSortByDate] = useState('Down');
  const [filterBy, setFilterBy] = useState('All');
  const [pageNumber, setPageNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [countTasks, setCountTasks] = useState(0);

  useEffect (() => {
    getTasks();
  }, [pageNumber, sortByDate, filterBy]);

  const getTasks = async () => {
    try {
      const statusFilter = filterBy === 'All'
      ? "" 
      : filterBy === 'Done'
        ? "filterBy=done" : "filterBy=undone";
          
    const statusSort = sortByDate === "Down" ? "&order=desc" : "&order=asc";
    const href = `https://todo-api-learning.herokuapp.com/v1/tasks/4?${statusFilter}${statusSort}`;

      const result = await axios.get(href)
      const arr = result.data.filter((item, index) => index >= (pageNumber * 5) && index < ((pageNumber + 1) * 5));
      setCountTasks(result.data.length);
      setAllTasks(arr);
      console.log('llllll');
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  } 

  const entertTask = async (name) => {
    try {
      await axios.post('https://todo-api-learning.herokuapp.com/v1/task/4', {
        name,
        done: false,
      })
      getTasks();
      handleFilter('All');
      setSortByDate('Down');
    }
    catch(err) {
      setErrorMessage(err.response.data.message);
    }
  }

  const handlerPageNumber = (page, pageSize) => setPageNumber(page - 1);

  const handleFilter = (newFilter) => {
    setFilterBy(newFilter)
    setPageNumber(0);
  }

  // функция изменения статуса Done Undone
  const chahgeCheckBox = async (item) => {
    try {
      await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/4/${item.uuid}`, {
        name: item.name,
        done: !item.done
      })
      getTasks();
    }
    catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }

  const handleSort = (newSort) => {
    setSortByDate(newSort)
    setPageNumber(0);
  }

  // функция удаления задач
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/4/${id}`);
      if (allTasks.length === 1 && pageNumber !== 0) setPageNumber(pageNumber -1);
      getTasks();
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
        <FilterBy 
          handleFilter={handleFilter}
          filterBy={filterBy}
        />
        <SortBy 
          handleSort={handleSort}
        />
      </div>
      <TaskList
        newArrTasks={allTasks}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Pagination 
        className="pag"
        total={countTasks}
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
