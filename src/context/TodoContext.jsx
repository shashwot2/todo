import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { API } from "../api/api.js";
import { todoReducer } from "../reducer/TodoReducer";

export const TodoContext = createContext();

const initialState = {
    inputValue: '',
    todos: [],
    editingId: null,
    editText: ''
};


export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        API.getLists().then(todos => {
            dispatch({ type: 'SET_TODOS', payload: todos });
        })
            .catch(err => console.error("Failed to fetch todos:", err));
    }, []);

       const handleInputChange = (e) => {
        dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!state.inputValue.trim()) return;

        const newTodo = {
            text: state.inputValue,
            completed: false
        };

        API.addList(newTodo)
            .then(response => {
                dispatch({ type: 'ADD_TODO', payload: response });
                console.log("Todo added successfully");
            })
            .catch(err => console.error("Failed to add todo:", err));
    };

    const handleToggleComplete = (id) => {
        let updatedTodo;

        const updatedTodos = state.todos.map(todo => {
            if (todo.id === id) {
                updatedTodo = { ...todo, completed: !todo.completed };
                return updatedTodo;
            }
            return todo;
        });

        API.updateList(id, updatedTodo)
            .then(() => {
                dispatch({ type: 'TOGGLE_TODO', payload: updatedTodo });
            })
            .catch(err => {
                console.error("Failed to update todo:", err);
            });
    };

    const handleDelete = (id) => {
        API.deleteList(id)
            .then(() => {
                dispatch({ type: 'DELETE_TODO', payload: id });
                console.log("Todo deleted successfully");
            })
            .catch(err => console.error("Failed to delete todo:", err));
    };

    const handleEdit = (id) => {
        if (id === state.editingId) {
            let updatedTodo;

            const updatedTodos = state.todos.map(todo => {
                if (todo.id === id) {
                    updatedTodo = { ...todo, text: state.editText };
                    return updatedTodo;
                }
                return todo;
            });

            API.updateList(id, updatedTodo)
                .then(() => {
                    dispatch({ type: 'FINISH_EDITING', payload: updatedTodo });
                })
                .catch(err => {
                    console.error("Failed to update todo:", err);
                });
        } else {
            const todoToEdit = state.todos.find(todo => todo.id === id);
            dispatch({
                type: 'START_EDITING',
                payload: { id, text: todoToEdit.text }
            });
        }
    };

    const handleEditChange = (value) => {
        dispatch({ type: 'UPDATE_EDIT_TEXT', payload: value });
    };

    const contextValue = {
        state,
        dispatch,
        handlers: {
            handleInputChange,
            handleAdd,
            handleToggleComplete,
            handleDelete,
            handleEdit,
            handleEditChange
        }
    };

    return (
        <TodoContext.Provider value={
            contextValue}
            >
            {children}
        </TodoContext.Provider>
    );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  return context;
}