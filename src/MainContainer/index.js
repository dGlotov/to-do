import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

  const navigate = useNavigate();
  useEffect(() => {
    getTasks();
  }, [pageNumber, sortByDate, filterBy]);

  const errorCatcher = (err) => {
    if (err.response.data.includes("jwt")) navigate("/login");
    setErrorMessage(err.response.data);
  };

  const getTasks = async () => {
    try {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      }
      const statusFilter =
        filterBy === "All" ? "" : filterBy === "Done" ? "filterBy=done" : "filterBy=undone";

      const statusSort = sortByDate === "Down" ? "&sortBy=desc" : "&sortBy=asc";
      const href = `http://localhost:7000/tasks?${statusFilter}${statusSort}&page=${pageNumber}`;
      const accessToken = localStorage.getItem("token");
      const result = await axios.get(href, {
        headers: {
          Authorization: `${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      setCountTasks(result.data.countTasks);
      setAllTasks(result.data.tasks);
      setErrorMessage("");
    } catch (err) {
      errorCatcher(err);
    }
  };

  const entertTask = async (name) => {
    try {
      const accessToken = localStorage.getItem("token");
      await axios.post(
        `http://localhost:7000/task/`,
        { name },
        {
          headers: {
            Authorization: `${accessToken}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      getTasks();
      handleFilter("All");
      setSortByDate("Down");
    } catch (err) {
      errorCatcher(err);
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
      const accessToken = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:7000/task/${item.uuid}`,
        {
          done: !item.done,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      getTasks();
    } catch (err) {
      errorCatcher(err);
    }
  };

  const handleSort = (newSort) => {
    setSortByDate(newSort);
    setPageNumber(1);
  };

  // функция удаления задач
  const deleteTask = async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      await axios.delete(`http://localhost:7000/task/${id}`, {
        headers: {
          Authorization: `${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      if (allTasks.length === 1 && pageNumber !== 1) setPageNumber(pageNumber - 1);
      getTasks();
    } catch (err) {
      errorCatcher(err);
    }
  };

  return (
    <>
      {localStorage.getItem("token") && (
        <div className="main">
          <h1 className="title">To Do</h1>
          <Input entertTask={entertTask} />
          <div className="nav">
            <FilterBy handleFilter={handleFilter} filterBy={filterBy} />
            <SortBy handleSort={handleSort} />
          </div>
          <TaskList
            errorCatcher={errorCatcher}
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
      )}
    </>
  );
};

export default MainContainer;
