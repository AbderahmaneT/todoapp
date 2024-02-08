import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      return;
    }
    if (tasks.includes(inputValue)) {
      setAlertMessage("Task already exists!");
      setInputValue("");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return;
    }

    setTasks([...tasks, inputValue]);
    setInputValue("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-purple-900 text-white">
      <h1 className="font-serif text-4xl font-extrabold mb-6">TodoApp!</h1>
      <div className="w-80 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your toxic task..."
          className="w-full border-b-2 py-2 px-3 bg-transparent border-purple-300 focus:outline-none focus:border-purple-500 text-white"
        />
      </div>
      <button
        onClick={handleAddTask}
        className="bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 mb-4"
      >
        Add Toxic Task
      </button>
      <CSSTransition
        in={alertMessage !== ""}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">
          {alertMessage}
        </div>
      </CSSTransition>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b border-purple-300">
            <span className="px-8">{task}</span>
            <button
              onClick={() => handleDeleteTask(index)}
              className="text-red-400 hover:text-red-600 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
