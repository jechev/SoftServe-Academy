import eventHelper from './eventHelper';

const helpers = (function() {
  
  const notesList = document.getElementById("notes-list");

  function createButtons(parent, id) {
    let buttonEdit = document.createElement('button');
    let buttonDelete = document.createElement('button');
    buttonEdit.innerHTML = 'Edit'
    buttonDelete.innerHTML = 'Delete'
  
    buttonEdit.classList.add('edit-btn');
    buttonDelete.classList.add('delete-btn');
  
    buttonEdit.id = 'edit-' + id;
    buttonDelete.id ='delete-' + id;
    
    buttonDelete.addEventListener("click", eventHelper.deleteNote);
  
    parent.appendChild(buttonEdit);
    parent.appendChild(buttonDelete);
  }

  function deleteNote() {

  }


  module.exports = {
    addNoteHTML : function(note) {
      let listItem = document.createElement("li");
      listItem.id = 'note-' + note.id;
      listItem.innerText = note.description;
      createButtons(listItem, note.id);
      notesList.appendChild(listItem);
    }
  };
}());