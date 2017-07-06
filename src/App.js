import React, { PureComponent } from 'react';
import './App.css';
import Subject from './components/Subject';
import SubjectStore from './stores/SubjectStore';
import SubjectActions from './actions/SubjectActions';
import connectToStores from 'alt-utils/lib/connectToStores';

class App extends PureComponent {

  componentDidMount() {
    SubjectActions.fetchSubjects();
  }

  componentDidUpdate() {
    if (this.props.responseSaved) {
      SubjectActions.fetchSubjects();
    }
  }

  onClick(subjectId) {
    this.props.subjects.forEach((subject) => {
      subject.selected = (subject.id === subjectId);
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

    return (
      <div className="App">
        <div className="Title">
          <h2>This or That?</h2>
        </div>
        <div className="Subjects">
            <Subject 
              subjectId={subjectOne.id}
              imgLink={subjectOne.imgLink} 
              altText={subjectOne.imgDesc}
              description={subjectOne.description}
              onClick={(e) => this.onClick(e)}
              />
            <h3 className="Or">or</h3>
            <Subject 
              subjectId={subjectTwo.id}
              imgLink={subjectTwo.imgLink}
              altText={subjectTwo.imgDesc}
              description={subjectTwo.description}
              onClick={(e) => this.onClick(e)}
              />
        </div>
      </div>
    );
  }
}

App.getStores = function() {
  return [SubjectStore];
};

App.getPropsFromStores = function() {
  return SubjectStore.getState();
};

export default connectToStores(App);
