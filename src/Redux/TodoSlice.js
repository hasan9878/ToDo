import { createSlice } from '@reduxjs/toolkit'

// ⏳ Local Storage থেকে লোড
const loadTodos = () => {
  const data = localStorage.getItem('todos')
  return data ? JSON.parse(data) : [
    {
      id: Date.now(),
      text: "Default Task: Welcome to your Todo App!",
      completed: false,
      timestamp: new Date().toLocaleString()
    }
  ]
}

// ✅ Local Storage এ সেভ
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const todoSlice = createSlice({
  name: 'Todo',
  initialState: loadTodos(),

  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        timestamp: new Date().toLocaleString()
      }
      state.push(newTodo)
      saveTodos(state)
    },

    deleteTodo: (state, action) => {
      const updated = state.filter((t) => t.id !== action.payload)
      saveTodos(updated)
      return updated
    },

    editTodo: (state, action) => {
      const { id, newText } = action.payload
      const todo = state.find((t) => t.id === id)
      if (todo) {
        todo.text = newText
        todo.timestamp = new Date().toLocaleString()
        todo.edited = true
        saveTodos(state)
      }
    },

    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        todo.timestamp = new Date().toLocaleString()
        saveTodos(state)
      }
    }
  }
})

export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions
export default todoSlice.reducer
