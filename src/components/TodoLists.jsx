import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { Edit, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

const TodoLists = ({ incompleteTodos, completedTodos, editingId, editText, onToggleComplete, onDelete, onEdit, onEditChange }) => {
    const editInputRef = useRef(null);

    useEffect(() => {
        if (editingId !== null) {
            editInputRef.current?.focus();
        }
    }, [editingId]);

    const handleEditChange = useCallback((e) => {
        onEditChange(e.target.value);
    }, [onEditChange]);

    const handleKeyDown = useCallback((e, todoId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onEdit(todoId);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onEdit(null);
        }
    }, [onEdit]);


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
                                            onChange={handleEditChange}
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
                                        onClick={() => onEdit(todo.id, todo.text)}
                                        className="edit-button"
                                    >
                                        <Edit size={22} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(todo.id)}
                                        className="delete-button"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                    <div className="move-button-container">
                                        <button
                                            onClick={() => onToggleComplete(todo.id)}
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
                                    onClick={() => onToggleComplete(todo.id)}
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
                                        onChange={handleEditChange}
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
                                    onClick={() => onEdit(todo.id, todo.text)}
                                    className="edit-button"
                                >
                                    <Edit size={22} />
                                </button>
                                <button
                                    onClick={() => onDelete(todo.id)}
                                    className="delete-button"
                                >
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(TodoLists);