import React, { useEffect, useState } from "react";
import axios from "axios";

import Input from "../Input";
import FilterBy from "../FilterBy";
import SortBy from "../SortBy";
import TaskList from "../TaskList";

import { Pagination } from "antd";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "./style.scss";

const MainContainer = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [sortByDate, setSortByDate] = useState("Down");
  const [filterBy, setFilterBy] = useState("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [countTasks, setCountTasks] = useState(0);

  useEffect(() => {
    getTasks();
  }, [pageNumber, sortByDate, filterBy]);

  const getTasks = async () => {
    try {
      const statusFilter =
        filterBy === "All" ? "" : filterBy === "Done" ? "filterBy=done" : "filterBy=undone";

      const statusSort = sortByDate === "Down" ? "&sortBy=desc" : "&sortBy=asc";
      const href = `http://localhost:7000/tasks?${statusFilter}${statusSort}&page=${pageNumber}`;
      let result = await axios.get(href);
      setCountTasks(result.data.countTasks);
      setAllTasks(result.data.arrTasks);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const entertTask = async (name) => {
    try {
      await axios.post("http://localhost:7000/task", { name });
      getTasks();
      handleFilter("All");
      setSortByDate("Down");
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const handlerPageNumber = (page, pageSize) => setPageNumber(page);

  const handleFilter = (newFilter) => {
    setFilterBy(newFilter);
    setPageNumber(1);
  };

  // функция изменения статуса Done Undone
  const chahgeCheckBox = async (item) => {
    try {
      await axios.patch(`http://localhost:7000/task/${item.uuid}`, {
        done: !item.done,
      });
      getTasks();
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const handleSort = (newSort) => {
    setSortByDate(newSort);
    setPageNumber(1);
  };

  // функция удаления задач
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/task/${id}`);
      if (allTasks.length === 1 && pageNumber !== 1) setPageNumber(pageNumber - 1);
      getTasks();
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="main">
      <h1 className="title">To Do</h1>
      <Input entertTask={entertTask} />
      <div className="nav">
        <FilterBy handleFilter={handleFilter} filterBy={filterBy} />
        <SortBy handleSort={handleSort} />
      </div>
      <TaskList
        setErrorMessage={setErrorMessage}
        newArrTasks={allTasks}
        deleteTask={deleteTask}
        chahgeCheckBox={chahgeCheckBox}
      />
      <Pagination
        className="pag"
        total={countTasks}
        onChange={handlerPageNumber}
        defaultPageSize={5}
        current={pageNumber}
        showSizeChanger={false}
        hideOnSinglePage={true}
      />
      <Snackbar
        open={errorMessage ? true : false}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        autoHideDuration={2000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default MainContainer;
