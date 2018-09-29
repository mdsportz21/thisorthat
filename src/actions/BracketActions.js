import axios from 'axios';
import alt from '../alt';
import BracketResultsGenerator from '../utils/BracketResultsGenerator';
import UrlUtils from '../utils/UrlUtils';
import * as types from '../types'; // eslint-disable-line no-unused-vars

class BracketActions {
  /**
   * Select a winner of a game
   * @param {types.TournamentSide} side
   */
  selectWinner(side) {
    return (dispatch) => {
      dispatch({
        side,
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
        gameId,
      });
    };
  }

  /**
   *
   * @param {number} pageIndex
   */
  showPage(pageIndex) {
    return (dispatch) => {
      dispatch({
        pageIndex
      });
    };
  }

  showFirstUnfinishedPage() {
    return (dispatch) => {
      dispatch({});
    };
  }

  /**
   *
   * @param {types.TournamentGame} finalTournamentGame
   * @param {string} bracketName
   */
  saveBracket(finalTournamentGame, bracketName) {
    const bracketResults = BracketResultsGenerator.collectResults(finalTournamentGame);
    return (dispatch) => {
      axios.post(UrlUtils.constructUrl(`api/bracket/${bracketName}/results`), bracketResults)
        .then((response) => {
          dispatch(response.data);
        })
        .catch((error) => {
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
      axios.get(UrlUtils.constructUrl(`api/bracket/${bracketName}`))
        .then((response) => {
          dispatch(response.data);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    };
  }

  fetchBracketFields(auth) {
    const { getAccessToken } = auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
    return (dispatch) => {
      axios.get(UrlUtils.constructUrl('api/bracket'), { headers })
        .then((response) => {
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
        user: 'mdsportz21',
        seedingStrategy: 'random',
      };
      axios.post(UrlUtils.constructUrl(`api/bracket/${bracketFieldId}/instance`), bracketInstanceCreationRequest)
        .then((response) => {
          dispatch(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }
}

export default alt.createActions(BracketActions);
