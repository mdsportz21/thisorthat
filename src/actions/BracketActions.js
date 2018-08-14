import alt from '../alt';
import axios from 'axios';
import BracketUtils from '../utils/BracketUtils';
import UrlUtils from '../utils/UrlUtils';
import * as types from '../types';

class BracketActions {

  /**
   * Select a winner of a game
   * @param {TournamentSide} side 
   */
  selectWinner(side) {
    return (dispatch) => {
      dispatch({
        side
      });
    };
  }

  /**
   * Highlights a game
   * @param {string} gameId 
   */
  selectGame(gameId) {
    return (dispatch) => {
      dispatch({
        gameId
      });
    };
  }
  /**
   * 
   * @param {TournamentGame} finalTournamentGame 
   * @param {string} bracketName 
   */
  saveBracket(finalTournamentGame, bracketName) {
    const bracketResults = BracketUtils.collectResults(finalTournamentGame);
    return (dispatch) => {
      axios.post(UrlUtils.constructUrl('api/bracket/' + bracketName + '/results'), bracketResults)
        .then(function (response) {
          dispatch(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  }

  /**
   * 
   * @param {string} bracketName name of bracket
   * @param {string} entryName name of bracket response
   */
  fetchBracket(bracketName, entryName) {
    return (dispatch) => {
      axios.get(UrlUtils.constructUrl('api/bracket/' + bracketName))
        .then(response => {
          dispatch(response.data);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }

  fetchBracketFields() {
    return (dispatch) => {
      axios.get(UrlUtils.constructUrl('api/bracket'))
        .then(response => {
          dispatch(response.data);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }

  generateBracketInstance(bracketFieldId) {
    return (dispatch) => {
      const bracketInstanceCreationRequest = {
        'user': 'mdsportz21',
        'seedingStrategy': 'random'
      };
      axios.post(UrlUtils.constructUrl('api/bracket/' + bracketFieldId + '/instance'), bracketInstanceCreationRequest)
        .then(function (response) {
          dispatch(response.data);
        })
        .catch(function (error) {
          console.error(error)
        });
    }
  }
}

export default alt.createActions(BracketActions);