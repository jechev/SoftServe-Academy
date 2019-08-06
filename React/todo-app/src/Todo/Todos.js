import React, { useState } from 'react';
import Delete from './Delete';
import Add from './Add';

const Todos = () => {
  const [todosState, setTodos] = useState([
    'Buy Water',
    'Buy meat',
    'ggg',
    'ddd',
    'gdfgd'
  ]);

  function deleteTodoHandler(toDoIndex) {
    const todos = [...todosState];
    todos.splice(toDoIndex, 1);
    setTodos(todos);
  }

  function addToDo(todo) {
    console.log(todo);
  }

  const todosToListItem = todosState.map((el, index) => (
    <li key={index} id={index}>
      {el}
      <Delete onClick={() => deleteTodoHandler(index)} />
    </li>
  ));

  return (
    <div>
      <h1>Go Go</h1>
      <Add />
      <ul>{todosToListItem}</ul>
    </div>
  );
};

export default Todos;
