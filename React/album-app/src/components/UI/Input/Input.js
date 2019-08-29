import React from 'react';
import './Input.css';
import DatePicker from 'react-datepicker';

const input = props => {
  let inputElement = null;
  let errorClass = null;
  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className='ValidationError'>Please enter a valid value!</p>
    );
  }
  if (props.invalid && props.shouldValidate && props.touched) {
    errorClass = 'Invalid';
  }
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={errorClass}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'date':
      inputElement = (
        <DatePicker
          selected={props.value}
          onChange={props.changed}
          id='releaseDate'
          name='realeaseDate'
          className={errorClass}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className='InputElement'
          className={errorClass}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className='Input'>
      <label className='Label'>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
