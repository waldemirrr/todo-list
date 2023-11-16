import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice';
import filterReducer from './slices/filterSlice'

const store = configureStore({
    reducer: {
        todos: todoReducer,
        filter: filterReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch