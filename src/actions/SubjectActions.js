import alt from '../alt';
import axios from 'axios';
import UrlUtils from '../utils/UrlUtils';

class SubjectActions {

  saveSelection(subjects) {
    return (dispatch) => {
      axios.post(UrlUtils.constructUrl('api/subjects'), {subjects})
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
      axios.get(UrlUtils.constructUrl('api/subjects'))
        .then(response => {
          dispatch(response.data); // {subjects: {}, percentCompleted: number}
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }
}

export default alt.createActions(SubjectActions);