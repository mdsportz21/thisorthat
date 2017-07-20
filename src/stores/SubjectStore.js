import alt from '../alt';
import SubjectActions from '../actions/SubjectActions';

class SubjectStore {
  constructor() {
    this.bindListeners({
      handleFetchSubjects: SubjectActions.fetchSubjects,
      handleSaveSelection: SubjectActions.saveSelection
    });

    this.state = {
      subjects: []
    };
  }

  handleFetchSubjects(subjectResponse) {
    const subjects = subjectResponse.subjects;
    const percentCompleted = subjectResponse.percentCompleted; 
    this.setState( { 
      subjects,
      responseSaved: false,
      percentCompleted
    });
  }

  handleSaveSelection(responseSaved) {
    this.setState( { responseSaved } );
  }
}

export default alt.createStore(SubjectStore, 'SubjectStore');