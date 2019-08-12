import React from 'react';
import Auxx from '../../../hoc/Auxx';

const orderSummary = props => {
  const ingridientSummary = Object.keys(props.ingridients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {props.ingridients[igKey]}
      </li>
    );
  });
  return (
    <Auxx>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingridients:</p>
      <ul>{ingridientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Auxx>
  );
};

export default orderSummary;
