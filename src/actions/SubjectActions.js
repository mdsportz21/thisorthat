import alt from '../alt';
import axios from 'axios';

class SubjectActions {

  saveSelection(subjects) {
    return (dispatch) => {
      axios.post('http://localhost:3004/subjects', {subjects})
        .then(function (response) {
          debugger;
          dispatch(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  }

  fetchSubjects() {
    return (dispatch) => {
      axios.get('http://localhost:3004/subjects')
        .then(response => {
          dispatch(response.data);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }
}

export default alt.createActions(SubjectActions);