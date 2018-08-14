import alt from '../alt';
import BracketActions from '../actions/BracketActions';
import BracketUtils from '../utils/BracketUtils';
import * as types from '../types';

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

  constructor() {
    this.bindListeners({
      handleSaveBracket: BracketActions.saveBracket,
      handleFetchBracket: BracketActions.fetchBracket,
      handleSelectGame: BracketActions.selectGame,
      handleSelectWinner: BracketActions.selectWinner,
      handleFetchBracketFields: BracketActions.fetchBracketFields,
      handleGenerateBracketInstance: BracketActions.generateBracketInstance
    });

    /** @type {types.BracketStore} */
    this.state = {
      homeOnTop: false
    };
  }

  /**
   * @param {SelectWinnerResponse} response
   */
  handleSelectWinner(response) {
    const { side } = response;
    const { finalTournamentGame } = this.state;


    BracketUtils.setWinner(finalTournamentGame, side.gameId, side.team.id, null);
    const selectedGame = BracketUtils.selectDefaultTournamentGame(finalTournamentGame);

    this.setState({
      finalTournamentGame,
      selectedGame
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
      selectedGame
    });
  }

  // TODO: update this
  handleFetchBracket(bracketResponse) {
    const bracketInstnace = bracketResponse.bracket_wrapper;
    const rounds = bracketInstnace.bracket.rounds;

    /**
     * We're gonna need this to fill out sides.
     */
    const teamsBySlotId = BracketUtils.getTeamsBySlotId(bracketInstnace.teams);
    const finalTournamentGame = BracketUtils.getFinalTournamentGame(rounds, teamsBySlotId);
    const selectedGame = BracketUtils.selectDefaultTournamentGame(finalTournamentGame);

    this.setState({
      bracketInstnace,
      teamsBySlotId,
      finalTournamentGame,
      selectedGame
    });
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
      bracketFields
    });
  }

  /**
   * 
   * @param response { import("../utils/BracketUtils").BracketInstance }
   */
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