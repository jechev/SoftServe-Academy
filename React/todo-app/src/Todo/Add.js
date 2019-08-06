import React from 'react';

const Add = () => {
  function submitTodo(event) {
    event.preventDefault();
    console.log(event.target);
  }

  return (
    <form onSubmit={submitTodo}>
      <label>New Todo</label>
      <input type='text' name='text' />
      <button>Add new Todo</button>
    </form>
  );
};

export default Add;
