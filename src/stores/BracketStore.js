import alt from '../alt';
import BracketActions from '../actions/BracketActions';
import BracketUtils from '../utils/BracketUtils';

class BracketStore {

  constructor() {
    this.bindListeners({
      handleSaveBracket: BracketActions.saveBracket,
      handleFetchBracket: BracketActions.fetchBracket,
      handleSelectGame: BracketActions.selectGame,
      handleSelectWinner: BracketActions.selectWinner
    });

    this.state = {
      homeOnTop: false
    };
  }

  handleSelectWinner(response) {
    const { side } = response;
    const { finals } = this.state;

    BracketUtils.setWinner(finals, side.gameId, side.team.id, null);
    const selectedGame = BracketUtils.selectDefaultGame(finals);

    this.setState({
      finals,
      selectedGame
    });
  }

  handleSelectGame(response) {
    const { finals } = this.state;
    const { gameId } = response;

    const selectedGame = BracketUtils.selectGame(finals, gameId);

    this.setState({
      finals,
      selectedGame
    });
  }

  handleFetchBracket(bracketResponse) {
    const bracketWrapper = bracketResponse.bracket_wrapper;
    const rounds = bracketWrapper.bracket.rounds;

    /**
     * We're gonna need this to fill out sides.
     */
    const teamsBySlotId = BracketUtils.getTeamsBySlotId(bracketWrapper.teams);
    const finals = BracketUtils.getFinals(rounds, teamsBySlotId);
    const selectedGame = BracketUtils.selectDefaultGame(finals);

    this.setState({
      bracketWrapper,
      teamsBySlotId,
      finals,
      selectedGame
    });
  }

  handleSaveBracket(response) {
    console.log(response);
  }
}

export default alt.createStore(BracketStore, 'BracketStore');