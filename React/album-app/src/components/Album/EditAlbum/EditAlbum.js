import React, { Component } from 'react';
import AlbumService from '../../../services/AlbumService';
import Input from '../../UI/Input/Input';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import ValidationHelper from '../../../helpers/ValidationHelper';
import { withRouter } from 'react-router-dom';

class EditAlbum extends Component {
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
          value: this.props.album.title,
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        artist: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: "Album's Artist"
          },
          value: this.props.album.artist,
          validation: {
            required: true,
            minLength: 3
          },
          valid: true,
          touched: false
        },
        releaseDate: {
          elementType: 'date',
          value: new Date(this.props.album.releaseDate),
          valid: true
        },
        nbTracks: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: ''
          },
          value: this.props.album.nbTracks,
          validation: {
            required: true,
            positiveNumber: true
          },
          valid: true,
          touched: false
        },
        albumLink: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: "Album's Link to Spotify"
          },
          value: this.props.album.albumLink,
          validation: {
            required: true,
            isSpotifyLink: true
          },
          valid: true,
          touched: false
        },
        picture: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: "Album's cover"
          },
          value: this.props.album.picture,
          validation: {
            required: true
          },
          valid: true,
          touched: false
        }
      },
      formIsValid: true
    };
  }

  albumHandler = event => {
    event.preventDefault();
    console.log(this.props.album.id);
    const formData = {};
    for (let formElem in this.state.albumForm) {
      formData[formElem] = this.state.albumForm[formElem].value;
    }
    AlbumService.editAlbum(this.props.album.id, formData)
      .then(res => {
        this.props.takeEditAlbum(res.data);
        toast.notify('You edited the album', {
          duration: 2000
        });
        this.props.history.push('/album/' + this.props.album.id);
      })
      .catch(err => {
        this.props.changeEdit(true);
        console.log(err);
      });
  };

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
      updatedElement.valid = ValidationHelper.checkValidity(
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
          <h3>Edit this album</h3>
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
                <button
                  disabled={!this.state.formIsValid}
                  className='editButton'
                >
                  Save Album
                </button>
              </li>
            </ul>
          </form>
          <img src={this.state.albumForm.picture.value} alt='cover' />
        </main>
      </div>
    );
  }
}

export default withRouter(EditAlbum);
