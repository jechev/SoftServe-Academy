import React, { Component } from 'react';
import './AddAlbum.css';
import AlbumService from '../../../services/AlbumService';
import Input from '../../UI/Input/Input';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

class AddAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumForm: {
        title: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: "Album's Title"
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        artist: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: "Album's Artist"
          },
          value: '',
          validation: {
            required: true,
            minLength: 3
          },
          valid: false,
          touched: false
        },
        releaseDate: {
          elementType: 'date',
          value: new Date(),
          valid: true
        },
        nbTracks: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: ''
          },
          value: 1,
          validation: {
            required: true,
            positiveNumber: true
          },
          valid: false,
          touched: false
        },
        albumLink: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: "Album's Link to Spotify"
          },
          value: '',
          validation: {
            required: true,
            isSpotifyLink: true
          },
          valid: false,
          touched: false
        },
        picture: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: "Album's cover"
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
      },
      formIsValid: false
    };
  }

  albumHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElem in this.state.albumForm) {
      formData[formElem] = this.state.albumForm[formElem].value;
    }
    AlbumService.addNewAlbum(formData)
      .then(res => {
        toast.notify('You created new album', {
          duration: 2000
        });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isSpotifyLink) {
      isValid = value.includes('open.spotify.com') && isValid;
    }
    if (rules.positiveNumber) {
      isValid = Number(value) >= 1 && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedAlbumForm = {
      ...this.state.albumForm
    };
    const updatedElement = { ...updatedAlbumForm[inputId] };
    //This is because Datepicker send only value, not the whole event
    if (inputId === 'releaseDate') {
      updatedElement.value = event;
    } else {
      updatedElement.value = event.target.value;
      updatedElement.valid = this.checkValidity(
        updatedElement.value,
        updatedElement.validation
      );
      updatedElement.touched = true;
    }
    updatedAlbumForm[inputId] = updatedElement;
    let formIsValid = true;
    for (let inputId in updatedAlbumForm) {
      formIsValid = updatedAlbumForm[inputId].valid && formIsValid;
    }

    this.setState({ albumForm: updatedAlbumForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.albumForm) {
      formElementsArr.push({
        id: key,
        config: this.state.albumForm[key]
      });
    }

    return (
      <div>
        <main>
          <h3>Add new album</h3>
          <form onSubmit={this.albumHandler}>
            <ul className='wrapper'>
              {formElementsArr.map(formElem => (
                <li className='form-row' key={formElem.id}>
                  <Input
                    elementType={formElem.config.elementType}
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    invalid={!formElem.config.valid}
                    shouldValidate={formElem.config.validation}
                    touched={formElem.config.touched}
                    changed={event =>
                      this.inputChangedHandler(event, formElem.id)
                    }
                    label={
                      formElem.id.charAt(0).toUpperCase() + formElem.id.slice(1)
                    }
                  />
                </li>
              ))}
              <li className='form-row'>
                <button disabled={!this.state.formIsValid}>Add album</button>
              </li>
            </ul>
          </form>
        </main>
      </div>
    );
  }
}

export default AddAlbum;
