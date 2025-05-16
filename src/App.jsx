import React, { useEffect, useContext, useRef } from "react";
import './App.css';
import TodoLists from './components/TodoLists';
import { TodoContext } from './context/TodoContext';

export const App = () => {
  const { state, handlers } = useContext(TodoContext);
  const { inputValue } = state;
  const { handleInputChange, handleAdd } = handlers;
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


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