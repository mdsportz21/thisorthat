import * as types from '../types'; // eslint-disable-line no-unused-vars

export default class {
  /**
   * And unselect other games
   * @param {types.TournamentGame} game
   * @param {string} gameId
   * @param {boolean} toSelect
   * @returns {types.TournamentGame} selected game
   */
  static selectTournamentGame(game, gameId) {
    let selectedGame = null;
    if (game.id === gameId) {
      game.selected = true;
      selectedGame = game;
    } else {
      game.selected = false;
    }

    const homeSourceGame = game.sides.home.seed.sourceGame;
    if (homeSourceGame != null) {
      const homeSelectedGame = this.selectTournamentGame(homeSourceGame, gameId);
      if (homeSelectedGame != null) {
        selectedGame = homeSelectedGame;
      }
    }

    const visitorSourceGame = game.sides.visitor.seed.sourceGame;
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
   * Recursively search the tree for the game with gameId. Once found, set the winner, and clear out the loser from any parent nodes.
   * @param {types.TournamentGame} root The game from which to start the search. from the root, traverse towards the first round.
   * @param {string} gameId ID of the game to set the winner on
   * @param {string} winningTeamId winner of the game
   * @param {?string} nextTournamentGameId ID of the game that the winner plays in next (parentId)
   * @returns {types.GameResult} winning and losing team of the game in question. passed up to the root from whichever game it was set. null if the game was not found in the bracket.
   */
  static setWinner(root, gameId, winningTeamId, nextTournamentGameId) {
    if (root.id === gameId) {
      // we've found the game on which to set the winner
      let gameWinningTeam;
      let gameLosingTeam;

      // determine which tournament side is the winner
      if (root.sides.home.team.id === winningTeamId) {
        root.sides.home.score.score = 1;
        root.sides.visitor.score.score = 0;
        gameWinningTeam = root.sides.home.team;
        gameLosingTeam = root.sides.visitor.team;
      } else {
        root.sides.home.score.score = 0;
        root.sides.visitor.score.score = 1;
        gameWinningTeam = root.sides.visitor.team;
        gameLosingTeam = root.sides.home.team;
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

    const homeSide = root.sides.home;
    const homeSourceGame = homeSide.seed.sourceGame;
    const visitorSide = root.sides.visitor;
    const visitorSourceGame = visitorSide.seed.sourceGame;

    // TODO: make this a subroutine so we can remove the duplicate code below
    if (homeSourceGame != null) {
      bracketResult = this.setWinner(homeSourceGame, gameId, winningTeamId, root.id);
      if (bracketResult != null) {
        if (bracketResult.nextTournamentGameId === root.id) {
          // the selected game is from the child of the root node
          if (homeSide.team === null || homeSide.team.id !== bracketResult.winningTeam.id) {
            homeSide.team = bracketResult.winningTeam;
            homeSide.score.score = 0;
            visitorSide.score.score = 0;
          }
        } else if (homeSide.team != null && homeSide.team.id === bracketResult.losingTeam.id) {
          // clear the loser if necessary
          homeSide.team = null;
          homeSide.score.score = 0;
        } else if (visitorSide.team != null && visitorSide.team.id === bracketResult.losingTeam.id) {
          // clear the loser if necessary
          visitorSide.team = null;
          visitorSide.score.score = 0;
        }

        return bracketResult;
      }
    }

    // same as above, but for the visitor source
    if (visitorSourceGame != null) {
      bracketResult = this.setWinner(visitorSourceGame, gameId, winningTeamId, root.id);
      if (bracketResult != null) {
        if (bracketResult.nextTournamentGameId === root.id) {
          if (visitorSide.team === null || visitorSide.team.id !== bracketResult.winningTeam.id) {
            visitorSide.team = bracketResult.winningTeam;
            visitorSide.score.score = 0;
            homeSide.score.score = 0;
          }
        } else if (homeSide.team != null && homeSide.team.id === bracketResult.losingTeam.id) {
          homeSide.team = null;
          homeSide.score.score = 0;
        } else if (visitorSide.team != null && visitorSide.team.id === bracketResult.losingTeam.id) {
          visitorSide.team = null;
          visitorSide.score.score = 0;
        }
      }

      return bracketResult;
    }

    return null;
  }
}
