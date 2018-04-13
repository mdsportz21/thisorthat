import alt from '../alt';
import axios from 'axios';
import UrlUtils from '../utils/UrlUtils';

class RankingsActions {
  fetchRankings() {
    return (dispatch) => {
      axios.get(UrlUtils.constructUrl('api/ranking'))
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