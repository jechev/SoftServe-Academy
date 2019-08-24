import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Pesho',
        adress: {
          street: 'Tam',
          zipCode: '6600',
          country: 'Bulgaria'
        },
        email: 'demo@demo.bg'
      },
      deliveryMethod: 'fastest'
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

  render() {
    let form = (
      <form>
        <input
          className='Input'
          type='text'
          name='name'
          placeholder='Your name'
        />
        <input
          className='Input'
          type='email'
          name='email'
          placeholder='Your email'
        />
        <input
          className='Input'
          type='text'
          name='street'
          placeholder='Your street'
        />
        <input
          className='Input'
          type='text'
          name='postalCode'
          placeholder='Postal code'
        />
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
