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

  const todosToListItem = todosState.map((el, index) => (
    <li key={index} id={index}>
      {el}
      <Delete onClick={() => deleteTodoHandler(index)} />
    </li>
  ));

  function addTodo(event) {
    event.preventDefault();
    const newTodo = event.target.elements.text.value;
    event.target.elements.text.value = '';
    const newTodosArr = [...todosState, newTodo];
    setTodos(newTodosArr);
  }

  return (
    <div>
      <h1>Go Go</h1>
      <Add addTodo={addTodo} />
      <ul>{todosToListItem}</ul>
    </div>
  );
};

export default Todos;
