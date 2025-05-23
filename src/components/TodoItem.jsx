import { Edit, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleTodo,
    deleteTodoAsync,
    startEdit,
    updateEditText,
    finishEdit,
    updateTodoAsync
} from '../slice/todoslice';
export const TodoItem = ({ todo, isCompleted }) => {
    const { editingId, editText } = useSelector(state => state.todo);
    const dispatch = useDispatch();
    const handleToggleComplete = (id) => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        dispatch(updateTodoAsync({ id, updatedTodo }));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodoAsync(id));
    };

    const handleEdit = (id) => {
        if (id === editingId) {
            const updatedTodo = { ...todo, text: editText };
            dispatch(updateTodoAsync({ id, updatedTodo }));
            dispatch(finishEdit({ id }));
        } else {
            dispatch(startEdit({ id, text: todo.text }));
        }
    };

    const handleEditChange = (value) => {
        dispatch(updateEditText(value));
    };
    return (
        <div className={`todo-item ${isCompleted ? 'completed' : 'pending'}`}>
            {isCompleted && (
                <div className="move-button-container">
                    <button onClick={() => handleToggleComplete(todo.id)} className="move-button">
                        <ArrowLeft size={22} />
                    </button>
                </div>
            )}

            <div className="todo-content">
                {editingId === todo.id ? (
                    <input
                        value={editText}
                        onChange={e => handleEditChange(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleEdit(todo.id))}
                        className="input-field"
                        autoFocus
                    />
                ) : (
                    <span className={isCompleted ? "completed-text" : ""}>
                        {todo.text}
                    </span>
                )}
            </div>

            <div className="button-group">
                <button onClick={() => handleEdit(todo.id)} className="edit-button">
                    <Edit size={22} />
                </button>
                <button onClick={() => handleDelete(todo.id)} className="delete-button">
                    <Trash2 size={22} />
                </button>

                {!isCompleted && (
                    <div className="move-button-container">
                        <button onClick={() => handleToggleComplete(todo.id)} className="move-button">
                            <ArrowRight size={22} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}