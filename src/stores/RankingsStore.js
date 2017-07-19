import alt from '../alt';
import RankingsActions from '../actions/RankingsActions';

class RankingsStore {
  constructor() {

    this.exportPublicMethods({
      getSubjectById: this.getSubjectById
    });

    this.bindListeners({
      handleFetchRankings: RankingsActions.fetchRankings
    });

    this.state = {
      rankings: []
    };
  }

  getSubjectById(subjectId) {
    const subjectsMap = this.getState().subjectsMap;
    return subjectsMap[subjectId];
  }

  handleFetchRankings(rankings) {
    const subjectsMap = this.createSubjectsMap(rankings);
    this.setState({
      rankings,
      subjectsMap
    });
  }

  createSubjectsMap(rankings) {
    const subjectsMap = {};
    rankings.forEach(function(ranking) {
        subjectsMap[ranking.subjectId] = ranking;
    }, this);

    return subjectsMap;
  }

}

export default alt.createStore(RankingsStore, 'RankingsStore');