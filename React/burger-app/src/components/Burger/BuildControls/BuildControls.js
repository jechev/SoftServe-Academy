import React from 'react';
import './BuildControls.css';
import BuildContol from '../BuildControls/BuildControl/BuildContol';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
  <div className='BuildControls'>
    {controls.map(ctrl => (
      <BuildContol
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingridientsAdded(ctrl.type)}
        remove={() => props.ingridientsRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
  </div>
);

export default buildControls;
