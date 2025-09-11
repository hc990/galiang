'use client';
import React, { createContext, useState, useContext } from 'react';
import axiosInstance from "../axios/axios";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [books, setBooks] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [booksNum, setBooksnum] = useState(0);
  const [show, setShow] = useState(true);
  const changeShow = () => {
    setShow(!show)
  }

  // useEffect(() => {
  //   const fetchName = async () => {
  //     try {
  //       const commodityName = await getCommtype(id);
  //       setName(commodityName);
  //     } catch (err) {
  //       console.error('Failed to fetch commodity name:', err);
  //     }
  //   };
  //   fetchName();
  // }, [id, getCommtype]);

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allBooks = async () => {
    setIsLoading(true);
    try {
      const params = {
        id: null,
        limit: 18
      };
      await axiosInstance.get("/api/blog", { params }).then(function (response) {
        setBooks(response.data);
        setBooksnum(response.data.length)
        setIsLoading(false);
      }).catch(function (error) {
        console.log(error);
      });;

    } catch (error) {
      console.log(error);
    }
  };

  const allAccounts = async () => {
    setIsLoading(true);
    try {
      const params = {
        id: null
      };
      await axiosInstance.get("/api/account", { params }).then(function (response) {
        setAccounts(response.data);
        setIsLoading(false);
      }).catch(function (error) {
        console.log(error);
      });;
    } catch (error) {
      console.log(error);
    }
  };

  const allCommodities = async () => {
    setIsLoading(true);
    try {
      const params = {
        id: null
      };
      await axiosInstance.get("/api/commodity", { params }).then(function (response) {
        setCommodities(response.data);
        setIsLoading(false);
      }).catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    allBooks();
    allAccounts();
    allCommodities();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        // theme,
        // tasks,
        books,
        booksNum,
        accounts,
        // deleteTask,
        isLoading,
        // axiosInstant,
        // completedTasks,
        // importantTasks,
        // incompleteTasks,
        // updateTask,
        // modal,
        // openModal,
        // closeModal,
        // allTasks,
        setAccounts,
        setBooks,
        commodities,
        setCommodities,
        // allBooks,
        // allAccounts,
        collapsed,
        collapseMenu,
        show,
        changeShow,
        // menuShow,
        // changeMenuShow
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
