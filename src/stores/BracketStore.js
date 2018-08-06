import alt from '../alt';
import BracketActions from '../actions/BracketActions';
import BracketUtils from '../utils/BracketUtils';

class BracketStore {

  constructor() {
    this.bindListeners({
      handleSaveBracket: BracketActions.saveBracket,
      handleFetchBracket: BracketActions.fetchBracket,
      handleSelectGame: BracketActions.selectGame,
      handleSelectWinner: BracketActions.selectWinner,
      handleFetchBracketFields: BracketActions.fetchBracketFields,
      handleGenerateBracketInstance: BracketActions.generateBracketInstance
    });

    this.state = {
      homeOnTop: false
    };
  }

  handleSelectWinner(response) {
    const { side } = response;
    const { finals } = this.state;

    BracketUtils.setWinner(finals, side.gameId, side.team.id, null);
    const selectedGame = BracketUtils.selectDefaultTournamentGame(finals);

    this.setState({
      finals,
      selectedGame
    });
  }

  handleSelectGame(response) {
    const { finals } = this.state;
    const { gameId } = response;

    const selectedGame = BracketUtils.selectTournamentGame(finals, gameId);

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
    const finals = BracketUtils.getFinalTournamentGame(rounds, teamsBySlotId);
    const selectedGame = BracketUtils.selectDefaultTournamentGame(finals);

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

  handleFetchBracketFields(bracketFieldsResponse) {
    const bracketFields = bracketFieldsResponse.bracketFields;

    this.setState({
      bracketFields
    });
  }

  handleGenerateBracketInstance(response) {
    const bracketInstance = response.bracketInstance;
    const { bracketField, rounds } = bracketInstance;
    const teams = bracketField.teams;

    const teamsById = BracketUtils.getTeamsById(teams);
    const finalTournamentGame = BracketUtils.getFinalTournamentGame(rounds, teamsById);
    const selectedGame = BracketUtils.selectDefaultTournamentGame(finalTournamentGame);

    this.setState({
      bracketInstance,
      teamsById,
      finalTournamentGame,
      selectedGame
    });
  }


}

export default alt.createStore(BracketStore, 'BracketStore');