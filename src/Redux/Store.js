import { configureStore } from '@reduxjs/toolkit'
import TodoReducer from './TodoSlice.js'


const store = configureStore({
  reducer: {
todos: TodoReducer,    }
})

export default store;
