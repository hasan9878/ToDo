import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, editTodo, toggleTodo } from './Redux/TodoSlice'

function Todo() {
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)

  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const handleAddOrEdit = () => {
    if (input.trim() === '') return

    if (editId !== null) {
      dispatch(editTodo({ id: editId, newText: input }))
      setEditId(null)
    } else {
      dispatch(addTodo(input))
    }

    setInput('')
  }

  const handleEdit = (id, text) => {
    setEditId(id)
    setInput(text)
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
    if (editId === id) {
      setEditId(null)
      setInput('')
    }
  }

  const handleToggle = (id) => {
    dispatch(toggleTodo(id))
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', fontFamily: 'Arial' }} className=''>
      <h2 style={{ textAlign: 'center' }} className='font-semibold text-4xl p-20 '>📝 Todo App</h2>

      {/* Input and Button */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }} className='bg-gray-100 p-5 rounded-md'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a task..."
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={handleAddOrEdit}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: editId ? '#007bff' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          {editId !== null ? '✏️ Edit Todo' : '➕ Add Todo'}
        </button>
      </div>

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{
              position: 'relative',
              marginBottom: '1rem',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            {/* ✅ Blur Overlay */}
            {todo.completed && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(200, 200, 200, 0.4)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 0
                }}
              />
            )}

            {/* ✅ Main Content */}
            <div style={{ position: 'relative', zIndex: 1 }} onClick={(e) => e.stopPropagation()}>
              {/* Text */}
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#555' : '#000',
                  opacity: todo.completed ? 0.8 : 1
                }}
              >
                {todo.text}
                {todo.edited && (
                  <span style={{ fontSize: '0.85rem', color: '#007bff', marginLeft: '0.5rem' }}>
                    (Edited)
                  </span>
                )}
              </div>

              {/* Date + Buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.5rem'
                }}
              >
                <small style={{ color: '#666' }}>🕒 {todo.timestamp}</small>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    disabled={todo.completed}
                    style={{
                      color: 'white',
                      backgroundColor: todo.completed ? '#6c757d' : '#007bff',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      cursor: todo.completed ? 'not-allowed' : 'pointer',
                      opacity: todo.completed ? 0.6 : 1,
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    style={{
                      color: 'white',
                      backgroundColor: '#dc3545',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
