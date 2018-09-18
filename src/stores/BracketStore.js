import alt from '../alt';
import BracketActions from '../actions/BracketActions';
import BracketUtils from '../utils/BracketUtils';
import BracketGenerator from '../utils/BracketGenerator';
import * as types from '../types'; // eslint-disable-line no-unused-vars

class BracketStore {

  constructor() {
    this.bindListeners({
      handleSaveBracket: BracketActions.saveBracket,
      handleFetchBracket: BracketActions.fetchBracket,
      handleSelectGame: BracketActions.selectGame,
      handleSelectWinner: BracketActions.selectWinner,
      handleFetchBracketFields: BracketActions.fetchBracketFields,
      handleGenerateBracketInstance: BracketActions.generateBracketInstance,
      handleShowPage: BracketActions.showPage,
      handleShowFirstUnfinishedPage: BracketActions.showFirstUnfinishedPage,
    });

    /** @type {types.BracketStore} */
    this.state = {
      homeOnTop: false,
    };
  }

  handleShowFirstUnfinishedPage() {
    const { gamesForDisplay } = this.state;
    const gamesForDisplayIndex = BracketGenerator.getFirstUnfilledGameForDisplayIndex(gamesForDisplay);
    this.handleShowPage({pageIndex: gamesForDisplayIndex});
  }

  /**
   *
   * @param {{pageIndex: number}} response
   */
  handleShowPage(response) {
    const { pageIndex: gamesForDisplayIndex } = response;
    const { gamesForDisplay } = this.state;
    const displayedRootGame = gamesForDisplay[gamesForDisplayIndex];
    const selectedGame = BracketGenerator.selectDefaultTournamentGame(displayedRootGame);

    this.setState({
      gamesForDisplayIndex,
      displayedRootGame,
      selectedGame,
    });
  }

  /**
   * @param {{side: types.TournamentSide}} response
   */
  handleSelectWinner(response) {
    const { side } = response;
    /** @type {types.BracketStore} */
    const { rootGame, displayedRootGame } = this.state;

    BracketUtils.setWinner(rootGame, side);
    BracketUtils.setWinner(displayedRootGame, side);

    this.setState({
      rootGame,
      displayedRootGame
    });

    this.handleShowFirstUnfinishedPage();
  }

  /**
   *
   * @param {{gameId: string}} response
   */
  handleSelectGame(response) {
    /** @type {types.BracketStore} */
    const { displayedRootGame } = this.state;
    const { gameId } = response;

    const selectedGame = BracketUtils.selectTournamentGame(displayedRootGame, gameId);

    this.setState({
      displayedRootGame,
      selectedGame
    });
  }

  // TODO: rewrite this once we are fetching brackets again
  handleFetchBracket(bracketResponse) {
    console.log(bracketResponse);
    // const bracketInstance = bracketResponse.bracket_wrapper;
    // const rounds = bracketInstance.bracket.rounds;

    // /**
    //  * We're gonna need this to fill out sides.
    //  */
    // const teamsBySlotId = BracketUtils.getTeamsBySlotId(bracketInstance.teams);
    // const finalTournamentGame = BracketUtils.getFinalTournamentGame(rounds, teamsBySlotId);
    // const selectedGame = BracketUtils.selectDefaultTournamentGame(finalTournamentGame);

    // this.setState({
    //   bracketInstance,
    //   teamsBySlotId,
    //   finalTournamentGame,
    //   selectedGame
    // });
  }

  // TODO: rewrite this once we're saving bracket instances again
  handleSaveBracket(response) {
    console.log(response);
  }

  /**
   *
   * @param {{bracketFields: types.BracketField[]}} bracketFieldsResponse
   */
  handleFetchBracketFields(bracketFieldsResponse) {
    const { bracketFields } = bracketFieldsResponse;

    this.setState({
      bracketFields,
    });
  }

  /**
   *
   * @param {{bracketInstance: types.BracketInstance}} response
   */
  handleGenerateBracketInstance(response) {
    const { bracketInstance } = response;
    const { bracketField, rounds } = bracketInstance;
    const { teams } = bracketField;

    const bracketDisplayInfo = BracketGenerator.generateBracketDisplayInfo(rounds, teams);

    this.setState({
      bracketInstance,
      ...bracketDisplayInfo,
    });
  }
}

export default alt.createStore(BracketStore, 'BracketStore');
