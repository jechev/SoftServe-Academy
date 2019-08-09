import React, { useState } from 'react';
import Todo from './Todo';
import AddNewTodo from './AddNewTodo';
import uuid from 'uuid/v4';
import './TodoList.css';

const TodoList = () => {
  const [todosState, setTodos] = useState([
    { task: 'Create Todo App', isCompleted: true, id: uuid() },
    { task: 'Start other project', isCompleted: false, id: uuid() }
  ]);

  const todos = todosState.map(todo => {
    return (
      <Todo
        key={todo.id}
        task={todo.task}
        id={todo.id}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        isCompleted={todo.isCompleted}
        toggleCompletion={toggleCompletion}
      />
    );
  });

  function createTodo(newTodo) {
    const newTodos = [...todosState, newTodo];
    setTodos(newTodos);
  }

  function removeTodo(id) {
    const newTodos = todosState.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  function updateTodo(id, updatedTask) {
    const updateTodos = todosState.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  function toggleCompletion(id) {
    const updateTodos = todosState.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  return (
    <div className='TodoList'>
      <h1>
        Todo List<span>A simple React Todo List App</span>
      </h1>
      <ul>{todos}</ul>
      <AddNewTodo createTodo={createTodo} />
    </div>
  );
};

export default TodoList;
