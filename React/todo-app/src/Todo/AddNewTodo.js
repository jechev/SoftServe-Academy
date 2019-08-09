import React, { useState } from 'react';
import uuid from 'uuid/v4';
import './AddNewTodo.css';

const AddNewTodo = props => {
  const [newTaskState, setNewTask] = useState({ task: '' });

  function handleSubmit(event) {
    event.preventDefault();
    props.createTodo({ ...newTaskState, id: uuid(), isCompleted: false });
    setNewTask({ task: '' });
  }

  return (
    <form onSubmit={handleSubmit} className='form-new-todo'>
      <label htmlFor='task'>New Todo</label>
      <input
        type='text'
        name='task'
        placeholder='New Todo'
        id='task'
        value={newTaskState.task}
        onChange={e => setNewTask({ task: e.target.value })}
      />
      <button>Add new Todo</button>
    </form>
  );
};

export default AddNewTodo;
