import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from '../../utils/interfaces/ITodo'

interface IEditedTodo {
    editedText: string,
    id: string
}

const initialState: ITodo[] = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getTodos: (state, action) => {
            return state = action.payload;
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.push(action.payload);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            return state.filter(todo => todo.id !== action.payload)
        },
        completionStatusChange: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(todo => todo.id === action.payload)
            state[index].completionStatus = !(state[index].completionStatus);
        },
        deleteCompletedTodos: (state) => {
            return state.filter(todo => !todo.completionStatus)
        },
        editStateChange: (state, action: PayloadAction<string | null>) => {
            return state.forEach(todo => {
                if (todo.id === action.payload) return todo.isEditing = true
                return todo.isEditing = false;
            })
        },
        editTodo: (state, action: PayloadAction<IEditedTodo>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].todo = action.payload.editedText
        }
    }
})

export const { getTodos, addTodo, deleteTodo, completionStatusChange, deleteCompletedTodos, editStateChange, editTodo } = todoSlice.actions;
export default todoSlice.reducer