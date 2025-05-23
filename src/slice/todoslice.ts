import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/api"
import { todo } from "node:test";

export const fetchInitTodoData = createAsyncThunk(
    "todo/fetchInitTodoData",
    async () => {
        return await API.getLists();
    }
);

export const addTodoAsync = createAsyncThunk(
    "todo/addTodoAsync",
    async (newTodo) => {
        return await API.addList(newTodo);
    }
);
export const updateTodoAsync = createAsyncThunk(
    "todo/updateTodoAsync",
    async ({ id, updatedTodo }) => {
        await API.updateList(id, updatedTodo);
        return updatedTodo
    }
);
export const deleteTodoAsync = createAsyncThunk(
    "todo/deleteTodoAsync",
    async (id) => {
        await API.deleteList(id);
        return id;
    }
);
export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        inputValue: '',
        editingId: null,
        editText: ''
    },
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload
        },
        addTodo(state, action) {
            state.todos.push(action.payload)
            state.inputValue = ''
            // return [...state, todos:[...state.todos, action.payload]]
        },
        toggleTodo(state, action) {
            const todo = state.todos.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)

        },
        startEdit(state, action) {
            state.editText = action.payload.text,
                state.editingId = action.payload.id
        },
        updateEditText(state, action) {
            state.editText = action.payload
        },
        finishEdit(state, action) {
            const todo = state.todos.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.completed = !todo.completed
            }
            state.editText = '',
                state.editingId = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitTodoData.fulfilled, (state, action) => {
                state.todos = action.payload
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.todos.push(action.payload);
                state.inputValue = '';
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    }
})
export const { setInputValue, addTodo, deleteTodo, toggleTodo, startEdit, updateEditText, finishEdit } = todoSlice.actions
export default todoSlice.reducer;