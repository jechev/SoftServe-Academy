// Helper with all events
import noteService from './noteService';

const eventHelper = (function() {
  let noteForm = document.noteForm;
  let editForm = document.editForm;

  module.exports = {
    addNewNote: function() {
      let noteValue = noteForm.description.value;
      if (noteValue === '') {
        alert('You cannot add empty note');
      } else {
        noteService.postNote(noteValue).then(function(response) {
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      noteForm.reset();
    },
    deleteNote: function deleteNote(event) {
      console.log(event);
      let noteId = event.target.id.replace( /^\D+/g, '');
      
      noteService.deleteNote(noteId).then(function(response) {
        document.getElementById('note-' + noteId).remove();
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    editNote: function editNote(event) {
      let noteId = event.target.id.replace( /^\D+/g, '');
      let noteText = document.getElementById('text-' + noteId).innerText;
      editForm['note-id'].value = noteId;
      editForm['edit-description'].value = noteText;
      noteForm.style.display = 'none';
      editForm.style.display = 'block';
      console.log(noteText);
    },
    saveEditedNote: function(event) {
      let noteId = editForm['note-id'].value;
      let newDescription = editForm['edit-description'].value;

      if (newDescription === '') {
        alert('You cannot add empty note')
      } else {
        noteService.editNote(noteId, newDescription).then(function(response) {
          console.log(response)
          noteForm.style.display = 'block';
          editForm.style.display = 'none';
          location.reload();
        })
        .catch(function(error) {
          console.log(error)
        });
      }
    }
  };

}());
