import React, { useContext } from "react";
import './App.css';
import TodoLists from './components/TodoLists';
import { TodoContext } from './context/ListContext';

export const App = () => {
  const { state, inputRef, handlers } = useContext(TodoContext);
  const { inputValue } = state;
  const { handleInputChange, handleAdd } = handlers;

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