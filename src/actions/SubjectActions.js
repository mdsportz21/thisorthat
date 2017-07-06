import alt from '../alt';
import axios from 'axios';

class SubjectActions {

  saveSelection(subjects) {
    return (dispatch) => {
      axios.post('http://localhost:5000/api/subjects', {subjects})
        .then(function (response) {
          dispatch(response.data.responseSaved);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  }

  fetchSubjects() {
    return (dispatch) => {
      axios.get('http://localhost:5000/api/subjects')
        .then(response => {
          dispatch(response.data.subjects);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }
}

export default alt.createActions(SubjectActions);