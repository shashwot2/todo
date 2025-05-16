import React, { useRef, useEffect, useContext, useMemo } from "react";
import { Edit, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { TodoContext } from '../context/TodoContext.jsx';

const TodoLists = () => {
    const { state, handlers } = useContext(TodoContext);
    const { todos, editingId, editText } = state;
    const { handleToggleComplete, handleDelete, handleEdit, handleEditChange } = handlers;

    const editInputRef = useRef(null);
    let incompleteTodos;
    let completedTodos;
    useMemo(() => {
        incompleteTodos = todos.filter(todo => !todo.completed);
        completedTodos = todos.filter(todo => todo.completed);
    }
    ), [todos];

    useEffect(() => {
        if (editingId !== null) {
            editInputRef.current?.focus();
        }
    }, [editingId]);

    const handleKeyDown = (e, todoId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleEdit(todoId);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleEdit(null);
        }
    };

    return (
        <div className="grid-container">
            <div className="column">
                <h2 className="column-header">Pending Tasks</h2>
                <div id="todolist-todo" className="todo-list">
                    {
                        incompleteTodos.map(todo => (
                            <div key={todo.id} className="todo-item pending">
                                <div className="todo-content">
                                    {editingId === todo.id ? (
                                        <input
                                            ref={editInputRef}
                                            type="text"
                                            value={editText}
                                            onChange={(e) => handleEditChange(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, todo.id)}
                                            className="input-field"
                                            autoFocus
                                        />
                                    ) : (
                                        todo.text
                                    )}
                                </div>
                                <div className="button-group">
                                    <button
                                        onClick={() => handleEdit(todo.id)}
                                        className="edit-button"
                                    >
                                        <Edit size={22} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo.id)}
                                        className="delete-button"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                    <div className="move-button-container">
                                        <button
                                            onClick={() => handleToggleComplete(todo.id)}
                                            className="move-button"
                                        >
                                            <ArrowRight size={22} />
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
                                    onClick={() => handleToggleComplete(todo.id)}
                                    className="move-button"
                                >
                                    <ArrowLeft size={22} />
                                </button>
                            </div>
                            <div className="todo-content">
                                {editingId === todo.id ? (
                                    <input
                                        ref={editingId === todo.id ? editInputRef : null}
                                        type="text"
                                        value={editText}
                                        onChange={(e) => handleEditChange(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, todo.id)}
                                        className="input-field"
                                        autoFocus
                                    />
                                ) : (
                                    <span className="completed-text">{todo.text}</span>
                                )}
                            </div>
                            <div className="button-group">
                                <button
                                    onClick={() => handleEdit(todo.id)}
                                    className="edit-button"
                                >
                                    <Edit size={22} />
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="delete-button"
                                >
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(TodoLists);