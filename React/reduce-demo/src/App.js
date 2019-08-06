import React, { useReducer } from 'react';
import './App.css';
import { Counter } from './Counter';
import { MyConsumer, MyProvider } from './Context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };

    default:
      return state;
  }
};

function App() {
  return (
    <MyProvider value={useReducer(reducer, { count: 5 })}>
      <Counter consumer={MyConsumer} />
    </MyProvider>
  );
}

export default App;
