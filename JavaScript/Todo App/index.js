import noteService from "./noteService";
import helper from './helper';
import eventHelper from './eventHelper'

let submitButton = document.getElementById("submit-btn");


console.log(eventHelper)
loadAllNotes();

submitButton.addEventListener("click", eventHelper.addNewNote);

function loadAllNotes() {
  noteService.getNotes().then(function(response) {
    for (const note of response.data) {
      helper.addNoteHTML(note);
    }
  });
}


