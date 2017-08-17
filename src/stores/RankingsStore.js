import alt from '../alt';
import RankingsActions from '../actions/RankingsActions';
import SubjectActions from '../actions/SubjectActions';
import SubjectStore from './SubjectStore';

class RankingsStore {
  constructor() {

    this.exportPublicMethods({
      getSubjectById: this.getSubjectById
    });

    this.bindListeners({
      handleFetchRankings: RankingsActions.fetchRankings,
      handleFetchSubjects: SubjectActions.fetchSubjects
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
    const subjects = SubjectStore.getState().subjects;
    rankings = this.updateRankings(rankings, subjects);
    this.setState({
      rankings,
      subjectsMap
    });
  }

  handleFetchSubjects(subjectResponse) {
    const rankings = this.updateRankings(this.state.rankings, subjectResponse.subjects);

    this.setState({
      rankings
    });
  }

  updateRankings(rankings, subjects) {
    const subjectIds = subjects.map(subject => subject.subjectId);
    rankings.forEach(function(ranking) {
      if (subjectIds.indexOf(ranking.subjectId) !== -1) {
        ranking.selected = true;
      }
    });

    rankings.sort(function(a,b) {

      if ((a.selected && b.selected) || (!a.selected && !b.selected)) {
        return a.rank - b.rank;
      }

      if (a.selected) {
        return -1;
      }

      if (b.selected) {
        return 1;
      }

      return 0;
    });

    return rankings;
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