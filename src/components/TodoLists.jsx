import React from "react";
import { useTodoContext } from '../context/TodoContext.jsx';
import { TodoItem } from "./TodoItem.jsx";

export const TodoLists = () => {
    const { state } = useTodoContext();
    const { todos} = state;

    const { incompleteTodos, completedTodos } = React.useMemo(() => ({
        incompleteTodos: todos.filter(todo => !todo.completed),
        completedTodos: todos.filter(todo => todo.completed)
    }), [todos]);
   
    const columns = [
        { title: "Pending Tasks", id: "todolist-todo", items: incompleteTodos, isCompleted: false },
        { title: "Completed Tasks", id: "todolist-done", items: completedTodos, isCompleted: true }
    ];

    return (
        <div className="grid-container">
            {columns.map(column => (
                <div key={column.id} className="column">
                    <h2 className="column-header">{column.title}</h2>
                    <div id={column.id} className="todo-list">
                        {column.items.map(todo => (
                            <TodoItem key={todo.id} todo={todo} isCompleted={column.isCompleted} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(TodoLists);