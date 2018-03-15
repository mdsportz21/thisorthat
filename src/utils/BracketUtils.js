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
   * @property {SidesObject} sides
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
  static getTeam(slotId, teamsBySlotId) {
    if (slotId == "None") {
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
   * @param {Matchup} matchup 
   * @param {Object.<string, Team>} teamsBySlotId
   * @returns {TournamentTeam}
   */
  static getVisitorTeam(matchup, teamsBySlotId) {
    return this.getTeam(matchup.slotOneId, teamsBySlotId);
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {Object.<string, Team>} teamsBySlotId
   * @returns {TournamentTeam}
   */
  static getHomeTeam(matchup, teamsBySlotId) {
    return this.getTeam(matchup.slotTwoId, teamsBySlotId);
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {string} slotId
   * @returns {TournamentScore}
   */
  static getScore(matchup, slotId) {
    const score = matchup.winnerSlotId !== "None" && matchup.winnerSlotId === slotId ? 1 : 0;
    return {
      "score": score
    };
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @returns {TournamentScore}
   */
  static getVisitorScore(matchup) {
    return this.getScore(matchup, matchup.slotOneId);
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @returns {TournamentScore}
   */
  static getHomeScore(matchup) {
    return this.getScore(matchup, matchup.slotTwoId);
  }

  /**
   * 
   * @param {string} slotId 
   * @param {TournamentGame} sourceGame
   * @param {Object.<string, Team>} teamsBySlotId
   * @returns {TournamentSeed}
   */
  static getSeed(slotId, sourceGame, teamsBySlotId) {
    const team = teamsBySlotId[slotId];
    return {
      "sourceGame": sourceGame,
      "rank": 1,
      "displayName": ""
    };
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {TournamentGame} sourceGame
   * @param {Object.<string, Team>} teamsBySlotId
   * @returns {TournamentSeed}
   */
  static getVisitorSeed(matchup, sourceGame, teamsBySlotId) {
    return this.getSeed(matchup.slotOneId, sourceGame, teamsBySlotId);
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {TournamentGame} sourceGame
   * @param {Object.<string, Team>} teamsBySlotId
   * @returns {TournamentSeed}
   */
  static getHomeSeed(matchup, sourceGame, teamsBySlotId) {
    return this.getSeed(matchup.slotTwoId, sourceGame, teamsBySlotId);
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
   * @param {Matchup} matchup 
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentGame}
   */
  static getVisitorSourceGame(matchup, gamesByMatchupId) {
    return this.getSourceGame(matchup.sourceMatchupOneId, gamesByMatchupId);
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentGame}
   */
  static getHomeSourceGame(matchup, gamesByMatchupId) {
    return this.getSourceGame(matchup.sourceMatchupTwoId, gamesByMatchupId);
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {Object.<string, Team>} teamsBySlotId
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentSide}
   */
  static getVisitorSide(matchup, teamsBySlotId, gamesByMatchupId) {
    const visitorSourceGame = this.getVisitorSourceGame(matchup, gamesByMatchupId);
    return {
      "team": this.getVisitorTeam(matchup, teamsBySlotId),
      "score": this.getVisitorScore(matchup),
      "seed": this.getVisitorSeed(matchup, visitorSourceGame, teamsBySlotId)
    };
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {Object.<string, Team>} teamsBySlotId
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentSide}
   */
  static getHomeSide(matchup, teamsBySlotId, gamesByMatchupId) {
    const homeSourceGame = this.getHomeSourceGame(matchup, gamesByMatchupId);
    return {
      "team": this.getHomeTeam(matchup, teamsBySlotId),
      "score": this.getHomeScore(matchup),
      "seed": this.getHomeSeed(matchup, homeSourceGame, teamsBySlotId)
    };
  }

  /**
   * 
   * @param {number} roundIdx 
   * @param {number} matchupIdx 
   * @returns {string}
   */
  static getGameName(roundIdx, matchupIdx) {
    return "Game " + roundIdx + matchupIdx;
  }

  /**
   * 
   * @param {Matchup} matchup 
   * @param {Object.<string, Team>} teamsBySlotId
   * @param {Object.<string, TournamentGame>} gamesByMatchupId
   * @returns {TournamentSides}
   */
  static getSides(matchup, teamsBySlotId, gamesByMatchupId) {
    return {
      "visitor": this.getVisitorSide(matchup, teamsBySlotId, gamesByMatchupId),
      "home": this.getHomeSide(matchup, teamsBySlotId, gamesByMatchupId)
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
      "name": this.getGameName(roundIdx, matchupIdx),
      "sides": this.getSides(matchup, teamsBySlotId, gamesByMatchupId),
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

}