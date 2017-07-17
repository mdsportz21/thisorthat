import alt from '../alt';
import axios from 'axios';

class RankingsActions {
  fetchRankings() {
    return (dispatch) => {
      axios.get('http://localhost:5000/api/ranking')
        .then(response => {
          dispatch(response.data.rankings);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }
}

export default alt.createActions(RankingsActions);