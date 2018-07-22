import alt from '../alt';
import DeduperActions from '../actions/DeduperActions';

class DeduperStore {

  constructor() {
    this.bindListeners({
      handleFetchDupes: DeduperActions.fetchDupes,
      handleSaveDupes: DeduperActions.saveDupes
    });

    this.state = {
      isLoaded: false
    };
  }

  handleFetchDupes(response) {
    const { teams, name } = response.dupeGroup;
    this.setState({
      teams,
      name,
      isLoaded: true
    });
  }

  handleSaveDupes(response) {
    this.setState({ isLoaded: false })
  }

}

export default alt.createStore(DeduperStore, 'DeduperStore');