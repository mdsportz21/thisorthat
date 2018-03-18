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

}