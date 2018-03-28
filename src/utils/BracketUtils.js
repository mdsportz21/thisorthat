export default class {

  // Backend Types

  /**
   * A bracket wrapper
   * @typedef {Object} BracketWrapper
   * @property {Bracket} bracket
   * @property {Team[]} teams
   */

  /**
   * A bracket
   * @typedef {Object} Bracket
   * @property {Round[]} rounds
   * @property {string} name
   * @property {string} id - not there yet but it should be. we'll need to get and save brackets. for now, we'll use the name.
   */

  /**
   * A round
   * @typedef {Object} Round
   * @property {Matchup[]} matchups
   */

  /**
   * A matchup.
   * @typedef {Object} Matchup
   * @property {string} matchupId
   * @property {string} sourceMatchupTwoId
   * @property {string} sourceMatchupOneId
   * @property {string} slotOneId
   * @property {string} slotTwoId
   * @property {string} winnerSlotId - winner
   * @property {string} region
   */

  /**
   * A team
   * @typedef {Object} Team
   * @property {string} name
   * @property {string} imgLink
   * @property {string} slotId
   * @property {string} seed
   */

  /**
  * Bracket Results
  * @typedef {Object} BracketResults
  * @property {BracketResult[]} results
  */

  /**
   * Bracket Result
   * @typedef {Object} BracketResult
   * @property {string} matchupId
   * @property {string} winnerSlotId
   */

  // React Tournament Bracket Types (Frontend Types)

  /**
   * A Team
   * @typedef {Object} TournamentTeam
   * @property {string} id
   * @property {string} name
   */

  /**
   * A Score
   * @typedef {Object} TournamentScore
   * @property {number} score
   */

  /**
   * A Game. Brackets are built from the finals to the first round, recursively, using gameObject.sides.visitor|home.seed.sourceGame.
   * @typedef {Object} TournamentGame
   * @property {string} id
   * @property {string} name
   * @property {TournamentSides} sides
   * @property {boolean} selected
   */

  /**
   * A Seed
   * @typedef {Object} TournamentSeed
   * @property {TournamentGame} sourceGame
   * @property {number} rank
   * @property {string} displayName
   */

  /**
   * A Side
   * @typedef {Object} TournamentSide
   * @property {string} gameId
   * @property {TournamentTeam} team
   * @property {TournamentScore} score
   * @property {TournamentSeed} seed
   */

  /**
   * Sides
   * @typedef {Object} TournamentSides
   * @property {TournamentSide} visitor
   * @property {TournamentSide} home
   */

// To React Bracket

  /**
   * 
   * @param {Team[]} teams 
   * @returns {Object.<string, Team>} teams by slot ID
   */
  static getTeamsBySlotId(teams) {
    return teams.reduce(function(teamsBySlotId, team) {
      teamsBySlotId[team.slotId] = team;
      return teamsBySlotId;
    }, {});
  }

  /**
   * 
   * @param {String} slotId 
   * @param {Object.<string, Team>} teamsBySlotId
   * @returns {TournamentTeam} team
   */
  static createTeam(slotId, teamsBySlotId) {
    if (slotId === "None") {
      return null;
    }
    const team = teamsBySlotId[slotId];
    return {
      "id": team.slotId,
      "name": team.seed + ' ' + team.name
    };
  }

  /**
   * 
   * @param {string} slotId
   * @param {string} winnerSlotId 
   * @returns {TournamentScore}
   */
  static createScore(slotId, winnerSlotId) {
    const score = winnerSlotId !== "None" && winnerSlotId === slotId ? 1 : 0;
    return {
      "score": score
    };
  }

  /**
   * 
   * @param {string} sourceMatchupId 
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentSeed}
   */
  static createSeed(sourceMatchupId, gamesByMatchupId) {
    return {
      "sourceGame": this.getSourceGame(sourceMatchupId, gamesByMatchupId),
      "rank": 1,
      "displayName": ""
    };
  }

  /**
   * 
   * @param {string} sourceMatchupId 
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentGame}
   */
  static getSourceGame(sourceMatchupId, gamesByMatchupId) {
    if (sourceMatchupId !== null && gamesByMatchupId.hasOwnProperty(sourceMatchupId)) {
      return gamesByMatchupId[sourceMatchupId];
    }

    return null;
  }

  /**
   * 
   * @param {string} matchupId
   * @param {string} slotId 
   * @param {string} sourceMatchupId 
   * @param {string} winnerSlotId 
   * @param {Object.<string, Team>} teamsBySlotId
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentSide}
   */
  static createSide(matchupId, slotId, sourceMatchupId, winnerSlotId, teamsBySlotId, gamesByMatchupId) {
    return {
      "gameId": matchupId,
      "team": this.createTeam(slotId, teamsBySlotId),
      "score": this.createScore(slotId, winnerSlotId),
      "seed": this.createSeed(sourceMatchupId, gamesByMatchupId)
    };
  }

  /**
   * 
   * @param {number} roundIdx 
   * @param {number} matchupIdx 
   * @returns {string}
   */
  static createGameName(roundIdx, matchupIdx) {
    return "Game " + roundIdx + matchupIdx;
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {Object.<string, Team>} teamsBySlotId
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentSides}
   */
  static createSides(matchup, teamsBySlotId, gamesByMatchupId) {
    return {
      "visitor": this.createSide(matchup.matchupId, matchup.slotOneId, matchup.sourceMatchupOneId, matchup.winnerSlotId, teamsBySlotId, gamesByMatchupId),
      "home": this.createSide(matchup.matchupId, matchup.slotTwoId, matchup.sourceMatchupTwoId, matchup.winnerSlotId, teamsBySlotId, gamesByMatchupId)
    };
  }

  /**
   * 
   * @param {number} roundIdx 
   * @param {number} matchupIdx 
   * @param {Round[]} rounds
   * @returns {Matchup}
   */
  static getMatchup(roundIdx, matchupIdx, rounds) {
    return rounds[roundIdx].matchups[matchupIdx];
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {number} roundIdx 
   * @param {number} matchupIdx 
   * @param {Object.<string, Team>} teamsBySlotId
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentGame}
   */
  static createGame(matchup, roundIdx, matchupIdx, teamsBySlotId, gamesByMatchupId) {
    return {
      "id": matchup.matchupId,
      "name": this.createGameName(roundIdx, matchupIdx),
      "sides": this.createSides(matchup, teamsBySlotId, gamesByMatchupId),
      "selected": false
      // "scheduled": 0
    };
  }

  /**
   * Creates the games for a round
   * 
   * @param {Round} round 
   * @param {number} roundIdx 
   * @param {Object.<string, Team>} teamsBySlotId
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   */
  static createGames(round, roundIdx, teamsBySlotId, gamesByMatchupId) {
    return round.matchups.map((matchup, matchupIdx) => {
      const game = this.createGame(matchup, roundIdx, matchupIdx, teamsBySlotId, gamesByMatchupId);
      gamesByMatchupId[matchup.matchupId] = game;
      return game;
    }, this);
  }

  // To Persistence

  /**
   * 
   * @param {TournamentGame} finals 
   * @param {number} invRound
   * @param {}
   * @returns {Bracket}
   */
  static toPersistence(finals, invRound) {
  }

  // Utilities

  /**
   * And unselect other games
   * @param {TournamentGame} game 
   * @param {string} gameId 
   * @param {boolean} toSelect
   * @returns {TournamentGame} selected game
   */
  static selectGame(game, gameId) {
    let selectedGame = null;
    if (game.id === gameId) {
      game.selected = true;
      selectedGame = game;
    } else {
      game.selected = false;
    }
    
    const homeSourceGame = game.sides.home.seed.sourceGame;
    if (homeSourceGame != null) {
      const homeSelectedGame = this.selectGame(homeSourceGame, gameId);
      if (homeSelectedGame != null) {
        selectedGame = homeSelectedGame;
      }
    }

    const visitorSourceGame = game.sides.visitor.seed.sourceGame;
    if (visitorSourceGame != null) {
      const visitorSelectedGame = this.selectGame(visitorSourceGame, gameId);
      if (visitorSelectedGame != null) {
        selectedGame = visitorSelectedGame;
      }
    }

    return selectedGame;
  }

  /**
   * 
   * @param {Round[]} rounds 
   * @param {Object.<string, TournamentTeam>} teamsBySlotId 
   * @returns {TournamentGame}
   */
  static getFinals(rounds, teamsBySlotId) {
    const gamesByMatchupId = this.getGamesByMatchupId(rounds, teamsBySlotId);
    const finalsMatchupId = rounds[rounds.length - 1].matchups[0].matchupId;
    return gamesByMatchupId[finalsMatchupId];
  }

  /**
   * 
   * @param {TournamentGame} finals 
   * @returns {TournamentGame}
   */
  static selectDefaultGame(finals) {
    let firstUnfilledGame = this.getFirstUnfilledGame(finals);
    if (firstUnfilledGame == null) {
      firstUnfilledGame = finals;
    }
    
    firstUnfilledGame.selected = true;

    return firstUnfilledGame;
  }

  /**
   * 
   * @param {TournamentGame} game 
   * @returns {TournamentGame}
   */
  static getFirstUnfilledGame(game) {
    let unfilledGame = null;
    const homeSide = game.sides.home;
    const visitorSide = game.sides.visitor;
    const winningSide = this.getWinningSide(game);
    if (winningSide === null) {
      unfilledGame = game;
    }

    const homeSourceGame = homeSide.seed.sourceGame;
    if (homeSourceGame != null) {
      const unfilledGameFromHomeSource = this.getFirstUnfilledGame(homeSourceGame);
      if (unfilledGameFromHomeSource != null) {
        unfilledGame = unfilledGameFromHomeSource;
      }
    }

    const visitorSourceGame = visitorSide.seed.sourceGame;
    if (visitorSourceGame != null) {
      const unfilledGameFromVisitorSource = this.getFirstUnfilledGame(visitorSourceGame);
      if (unfilledGameFromVisitorSource != null) {
        unfilledGame = unfilledGameFromVisitorSource;
      }
    }

    return unfilledGame;
  }

  /**
   * Returns winning team, or null if tied
   * @param {TournamentGame} game  
   * @returns {TournamentSide}
   */
  static getWinningSide(game) {
    const sideOne = game.sides.home;
    const sideTwo = game.sides.visitor;
    if (sideOne.score.score === sideTwo.score.score) {
      return null
    }

    return sideOne.score.score > sideTwo.score.score ? sideOne : sideTwo;
  }

  /**
   * Map of matchupId to TournamentGame. Should be populated as the games are created.
   * @param {Round[]} rounds 
   * @param {Object.<string, TournamentTeam>} teamsBySlotId 
   * @returns {Object.<string, TournamentGame>}
   */
  static getGamesByMatchupId(rounds, teamsBySlotId) {
    const gamesByMatchupId = {};

    rounds.forEach((round, roundIdx) => {
      this.createGames(round, roundIdx, teamsBySlotId, gamesByMatchupId);
    });

    return gamesByMatchupId;
  }
  
  /**
   * Get results from bracket
   * @param {TournamentGame} root
   * @returns {BracketResults} list of bracket results
   */
  static collectResults(root) {
    const winnerSlotIdByMatchupId = this.getResults(root, {});
    const results = Object.entries(winnerSlotIdByMatchupId).map(([matchupId, winnerSlotId]) => {
      return {
        "matchupId": matchupId,
        "winnerSlotId": winnerSlotId
      };
    });

    return {
      results
    };
  }

  /**
   * Recursively search the tree to populate winners
   * @param {TournamentGame} root
   * @param {Object.<string, string>} winnerSlotIdByMatchupId
   * @returns {Object.<string, string>} map of matchup to slot 
   */
  static getResults(root, winnerSlotIdByMatchupId) {
    const winningSide = this.getWinningSide(root);
    if (winningSide != null) {
      winnerSlotIdByMatchupId[root.id] = winningSide.team.id;
    }

    const homeSourceGame = root.sides.home.seed.sourceGame;
    if (homeSourceGame != null) {
      this.getResults(homeSourceGame, winnerSlotIdByMatchupId);
    }

    const visitorSourceGame = root.sides.visitor.seed.sourceGame;
    if (visitorSourceGame != null) {
      this.getResults(visitorSourceGame, winnerSlotIdByMatchupId);
    }

    return winnerSlotIdByMatchupId;
  }

  /**
   * Recursively search the tree for the game with gameId. Once found, set the winner, and clear out the loser from any parent nodes.
   * @param {TournamentGame} root The game from which to start the search. from the root, traverse towards the first round.
   * @param {string} gameId ID of the game to set the winner on
   * @param {string} winningTeamId winner of the game
   * @param {string} parentId ID of the game that the winner plays in next
   * @returns {GameResult} winning and losing team of the game in question. passed up to the root from whichever game it was set. null if the game was not found in the bracket.
   */
  static setWinner(root, gameId, winningTeamId, parentId) {
    if (root.id === gameId) {
      let gameWinningTeam;
      let gameLosingTeam; 

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

      return {
        parentId: parentId,
        winningTeam: gameWinningTeam,
        losingTeam: gameLosingTeam
      };
    }
    
    let bracketResult;

    const homeSide = root.sides.home;
    const homeSourceGame = homeSide.seed.sourceGame;
    const visitorSide = root.sides.visitor;
    const visitorSourceGame = visitorSide.seed.sourceGame;

    if (homeSourceGame != null) {
      bracketResult = this.setWinner(homeSourceGame, gameId, winningTeamId, root.id);
      if (bracketResult != null) {
        if (bracketResult.parentId === root.id ) {
          if (homeSide.team === null || homeSide.team.id !== bracketResult.winningTeam.id) {
            homeSide.team = bracketResult.winningTeam;
            homeSide.score.score = 0
            visitorSide.score.score = 0;
          }
        } else if (homeSide.team != null && homeSide.team.id === bracketResult.losingTeam.id) {
          homeSide.team = null;
          homeSide.score.score = 0;
        } else if (visitorSide.team != null && visitorSide.team.id === bracketResult.losingTeam.id) {
          visitorSide.team = null;
          visitorSide.score.score = 0;
        }

        return bracketResult;
      }
    }

    if (visitorSourceGame != null) {
      bracketResult = this.setWinner(visitorSourceGame, gameId, winningTeamId, root.id);
      if (bracketResult != null) {
        if (bracketResult.parentId === root.id) {
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