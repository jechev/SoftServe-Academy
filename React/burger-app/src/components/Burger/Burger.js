import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = props => {
  let ingridients = Object.keys(props.ingridients)
    .map(igKey => {
      return [...Array(props.ingridients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (ingridients.length === 0) {
    ingridients = <p>Please start adding ingridients!</p>;
  }
  return (
    <div className='Burger'>
      <BurgerIngredient type='bread-top' />
      {ingridients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
