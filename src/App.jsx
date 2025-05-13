import React, { useEffect, useState } from "react"
import { API } from "./api/api.js"
import './App.css';
import TodoLists from './components/TodoLists';

export const App = () => {
    const [inputValue, setInputValue] = useState('')
    const [todos, setTodos] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')
    useEffect(() => {
        API.getLists().then(todos => {
            setTodos(todos)
        })
            .catch(err => console.error("Failed to fetch todos:", err))
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
                setTodos([...todos, response])
                setInputValue('')
                console.log("Todo added successfully")
            })
            .catch(err => console.error("Failed to add todo:", err))
    }

    const handleToggleComplete = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })

        const updatedTodo = updatedTodos.find(todo => todo.id === id)

        API.updateList(id, updatedTodo)
            .then(() => {
                setTodos(updatedTodos)
            })
            .catch(err => {
                console.error("Failed to update todo:", err)
            })
    }

    const handleDelete = (id) => {
        API.deleteList(id)
            .then(() => {
                setTodos(
                    todos.filter(todo => todo.id !== id)
                )
                console.log("Todo deleted successfully")
            })
            .catch(err => console.error("Failed to delete todo:", err))
    }

    const handleEdit = (id, text) => {
        if (id === editingId) {
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text: editText }
                }
                return todo
            })

            const updatedTodo = updatedTodos.find(todo => todo.id === id)

            API.updateList(id, updatedTodo)
                .then(() => {
                    setTodos(updatedTodos)
                    setEditingId(null)
                    setEditText('')
                    console.log("Todo updated successfully")
                })
                .catch(err => {
                    console.error("Failed to update todo:", err)
                })
        }
        else {
            setEditingId(id)
            setEditText(text)
        }
    }

    const handleEditChange = (e) => {
        setEditText(e.target.value)
    }
    const incompleteTodos = todos.filter(todo => !todo.completed)
    const completedTodos = todos.filter(todo => todo.completed)

    return (
        <div className="container">
            <div className="input-container">
                <div id="inputPlace" className="input-form">
                    <input
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
                incompleteTodos={incompleteTodos}
                completedTodos={completedTodos}
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