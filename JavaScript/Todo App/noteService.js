const axios = require('axios');

const noteService = (function(){
  const baseUrl = 'http://localhost:3000/notes';
   
  module.exports = {
    getNotes : function() {
      return  axios.get(baseUrl);
                
    },
    postNote: function(description) {
      return axios.post(baseUrl, {
        description: description
      });
    },
    deleteNote: function(id) {
      return axios.delete(baseUrl + '/' + id);
    }
  };
}());