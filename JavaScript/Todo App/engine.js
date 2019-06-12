// imports all modules
import helper from "./helper";
import eventHelper from "./eventHelper";
import noteService from "./noteService";

const engine = (function() {
  module.exports = {
    run: function run() {
      let submitButton = document.getElementById("submit-btn");
      let editButton = document.getElementById("save-btn");

      submitButton.addEventListener("click", eventHelper.addNewNote);
      editButton.addEventListener("click", eventHelper.saveEditedNote);

      loadAllNotes();

      function loadAllNotes() {
        noteService.getNotes().then(function(response) {
          for (const note of response.data) {
            helper.addNoteHTML(note);
          }
        });
      }
    }
  };
})();
