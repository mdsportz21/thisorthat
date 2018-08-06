export default class {

  // Backend Types

  /**
   * The main object
   * @typedef {Object} BracketInstance
   * @property {string} bracketInstanceId
   * @property {Round[]} rounds
   * @property {BracketField} bracketField the id of the bracket field the bracket instance was created from
   * @property {string} user
   */

   /**
    * @typedef {Object} BracketField
    * @property {string} bracketFieldId
    * @property {string} name
    * @property {Team[]} teams
    */

  /**
   * @typedef {Object} Round
   * @property {Matchup[]} matchups
   */

  /**
   * @typedef {Object} Matchup
   * @property {string} matchupId
   * @property {string} sourceMatchupTwoId
   * @property {string} sourceMatchupOneId
   * @property {string} teamOneId
   * @property {string} teamTwoId
   * @property {string} winnerTeamId
   */

  /**
   * @typedef {Object} Team
   * @property {string} name
   * @property {string} imgLink
   * @property {string} teamId
   * @property {number} seed
   */

  // Not sure if we'll keep using the following backend types
  // Alternatively, we can just send:
  // 1. bracket instance id
  // 2. list of rounds

  /**
  * Bracket Results
  * @typedef {Object} BracketResults
  * @property {BracketResult[]} results
  */

  /**
   * Bracket Result
   * @typedef {Object} BracketResult
   * @property {string} matchupId
   * @property {string} winnerTeamId
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

  // TODO: figure out if this is still what's being sent for null values
  // TODO: figure out how to do constants in js
  static NONE = "None";

  /**
   * 
   * @param {Team[]} teams 
   * @returns {Object.<string, Team>} teams by team ID
   */
  static getTeamsById(teams) {
    return teams.reduce(function(teamsById, team) {
      teamsById[team.teamId] = team;
      return teamsById;
    }, {});
  }

  /**
   * 
   * @param {String} teamId 
   * @param {Object.<string, Team>} teamsById
   * @returns {TournamentTeam} team
   */
  static createTournamentTeam(teamId, teamsById) {
    if (teamId === this.NONE) {
      return null;
    }
    const team = teamsById[teamId];
    return {
      "id": team.teamId,
      // TODO: make seed display in react tournament bracket component so we don't have to do this anymore
      "name": team.seed + ' ' + team.name
    };
  }

  /**
   * 
   * @param {string} teamId
   * @param {string} winnerTeamId 
   * @returns {TournamentScore}
   */
  static createTournamentScore(teamId, winnerTeamId) {
    const score = winnerTeamId !== this.NONE && winnerTeamId === teamId ? 1 : 0;
    return {
      "score": score
    };
  }

  /**
   * 
   * @param {string} sourceMatchupId 
   * @param {Object.<string, TournamentGame>} tournamentGamesByMatchupId
   * @returns {TournamentSeed}
   */
  static createTournamentSeed(sourceMatchupId, tournamentGamesByMatchupId) {
    return {
      "sourceGame": this.getTournamentGameByMatchupId(sourceMatchupId, tournamentGamesByMatchupId),
      "rank": 1,
      "displayName": ""
    };
  }

  /**
   * Used to get the source game
   * @param {string} matchupId 
   * @param {Object.<string, TournamentGame>} tournamentGamesByMatchupId
   * @returns {TournamentGame}
   */
  static getTournamentGameByMatchupId(matchupId, tournamentGamesByMatchupId) {
    if (matchupId !== null && tournamentGamesByMatchupId.hasOwnProperty(matchupId)) {
      return tournamentGamesByMatchupId[matchupId];
    }

    return null;
  }

  /**
   * 
   * @param {string} matchupId
   * @param {string} teamId 
   * @param {string} sourceMatchupId 
   * @param {string} winnerTeamId 
   * @param {Object.<string, Team>} teamsById
   * @param {Object.<string, TournamentGame>} tournamentGamesByMatchupId
   * @returns {TournamentSide}
   */
  static createTournamentSide(matchupId, teamId, sourceMatchupId, winnerTeamId, teamsById, tournamentGamesByMatchupId) {
    return {
      "gameId": matchupId,
      "team": this.createTournamentTeam(teamId, teamsById),
      "score": this.createTournamentScore(teamId, winnerTeamId),
      "seed": this.createTournamentSeed(sourceMatchupId, tournamentGamesByMatchupId)
    };
  }

  /**
   * This is for the label that appears below each TournamentGame
   * @param {number} roundIdx 
   * @param {number} matchupIdx 
   * @returns {string} game name
   */
  static createGameName(roundIdx, matchupIdx) {
    return "Game " + roundIdx + matchupIdx;
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {Object.<string, Team>} teamsById
   * @param {Object.<string, TournamentGame>} tournamentGamesByMatchupId
   * @returns {TournamentSides}
   */
  static createTournamentSides(matchup, teamsById, tournamentGamesByMatchupId) {
    return {
      "visitor": this.createTournamentSide(matchup.matchupId, matchup.teamOneId, matchup.sourceMatchupOneId, matchup.winnerTeamId, teamsById, tournamentGamesByMatchupId),
      "home": this.createTournamentSide(matchup.matchupId, matchup.teamTwoId, matchup.sourceMatchupTwoId, matchup.winnerTeamId, teamsById, tournamentGamesByMatchupId)
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
   * @param {Object.<string, Team>} teamsById
   * @param {Object.<string, TournamentGame>} tournamentGamesByMatchupId
   * @returns {TournamentGame}
   */
  static createTournamentGame(matchup, roundIdx, matchupIdx, teamsById, tournamentGamesByMatchupId) {
    return {
      "id": matchup.matchupId,
      "name": this.createGameName(roundIdx, matchupIdx),
      "sides": this.createTournamentSides(matchup, teamsById, tournamentGamesByMatchupId),
      "selected": false
      // "scheduled": 0
    };
  }

  /**
   * Creates the games for a round
   * 
   * @param {Round} round 
   * @param {number} roundIdx 
   * @param {Object.<string, Team>} teamsById
   * @param {Object.<string, TournamentGame>} tournamentGamesByMatchupId
   */
  static createTournamentGamesByMatchupIdForRound(round, roundIdx, teamsById, tournamentGamesByMatchupId) {
    return round.matchups.map((matchup, matchupIdx) => {
      const game = this.createTournamentGame(matchup, roundIdx, matchupIdx, teamsById, tournamentGamesByMatchupId);
      tournamentGamesByMatchupId[matchup.matchupId] = game;
      return game;
    }, this);
  }

  // Utilities

  /**
   * And unselect other games
   * @param {TournamentGame} game 
   * @param {string} gameId 
   * @param {boolean} toSelect
   * @returns {TournamentGame} selected game
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
   * Converts rounds into the React Tournament Bracket component object format.
   * Since the react tournament bracket data is represented as a tree
   * with the finals at the root, the return value of this method
   * contains the entire bracket.
   * 
   * @param {Round[]} rounds 
   * @param {Object.<string, Team>} teamsById 
   * @returns {TournamentGame}
   */
  static getFinalTournamentGame(rounds, teamsById) {
    const tournamentGamesByMatchupId = this.getTournamentGamesByMatchupId(rounds, teamsById);
    const finalsMatchupId = rounds[rounds.length - 1].matchups[0].matchupId;
    return tournamentGamesByMatchupId[finalsMatchupId];
  }

  /**
   * Marks the first game with no winner as selected. For display only.
   * @param {TournamentGame} finals 
   * @returns {TournamentGame}
   */
  static selectDefaultTournamentGame(finals) {
    let firstUnfilledGame = this.getFirstUnfilledTournamentGame(finals);
    if (firstUnfilledGame == null) {
      firstUnfilledGame = finals;
    }
    
    firstUnfilledGame.selected = true;

    return firstUnfilledGame;
  }

  /**
   * Returns the earliest game that has no winner
   * @param {TournamentGame} game 
   * @returns {TournamentGame}
   */
  static getFirstUnfilledTournamentGame(game) {
    let unfilledGame = null;
    const homeSide = game.sides.home;
    const visitorSide = game.sides.visitor;
    const winningSide = this.getWinningTournamentSide(game);
    if (winningSide === null) {
      unfilledGame = game;
    }

    const homeSourceGame = homeSide.seed.sourceGame;
    if (homeSourceGame != null) {
      const unfilledGameFromHomeSource = this.getFirstUnfilledTournamentGame(homeSourceGame);
      if (unfilledGameFromHomeSource != null) {
        unfilledGame = unfilledGameFromHomeSource;
      }
    }

    const visitorSourceGame = visitorSide.seed.sourceGame;
    if (visitorSourceGame != null) {
      const unfilledGameFromVisitorSource = this.getFirstUnfilledTournamentGame(visitorSourceGame);
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
  static getWinningTournamentSide(game) {
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
   * @param {Object.<string, Team>} teamsById 
   * @returns {Object.<string, TournamentGame>} tournament games by matchup id
   */
  static getTournamentGamesByMatchupId(rounds, teamsById) {
    const tournamentGamesByMatchupId = {};

    rounds.forEach((round, roundIdx) => {
      this.createTournamentGamesByMatchupIdForRound(round, roundIdx, teamsById, tournamentGamesByMatchupId);
    });

    return tournamentGamesByMatchupId;
  }
  
  // TODO: consider replacing this by reconstructing the rounds
  /**
   * Get results from bracket
   * @param {TournamentGame} root
   * @returns {BracketResults} list of bracket results
   */
  static collectResults(root) {
    const winnerTeamIdByMatchupId = this.getResults(root, {});
    const results = Object.entries(winnerTeamIdByMatchupId).map(([matchupId, winnerTeamId]) => {
      return {
        "matchupId": matchupId,
        "winnerTeamId": winnerTeamId
      };
    });

    return {
      results
    };
  }

  // TODO: figure out how this is used
  /**
   * Recursively search the tree to populate winners
   * @param {TournamentGame} root
   * @param {Object.<string, string>} winnerTeamIdByMatchupId
   * @returns {Object.<string, string>} map of matchup id to winning team id
   */
  static getResults(root, winnerTeamIdByMatchupId) {
    const winningSide = this.getWinningTournamentSide(root);
    if (winningSide != null) {
      winnerTeamIdByMatchupId[root.id] = winningSide.team.id;
    }

    const homeSourceGame = root.sides.home.seed.sourceGame;
    if (homeSourceGame != null) {
      this.getResults(homeSourceGame, winnerTeamIdByMatchupId);
    }

    const visitorSourceGame = root.sides.visitor.seed.sourceGame;
    if (visitorSourceGame != null) {
      this.getResults(visitorSourceGame, winnerTeamIdByMatchupId);
    }

    return winnerTeamIdByMatchupId;
  }

  /**
   * Recursively search the tree for the game with gameId. Once found, set the winner, and clear out the loser from any parent nodes.
   * @param {TournamentGame} root The game from which to start the search. from the root, traverse towards the first round.
   * @param {string} gameId ID of the game to set the winner on
   * @param {string} winningTeamId winner of the game
   * @param {string} nextTournamentGameId ID of the game that the winner plays in next (parentId)
   * @returns {GameResult} winning and losing team of the game in question. passed up to the root from whichever game it was set. null if the game was not found in the bracket.
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
        nextTournamentGameId: nextTournamentGameId,
        winningTeam: gameWinningTeam,
        losingTeam: gameLosingTeam
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
        if (bracketResult.nextTournamentGameId === root.id ) {
          // the selected game is from the child of the root node
          if (homeSide.team === null || homeSide.team.id !== bracketResult.winningTeam.id) {
            homeSide.team = bracketResult.winningTeam;
            homeSide.score.score = 0
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