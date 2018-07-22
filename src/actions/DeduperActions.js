import alt from '../alt';
import axios from 'axios';

class DeduperActions {
  fetchDupes() {
    return (dispatch) => {
      axios.get('http://localhost:5000/api/dupes')
        .then(response => {
          dispatch(response.data)
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }

  saveDupes(name, teamIds) {
    return (dispatch) => {
      const request = {
        name,
        teamIds
      };
      axios.post('http://localhost:5000/api/dupes', request)
        .then(response => {
          dispatch(response.data);
        })
        .catch(function(error) {
          console.error(error);
        })
    };
  }
}

export default alt.createActions(DeduperActions);