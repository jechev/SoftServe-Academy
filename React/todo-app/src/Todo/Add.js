import React from 'react';

const Add = props => {
  return (
    <form onSubmit={props.addTodo}>
      <label>New Todo</label>
      <input type="text" name="text" />
      <button>Add new Todo</button>
    </form>
  );
};

export default Add;
