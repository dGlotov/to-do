import React, { useEffect, useState } from 'react';

import Input from '../Input/';
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
  const [flagFilter, setFlagFilter] = useState('All');
  const [flagSort, setFlagSort] = useState('Down');
  const [flagEdit, setFlagEdit] = useState('');
  const [newArrTasks, setNewArrTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [countItems, setCountItems] = useState(0);

  useEffect (() => {
    let filterTasks = [...allTasks];

    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    
    // фильтрация массива по выполненным задачам
    if (flagFilter === 'Done') filterTasks = (filterTasks.filter(task => task.isCheck));
  
    // фильтрация массива по невыполненным задачам
    if (flagFilter === 'Undone') filterTasks = (filterTasks.filter(task => !task.isCheck));
    
    // сортировка массива от новых элементом к более старым
    if (flagSort === 'Down') filterTasks = filterTasks.reverse();

    // подсчет элементов на странице
    setCountItems(filterTasks.length);

    // настройка отображения задач на странице
    filterTasks = filterTasks.filter((item, index) => index >= (pageNumber * 5) && index < ((pageNumber + 1) * 5));

    // проверка ну пустую страницу
    if (filterTasks.length === 0 && pageNumber !== 0) setPageNumber(pageNumber -1);

    setNewArrTasks(filterTasks);

  }, [allTasks, flagEdit, flagFilter, flagSort, pageNumber]);

  const handlerPageNumber = (page, pageSize) => setPageNumber(page - 1);

  const handleFilter = (newFilter) => {
    setFlagFilter(newFilter)
    setPageNumber(0);
  }

  // функция изменения статуса Done Undone
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

  // функция удаления задач
  const deleteTask = (id) => setAllTasks(allTasks.filter(element => element.id !== id));

  return (
    <div className="main">
      <h1 className="title">
        To Do
      </h1>
      <Input
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        setFlagSort={setFlagSort}
        handleFilter={handleFilter}
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
