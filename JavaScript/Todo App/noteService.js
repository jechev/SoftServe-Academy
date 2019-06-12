// Service makes http requests and return promises
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
    },
    editNote: function(id, description) {
      return axios.put(baseUrl + '/' + id, {
        description: description
      });
    }
  };
}());