import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'normal', displayValue: 'Normal' }
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElem in this.state.orderForm) {
      formData[formElem] = this.state.orderForm[formElem].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedElement = { ...updatedOrderForm[inputId] };
    updatedElement.value = event.target.value;
    updatedOrderForm[inputId] = updatedElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElem => (
          <Input
            key={formElem.id}
            elementType={formElem.config.elementType}
            elementConfig={formElem.config.elementConfig}
            value={formElem.config.value}
            changed={event => this.inputChangedHandler(event, formElem.id)}
          />
        ))}
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className='ContactData'>
        <h4>Enter you Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
