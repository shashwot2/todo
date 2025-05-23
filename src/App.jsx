import React, { useEffect, useContext, useRef } from "react";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchInitTodoData, setInputValue } from "./slice/todoslice"
import TodoLists from "./components/TodoLists";
export const App = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { inputValue } = useSelector(state => state.todo);
  useEffect(() => {
    dispatch(fetchInitTodoData())
  }, [dispatch])
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    dispatch(setInputValue(e.target.value))
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      text: inputValue,
      completed: false
    };

    dispatch(addTodoAsync(newTodo));
  };

  return (
    <div className="container">
      <div className="input-container">
        <div id="inputPlace" className="input-form">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new todo"
            className="input-field"
          />
          <button
            onClick={handleAdd}
            className="submit-button"
          >
            submit
          </button>
        </div>
      </div>

      <TodoLists />
    </div>
  );
};

export default App;