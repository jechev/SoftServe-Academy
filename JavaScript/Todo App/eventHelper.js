import noteService from './noteService';
import helper from './helper';

const eventHelper = (function() {
  let noteForm = document.noteForm;
  //submitButton.addEventListener("click", eventHelper.addNewNote);

  module.exports = {
    addNewNote: function() {
      let noteValue = noteForm.description.value;
      if (noteValue === "") {
        alert("You cannot add empty note");
      } else {
        noteService.postNote(noteValue).then(function(response) {
          helper.addNoteHTML(response.data);
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
    },
    editNote: function editNote() {
      let noteId = event.target.id.replace( /^\D+/g, '');
      
    }
  };

}());
