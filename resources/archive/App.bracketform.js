import React, { PureComponent } from 'react';
import './App.css';
import connectToStores from 'alt-utils/lib/connectToStores';
import BracketForm from './components/BracketForm';

class App extends PureComponent {

  handleSubmit(event) {
    alert(event);
    console.log(event);
  }

  render() {
    return (
      <BracketForm
        onSubmit={(e) => this.handleSubmit(e)}
      />
    );
  }
}

App.getStores = function() {
  // return [SubjectStore, RankingsStore];
  return [];
};

App.getPropsFromStores = function() {
  // const subjectState = SubjectStore.getState();
  // const rankingsState = RankingsStore.getState();
  return {
    // subjects: subjectState.subjects,
    // responseSaved: subjectState.responseSaved,
    // percentCompleted: subjectState.percentCompleted,
    // rankings: rankingsState.rankings
  };
};

export default connectToStores(App);

// 1. https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router/42121109#42121109