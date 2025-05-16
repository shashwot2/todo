import { Edit, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTodoContext } from '../context/TodoContext.jsx';
export const TodoItem = ({ todo, isCompleted }) => {
    const { handlers, state } = useTodoContext();
    const { editingId, editText} = state;
    const { handleToggleComplete, handleDelete, handleEdit, handleEditChange } = handlers;
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