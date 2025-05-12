import React from "react"
import { API } from "./api/api.js"
import { Edit, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import './App.css';

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            todos: [],
            editingId: null,
            editText: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleToggleComplete = this.handleToggleComplete.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)
    }

    componentDidMount() {
        API.getLists()
            .then(todos => {
                this.setState({ todos })
            })
            .catch(err => console.error("Failed to fetch todos:", err))
    }

    handleInputChange(e) {
        this.setState({ inputValue: e.target.value })
    }

    handleAdd(e) {
        e.preventDefault()
        if (!this.state.inputValue.trim()) return

        const newTodo = {
            text: this.state.inputValue,
            completed: false
        }

        API.addList(newTodo)
            .then(response => {
                this.setState({
                    todos: [...this.state.todos, response],
                    inputValue: ''
                })
                console.log("Todo added successfully")
            })
            .catch(err => console.error("Failed to add todo:", err))
    }

    handleToggleComplete(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })

        const updatedTodo = updatedTodos.find(todo => todo.id === id)

        API.updateList(id, updatedTodo)
            .then(() => {
                this.setState({ todos: updatedTodos })
            })
            .catch(err => {
                console.error("Failed to update todo:", err)
            })
    }

    handleDelete(id) {
        API.deleteList(id)
            .then(() => {
                this.setState({
                    todos: this.state.todos.filter(todo => todo.id !== id)
                })
                console.log("Todo deleted successfully")
            })
            .catch(err => console.error("Failed to delete todo:", err))
    }

    handleEdit(id, text) {
        // If we're already editing this item, save the changes
        if (id === this.state.editingId) {
            const updatedTodos = this.state.todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text: this.state.editText }
                }
                return todo
            })

            const updatedTodo = updatedTodos.find(todo => todo.id === id)

            API.updateList(id, updatedTodo)
                .then(() => {
                    this.setState({
                        todos: updatedTodos,
                        editingId: null,
                        editText: ''
                    })
                    console.log("Todo updated successfully")
                })
                .catch(err => {
                    console.error("Failed to update todo:", err)
                })
        }
        // Otherwise, start editing this item
        else {
            this.setState({
                editingId: id,
                editText: text
            })
        }
    }

    handleEditChange(e) {
        this.setState({
            editText: e.target.value
        })
    }

    render() {
        const { todos, inputValue, editingId, editText } = this.state
        const incompleteTodos = todos.filter(todo => !todo.completed)
        const completedTodos = todos.filter(todo => todo.completed)

        return (
            <div className="container">
                <div className="input-container">
                    <div id="inputPlace" className="input-form">
                        <input
                            value={inputValue}
                            onChange={this.handleInputChange}
                            placeholder="Add a new todo"
                            className="input-field"
                        />
                        <button
                            onClick={this.handleAdd}
                            className="submit-button"
                        >
                            submit
                        </button>
                    </div>
                </div>

                <div className="grid-container">
                    <div className="column">
                        <h2 className="column-header">Pending Tasks</h2>
                        <div id="todolist-todo" className="todo-list">
                            {incompleteTodos.map(todo => (
                                <div key={todo.id} className="todo-item pending">
                                    <div className="todo-content">
                                        {editingId === todo.id ? (
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={this.handleEditChange}
                                                className="input-field"
                                                autoFocus
                                            />
                                        ) : (
                                            todo.text
                                        )}
                                    </div>
                                    <div className="button-group">
                                        <button
                                            onClick={() => this.handleEdit(todo.id, todo.text)}
                                            className="edit-button"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => this.handleDelete(todo.id)}
                                            className="delete-button"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="move-button-container">
                                            <button
                                                onClick={() => this.handleToggleComplete(todo.id)}
                                                className="move-button"
                                            >
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="column">
                        <h2 className="column-header">Completed Tasks</h2>
                        <div id="todolist-done" className="todo-list">
                            {completedTodos.map(todo => (
                                <div key={todo.id} className="todo-item completed">
                                    <div className="move-button-container">
                                        <button
                                            onClick={() => this.handleToggleComplete(todo.id)}
                                            className="move-button"
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                    </div>
                                    <div className="todo-content">
                                        {editingId === todo.id ? (
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={this.handleEditChange}
                                                className="input-field"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="completed-text">{todo.text}</span>
                                        )}
                                    </div>
                                    <div className="button-group">
                                        <button
                                            onClick={() => this.handleEdit(todo.id, todo.text)}
                                            className="edit-button"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => this.handleDelete(todo.id)}
                                            className="delete-button"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App