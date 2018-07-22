import alt from '../alt';
import axios from 'axios';
import BracketUtils from '../utils/BracketUtils';
import UrlUtils from '../utils/UrlUtils';

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
   * @param {TournamentGame} finals 
   * @param {string} bracketName 
   */
  saveBracket(finals, bracketName) {
    const bracketResults = BracketUtils.collectResults(finals);
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
}

export default alt.createActions(BracketActions);