/// HTML helper - methods for addNote item and buttons
import eventHelper from './eventHelper';

const helper = (function() {
  
  const notesList = document.getElementById('notes-list');

  function createButtons(parent, id) {
    let buttonEdit = document.createElement('button');
    let buttonDelete = document.createElement('button');

    buttonEdit.innerHTML = 'Edit';
    buttonDelete.innerHTML = 'Delete';
  
    buttonEdit.classList.add('edit-btn');
    buttonDelete.classList.add('delete-btn');
  
    buttonEdit.id = 'edit-' + id;
    buttonDelete.id ='delete-' + id;
    
    buttonDelete.addEventListener('click', eventHelper.deleteNote);
    buttonEdit.addEventListener('click', eventHelper.editNote);
    
    parent.appendChild(buttonEdit);
    parent.appendChild(buttonDelete);
  }

  module.exports = {
    addNoteHTML: function(note) {
      let listItem = document.createElement('li');
      let textSpan = document.createElement('span');

      listItem.id = 'note-' + note.id;
      textSpan.id = 'text-' + note.id;
      textSpan.innerText = note.description;

      listItem.appendChild(textSpan);
      createButtons(listItem, note.id);
      notesList.appendChild(listItem);
    }
  };
}());