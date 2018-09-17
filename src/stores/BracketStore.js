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
    });

    /** @type {types.BracketStore} */
    this.state = {
      homeOnTop: false,
    };
  }

  /**
   * @param {SelectWinnerResponse} response
   */
  handleSelectWinner(response) {
    const { side } = response;
    const { finalTournamentGame } = this.state;


    BracketUtils.setWinner(finalTournamentGame, side.gameId, side.team.id, null);
    const selectedGame = BracketGenerator.selectDefaultTournamentGame(finalTournamentGame);

    this.setState({
      finalTournamentGame,
      selectedGame,
    });
  }

  /**
   *
   * @param {SelectGameResponse} response
   */
  handleSelectGame(response) {
    const { finalTournamentGame } = this.state;
    const { gameId } = response;

    const selectedGame = BracketUtils.selectTournamentGame(finalTournamentGame, gameId);

    this.setState({
      finalTournamentGame,
      selectedGame,
    });
  }

  // TODO: update this
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

  // TODO: revisit this
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

    const { rootGame, teamsById, gamesForDisplay } = BracketGenerator.generateBracket(rounds, teams);
    const gamesForDisplayIndex = BracketGenerator.getFirstUnfilledGameForDisplayIndex(gamesForDisplay);
    const selectedGame = BracketGenerator.selectDefaultTournamentGame(gamesForDisplay[gamesForDisplayIndex]);

    this.setState({
      bracketInstance,
      teamsById,
      rootGame,
      selectedGame,
      gamesForDisplay,
      gamesForDisplayIndex,
    });
  }
}

export default alt.createStore(BracketStore, 'BracketStore');
