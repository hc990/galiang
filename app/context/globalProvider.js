"use client";

import React, { createContext, useState, useContext } from "react";
// import themes from "./themes";
import axios from "axios";
// import toast from "react-hot-toast";
import siteMetadata from '@/data/siteMetadata'
import { useUser } from "@clerk/nextjs";
import { MdSignalCellularNull } from "react-icons/md";  

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  // const { user } = useUser();
  // const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(true)
  // const [menuShow, setMenuShow] = useState(true)

  // const theme = themes[selectedTheme];
  // setShow((v)=> !v)
  const changeShow = () =>{ 
    setShow(!show)
  }
  // const changeMenuShow = () =>{
  //   setMenuShow(false)
  // }
  
  // const openModal = () => {
  //   setModal(true);
  // };

  // const closeModal = () => {
  //   setModal(false);
  // };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };
 
  const allBooks = async () => {
    setIsLoading(true);
    try {  
      const params = {  
        id: null
      };  
      const res = await axios.get("/api/blog",{ params });
      setBooks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteTask = async (id) => {
  //   try {
  //     const res = await axios.delete(`/api/tasks/${id}`);
  //     toast.success("Task deleted");

  //     allTasks();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  // const updateTask = async (task) => {
  //   try {
  //     const res = await axios.put(`/api/tasks`, task);

  //     toast.success("Task updated");

  //     allTasks();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  // const completedTasks = tasks.filter((task) => task.isCompleted === true);
  // const importantTasks = tasks.filter((task) => task.isImportant === true);
  // const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  // React.useEffect(() => {
  //   if (user) allTasks();
  // }, [user]);

  React.useEffect(() => {
      allBooks();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        // theme,
        // tasks,
        books,
        // deleteTask,
        isLoading,
        // completedTasks,
        // importantTasks,
        // incompleteTasks,
        // updateTask,
        // modal,
        // openModal,
        // closeModal,
        // allTasks,
        allBooks,
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