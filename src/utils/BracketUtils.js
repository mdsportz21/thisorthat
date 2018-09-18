import * as types from '../types'; // eslint-disable-line no-unused-vars

export default class {
  /**
   * @typedef {Object} GameResult
   * @property {string} nextTournamentGameId
   * @property {types.TournamentTeam} winningTeam
   * @property {types.TournamentTeam} losingTeam
   */

  /**
   * And unselect other games
   * @param {types.TournamentGame} game
   * @param {string} gameId
   * @param {boolean} toSelect
   * @returns {types.TournamentGame} selected game
   */
  static selectTournamentGame(game, gameId) {
    let selectedGame = null;
    const tournamentGame = game;
    if (tournamentGame.id === gameId) {
      tournamentGame.selected = true;
      selectedGame = tournamentGame;
    } else {
      tournamentGame.selected = false;
    }

    const homeSourceGame = tournamentGame.sides.home.seed.sourceGame;
    if (homeSourceGame != null) {
      const homeSelectedGame = this.selectTournamentGame(homeSourceGame, gameId);
      if (homeSelectedGame != null) {
        selectedGame = homeSelectedGame;
      }
    }

    const visitorSourceGame = tournamentGame.sides.visitor.seed.sourceGame;
    if (visitorSourceGame != null) {
      const visitorSelectedGame = this.selectTournamentGame(visitorSourceGame, gameId);
      if (visitorSelectedGame != null) {
        selectedGame = visitorSelectedGame;
      }
    }

    return selectedGame;
  }

  /**
   * Returns winning team, or null if tied
   * @param {types.TournamentGame} game
   * @returns {types.TournamentSide}
   */
  static getTournamentGameWinningSide(game) {
    const sideOne = game.sides.home;
    const sideTwo = game.sides.visitor;
    if (sideOne.score.score === sideTwo.score.score) {
      return null;
    }

    return sideOne.score.score > sideTwo.score.score ? sideOne : sideTwo;
  }

  /**
   *
   * @param {types.TournamentGame} root root of the bracket with the game
   * @param {types.TournamentSide} side winning side
   */
  static setWinner(root, side) {
    this.setWinnerHelper(root, side.gameId, side.team.id, null);
  }

  /**
   * Recursively search the tree for the game with gameId. 
   * Once found, set the winner, and clear out the loser from any parent nodes.
   * @param {types.TournamentGame} root The game from which to start the search. 
   * from the root, traverse towards the first round.
   * @param {string} gameId ID of the game to set the winner on
   * @param {string} winningTeamId winner of the game
   * @param {?string} nextTournamentGameId ID of the game that the winner plays in next (parentId)
   * @returns {?GameResult} winning and losing team of the game in question. 
   * passed up to the root from whichever game it was set. null if the game was not found in the bracket.
   */
  static setWinnerHelper(root, gameId, winningTeamId, nextTournamentGameId) {
    const rootTournamentGame = root;
    if (rootTournamentGame.id === gameId) {
      // we've found the game on which to set the winner
      let gameWinningTeam;
      let gameLosingTeam;

      // determine which tournament side is the winner
      if (rootTournamentGame.sides.home.team.id === winningTeamId) {
        rootTournamentGame.sides.home.score.score = 1;
        rootTournamentGame.sides.visitor.score.score = 0;
        gameWinningTeam = rootTournamentGame.sides.home.team;
        gameLosingTeam = rootTournamentGame.sides.visitor.team;
      } else {
        rootTournamentGame.sides.home.score.score = 0;
        rootTournamentGame.sides.visitor.score.score = 1;
        gameWinningTeam = rootTournamentGame.sides.visitor.team;
        gameLosingTeam = rootTournamentGame.sides.home.team;
      }

      // this will be used to set info on the parent nodes
      return {
        nextTournamentGameId,
        winningTeam: gameWinningTeam,
        losingTeam: gameLosingTeam,
      };
    }

    // we didn't find the selected game in this root node, so try the source games
    let bracketResult;

    const homeSide = rootTournamentGame.sides.home;
    const homeSourceGame = homeSide.seed.sourceGame;
    const visitorSide = rootTournamentGame.sides.visitor;
    const visitorSourceGame = visitorSide.seed.sourceGame;

    if (homeSourceGame != null) {
      bracketResult = this.setWinnerHelper(homeSourceGame, gameId, winningTeamId, rootTournamentGame.id);
      if (bracketResult != null) {
        this.setTournamentSideTeams(bracketResult, rootTournamentGame, homeSide, visitorSide);
        return bracketResult;
      }
    }

    // same as above, but for the visitor source
    if (visitorSourceGame != null) {
      bracketResult = this.setWinnerHelper(visitorSourceGame, gameId, winningTeamId, rootTournamentGame.id);
      if (bracketResult != null) {
        this.setTournamentSideTeams(bracketResult, rootTournamentGame, visitorSide, homeSide);
        return bracketResult;
      }
    }

    return null;
  }

  /**
   * Subroutine of setWinnerHelper
   * @param {GameResult} bracketResult
   * @param {types.TournamentGame} root
   * @param {types.TournamentSide} thisSide
   * @param {types.TournamentSide} otherSide
   */
  static setTournamentSideTeams(bracketResult, root, thisSide, otherSide) {
    const thisTournamentSide = thisSide;
    const otherTournamentSide = otherSide;
    if (bracketResult.nextTournamentGameId === root.id) {
      // the selected game is from the child of the root node
      if (thisTournamentSide.team === null || thisTournamentSide.team.id !== bracketResult.winningTeam.id) {
        // Add the new winner to the next round
        thisTournamentSide.team = bracketResult.winningTeam;
        thisTournamentSide.score.score = 0;
        otherTournamentSide.score.score = 0;
      }
    } else if (thisTournamentSide.team != null && thisTournamentSide.team.id === bracketResult.losingTeam.id) {
      // clear the loser if necessary
      thisTournamentSide.team = null;
      thisTournamentSide.score.score = 0;
    } else if (otherTournamentSide.team != null && otherTournamentSide.team.id === bracketResult.losingTeam.id) {
      // clear the loser if necessary
      otherTournamentSide.team = null;
      otherTournamentSide.score.score = 0;
    }
  }
}
