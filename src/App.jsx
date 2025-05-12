import React from "react"
import { API } from "./api/api.js"

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            todos: []  
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleToggleComplete = this.handleToggleComplete.bind(this)
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
        
        API.updateList(id, updatedTodo).then(
            this.setState({ todos: updatedTodos })
            )
            .catch(err => {
                console.error("Failed to update todo:", err)
            })
    }

    render() {
        const incompleteTodos = this.state.todos.filter(todo => !todo.completed)
        const completedTodos = this.state.todos.filter(todo => todo.completed)
        
        return (
            <div>
                <form id="inputPlace" onSubmit={this.handleAdd}>
                    <input 
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        placeholder="Add a new todo"
                    />
                    <button type='submit'>Submit</button>
                </form>
                <div id="todolist-todo">
                    <h3>To Do</h3>
                    <ul>
                        {incompleteTodos.map(todo => (
                            <li key={todo.id}>
                                {todo.text}
                                <button onClick={() => this.handleToggleComplete(todo.id)}>
                                    Complete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="todolist-done">
                    <h3>Completed</h3>
                    <ul>
                        {completedTodos.map(todo => (
                            <li key={todo.id}>
                                <s>{todo.text}</s>
                                <button onClick={() => this.handleToggleComplete(todo.id)}>
                                    Undo
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default App