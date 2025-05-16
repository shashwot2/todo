export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INPUT_VALUE':
            return { ...state, inputValue: action.payload };

        case 'SET_TODOS':
            return { ...state, todos: action.payload };

        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload],
                inputValue: ''
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? action.payload : todo
                )
            };

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };

        case 'START_EDITING':
            return {
                ...state,
                editingId: action.payload.id,
                editText: action.payload.text
            };

        case 'UPDATE_EDIT_TEXT':
            return { ...state, editText: action.payload };

        case 'FINISH_EDITING':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? action.payload : todo
                ),
                editingId: null,
                editText: ''
            };

        default:
            return state;
    }
}