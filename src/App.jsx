import React from "react"
import { API } from "./api/api.js"
import './App.css';
import TodoLists from './components/TodoLists'; 

export class App extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            todos: [],
            editingId: null,
            editText: ''
        }
    }

    componentDidMount = () => {
        API.getLists()
            .then(todos => {
                this.setState({ todos })
            })
            .catch(err => console.error("Failed to fetch todos:", err))
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    handleAdd = (e) => {
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

    handleToggleComplete = (id) => {
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

    handleDelete = (id) => {
        API.deleteList(id)
            .then(() => {
                this.setState({
                    todos: this.state.todos.filter(todo => todo.id !== id)
                })
                console.log("Todo deleted successfully")
            })
            .catch(err => console.error("Failed to delete todo:", err))
    }

    handleEdit = (id, text) => {
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
        else {
            this.setState({
                editingId: id,
                editText: text
            })
        }
    }

    handleEditChange = (e) => {
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

                <TodoLists 
                    incompleteTodos={incompleteTodos}
                    completedTodos={completedTodos}
                    editingId={editingId}
                    editText={editText}
                    onToggleComplete={this.handleToggleComplete}
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                    onEditChange={this.handleEditChange}
                />
            </div>
        )
    }
}

export default App