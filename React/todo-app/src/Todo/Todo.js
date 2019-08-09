import React, { useState } from 'react';
import './Todo.css';

const Todo = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(props.task);
  let result;

  function handleRemove() {
    props.removeTodo(props.id);
  }

  function toggleForm() {
    setIsEditing(!isEditing);
  }

  function handleUpdate(event) {
    event.preventDefault();
    props.updateTodo(props.id, task);
    toggleForm();
  }

  function handleStatus(event) {
    props.toggleCompletion(props.id);
  }

  if (isEditing) {
    result = (
      <div className='Todo'>
        <form onSubmit={handleUpdate} className='Todo-edit-form'>
          <input
            type='text'
            value={task}
            name='task'
            onChange={e => setTask(e.target.value)}
          />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className='Todo'>
        <div className='Todo-buttons'>
          <button onClick={toggleForm}>Edit</button>
          <button onClick={handleRemove}>X</button>
        </div>
        <li
          className={props.isCompleted ? 'Todo-task completed' : 'Todo-task'}
          onClick={handleStatus}
        >
          {props.task}
        </li>
      </div>
    );
  }

  return result;
};

export default Todo;
