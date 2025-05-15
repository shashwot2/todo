import React, { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { API } from "./api/api.js"
import './App.css';
import TodoLists from './components/TodoLists';

export const App = () => {
    const [inputValue, setInputValue] = useState('')
    const [todos, setTodos] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')

    const inputRef = useRef(null)

    useEffect(() => {
        API.getLists().then(todos => {
            setTodos(todos)
        })
            .catch(err => console.error("Failed to fetch todos:", err))
    }, [])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const newTodo = {
            text: inputValue,
            completed: false
        }

        API.addList(newTodo)
            .then(response => {
                setTodos(prevTodos => [...prevTodos, response])
                setInputValue('')
                inputRef.current?.focus()
                console.log("Todo added successfully")
            })
            .catch(err => console.error("Failed to add todo:", err))
    }

    const handleToggleComplete = (id) => {
        let updatedTodo;

        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                updatedTodo = { ...todo, completed: !todo.completed };
                return updatedTodo;
            }
            return todo;
        });

        API.updateList(id, updatedTodo)
            .then(() => {
                setTodos(updatedTodos);
            })
            .catch(err => {
                console.error("Failed to update todo:", err);
            });
    };

    const handleDelete = (id) => {
        API.deleteList(id)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
                console.log("Todo deleted successfully")
            })
            .catch(err => console.error("Failed to delete todo:", err))
    }

    const handleEdit = (id) => {
        if (id === editingId) {
            let updatedTodo;
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    updatedTodo = { ...todo, text: editText };
                    return updatedTodo;
                }
                return todo;
            });

            API.updateList(id, updatedTodo)
                .then(() => {
                    setTodos(updatedTodos);
                })
                .catch(err => {
                    console.error("Failed to update todo:", err);
                });
            setEditingId(null)
            setEditText('')
        }
        else {
            setTodos(prevTodos => {
                const todoToEdit = prevTodos.find(todo => todo.id === id)
                setEditingId(id)
                setEditText(todoToEdit.text)
                return prevTodos
            })
        }
    }

    const handleEditChange = useCallback((value) => {
        setEditText(value)
    }, [])

    // useMemo for expensive calculations
    const filteredTodos = useMemo(() => {
        const incompleteTodos = todos.filter(todo => !todo.completed)
        const completedTodos = todos.filter(todo => todo.completed)

        return { incompleteTodos, completedTodos }
    }, [todos])

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

            <TodoLists
                incompleteTodos={filteredTodos.incompleteTodos}
                completedTodos={filteredTodos.completedTodos}
                editingId={editingId}
                editText={editText}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onEditChange={handleEditChange}
            />
        </div>
    )
}


export default App