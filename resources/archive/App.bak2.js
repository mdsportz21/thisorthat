import React, { PureComponent } from 'react';
import './App.css';
import Subject from './components/Subject';
import SubjectStore from './stores/SubjectStore';
import SubjectActions from './actions/SubjectActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Rankings from './components/Rankings';
import RankingsStore from './stores/RankingsStore';
import RankingsActions from './actions/RankingsActions';
import { Line } from 'rc-progress';

class App extends PureComponent {

  componentDidMount() {
    SubjectActions.fetchSubjects();
    RankingsActions.fetchRankings();
  }

  componentDidUpdate() {
    if (this.props.responseSaved) {
      SubjectActions.fetchSubjects();
      RankingsActions.fetchRankings();
    }
  }

  onClick(subjectId) {
    this.props.subjects.forEach((subject) => {
      subject.selected = (subject.subjectId === subjectId);
    });
    SubjectActions.saveSelection(this.props.subjects);
  }

  // compareSubjects(subjectOne, subjectTwo) {
  //   return subjectOne && subjectTwo && subjectOne.imgLink
  // }

  render() {
    const subjects = this.props.subjects;
    if(!subjects || subjects.length < 2) {
      return(<div></div>);
    }
    const subjectOne = subjects[0];
    const subjectTwo = subjects[1];

    const rankings = this.props.rankings;
    const percentCompleted = (this.props.percentCompleted * 100).toFixed(1);

    return (
      <div className="App">
        <div className="Title">
          <h2>This or That?</h2>
        </div>
        <div className="Subjects">
            <Subject 
              subjectId={subjectOne.subjectId}
              imgLink={subjectOne.imgLink} 
              altText={subjectOne.name}
              name={subjectOne.name}
              onClick={(e) => this.onClick(e)}
              />
            <h3 className="Or">or</h3>
            <Subject 
              subjectId={subjectTwo.subjectId}
              imgLink={subjectTwo.imgLink}
              altText={subjectTwo.name}
              name={subjectTwo.name}
              onClick={(e) => this.onClick(e)}
              />
        </div>
        <div className="line">
          <div>Comparisons Completed: {percentCompleted}%</div>
          <Line percent={percentCompleted} strokeWidth="2" strokeColor="#000000" />
        </div>
        <Rankings
          rankings={rankings} 
          />
      </div>
    );
  }
}

App.getStores = function() {
  return [SubjectStore, RankingsStore];
};

App.getPropsFromStores = function() {
  const subjectState = SubjectStore.getState();
  const rankingsState = RankingsStore.getState();
  return {
    subjects: subjectState.subjects,
    responseSaved: subjectState.responseSaved,
    percentCompleted: subjectState.percentCompleted,
    rankings: rankingsState.rankings
  };
};

export default connectToStores(App);
