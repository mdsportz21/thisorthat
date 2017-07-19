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

  handleFetchSubjects(subjects) {
    this.setState( { 
      subjects,
      responseSaved: false
    });
  }

  handleSaveSelection(responseSaved) {
    this.setState( { responseSaved } );
  }
}

export default alt.createStore(SubjectStore, 'SubjectStore');