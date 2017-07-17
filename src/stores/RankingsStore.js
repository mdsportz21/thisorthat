import alt from '../alt';
import RankingsActions from '../actions/RankingsActions';

class RankingsStore {
  constructor() {
    this.bindListeners({
      handleFetchRankings: RankingsActions.fetchRankings
    });

    this.state = {
      rankings: []
    };
  }

  handleFetchRankings(rankings) {
    this.setState({
      rankings
    });
  }
}

export default alt.createStore(RankingsStore, 'RankingsStore');