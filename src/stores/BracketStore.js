import alt from '../alt';
import BracketActions from '../actions/BracketActions';
import BracketUtils from '../utils/BracketUtils';
import BracketGenerator from '../utils/BracketGenerator';
import * as types from '../types'; // eslint-disable-line no-unused-vars

class BracketStore {
  /**
   * @typedef {Object} SelectWinnerResponse
   * @property {types.TournamentSide} side the selected (winning) side
   */

  /**
   * @typedef {Object} SelectGameResponse
   * @property {string} gameId id of the selected game
   */

  /**
   * @typedef {Object} BracketFieldsResponse
   * @property {types.BracketField[]} bracketFields
   */

  /**
   * @typedef {Object} BracketInstanceResponse
   * @property {types.BracketInstance} bracketInstance
   */

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
    const { bracketDisplayInfo } = this.state;
    const { gamesForDisplay } = bracketDisplayInfo;
    const gamesForDisplayIndex = BracketGenerator.getFirstUnfilledGameForDisplayIndex(gamesForDisplay);
    this.handleShowPage(gamesForDisplayIndex);
  }

  /**
   *
   * @param {number} gamesForDisplayIndex
   */
  handleShowPage(gamesForDisplayIndex) {
    const { bracketDisplayInfo } = this.state;
    const { gamesForDisplay } = bracketDisplayInfo;
    const newDisplayedRootGame = gamesForDisplay[gamesForDisplayIndex];
    const selectedGame = BracketGenerator.selectDefaultTournamentGame(newDisplayedRootGame);

    // TODO: is there a way to set multiple properties on an object in one line?
    bracketDisplayInfo.displayedRootGame = newDisplayedRootGame;
    bracketDisplayInfo.gamesForDisplayIndex = gamesForDisplayIndex;
    bracketDisplayInfo.selectedGame = selectedGame;

    this.setState({
      bracketDisplayInfo,
    });
  }

  /**
   * @param {SelectWinnerResponse} response
   */
  handleSelectWinner(response) {
    const { side } = response;
    /** @type {types.BracketStore} */
    const { bracketDisplayInfo } = this.state;
    const { rootGame, displayedRootGame } = bracketDisplayInfo;

    BracketUtils.setWinner(rootGame, side);
    BracketUtils.setWinner(displayedRootGame, side);

    // TODO: verify that i have to do this
    bracketDisplayInfo.rootGame = rootGame;
    bracketDisplayInfo.displayedRootGame = displayedRootGame;

    this.setState({
      bracketDisplayInfo,
    });

    this.handleShowFirstUnfinishedPage();
  }

  /**
   *
   * @param {SelectGameResponse} response
   */
  handleSelectGame(response) {
    /** @type {types.BracketStore} */
    const { bracketDisplayInfo } = this.state;
    const { displayedRootGame } = bracketDisplayInfo;
    const { gameId } = response;

    const selectedGame = BracketUtils.selectTournamentGame(displayedRootGame, gameId);

    // TODO: not sure if we need to do:
    // bracketDisplayInfo.displayedRootGame = displayedRootGame;

    this.setState({
      // TODO: not sure if we need to set:
      bracketDisplayInfo,
      selectedGame,
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
   * @param {BracketFieldsResponse} bracketFieldsResponse
   */
  handleFetchBracketFields(bracketFieldsResponse) {
    const { bracketFields } = bracketFieldsResponse;

    this.setState({
      bracketFields,
    });
  }

  /**
   *
   * @param {BracketInstanceResponse} response
   */
  handleGenerateBracketInstance(response) {
    const { bracketInstance } = response;
    const { bracketField, rounds } = bracketInstance;
    const { teams } = bracketField;

    const bracketDisplayInfo = BracketGenerator.generateBracketDisplayInfo(rounds, teams);

    this.setState({
      bracketInstance,
      bracketDisplayInfo,
    });
  }
}

export default alt.createStore(BracketStore, 'BracketStore');
