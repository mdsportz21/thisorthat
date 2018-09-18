import * as types from '../types'; // eslint-disable-line no-unused-vars
import BracketUtils from './BracketUtils';

export default class {
  /**
   *
   * @param {string} teamId
   * @returns {boolean}
   */
  static isNone(teamId) {
    return teamId === 'None';
  }

  /**
   *
   * @param {types.Team[]} teams
   * @returns {Object.<string, types.Team>} teams by team ID
   */
  static getTeamsById(teams) {
    return teams.reduce((teamsById, team) => {
      const teamsByIdMap = teamsById;
      teamsByIdMap[team.teamId] = team;
      return teamsByIdMap;
    }, {});
  }

  /**
   *
   * @param {String} teamId
   * @param {Object.<string, types.Team>} teamsById
   * @returns {types.TournamentTeam} team
   */
  static createTournamentTeam(teamId, teamsById) {
    if (this.isNone(teamId)) {
      return null;
    }
    const team = teamsById[teamId];
    return {
      id: team.teamId,
      // TODO: make seed display in react tournament bracket component so we don't have to do this anymore
      name: `${team.seed} ${team.name}`,
    };
  }

  /**
   *
   * @param {string} teamId
   * @param {string} winnerTeamId
   * @returns {types.TournamentScore}
   */
  static createTournamentScore(teamId, winnerTeamId) {
    const score = !this.isNone(winnerTeamId) && winnerTeamId === teamId ? 1 : 0;
    return {
      score,
    };
  }

  /**
   *
   * @param {string} sourceMatchupId
   * @returns {types.TournamentSeed}
   */
  static createTournamentSeed(sourceMatchupId) {
    return {
      // sourceGame: this.getTournamentGameByMatchupId(sourceMatchupId, tournamentGamesByMatchupId),
      rank: 1,
      displayName: '',
      sourceGameId: sourceMatchupId,
    };
  }

  /**
   * Used to get the source game
   * @param {string} matchupId
   * @param {Object.<string, types.TournamentGame>} tournamentGamesByMatchupId
   * @returns {types.TournamentGame}
   */
  static getTournamentGameByMatchupId(matchupId, tournamentGamesByMatchupId) {
    // if (matchupId !== null && tournamentGamesByMatchupId.hasOwnProperty(matchupId)) {
    if (matchupId !== null && Object.prototype.hasOwnProperty.call(tournamentGamesByMatchupId, matchupId)) {
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
   * @param {Object.<string, types.Team>} teamsById
   * @returns {types.TournamentSide}
   */
  static createTournamentSide(matchupId, teamId, sourceMatchupId, winnerTeamId, teamsById) {
    return {
      gameId: matchupId,
      team: this.createTournamentTeam(teamId, teamsById),
      score: this.createTournamentScore(teamId, winnerTeamId),
      seed: this.createTournamentSeed(sourceMatchupId),
    };
  }

  /**
   * This is for the label that appears below each TournamentGame
   * @param {number} roundIdx
   * @param {number} matchupIdx
   * @returns {string} game name
   */
  static createGameName(roundIdx, matchupIdx) {
    return `Game ${roundIdx}${matchupIdx}`;
  }

  /**
   *
   * @param {types.Matchup} matchup
   * @param {Object.<string, types.Team>} teamsById
   * @returns {types.TournamentSides}
   */
  static createTournamentSides(matchup, teamsById) {
    return {
      visitor: this.createTournamentSide(matchup.matchupId, matchup.teamOneId, matchup.sourceMatchupOneId, matchup.winnerTeamId, teamsById),
      home: this.createTournamentSide(matchup.matchupId, matchup.teamTwoId, matchup.sourceMatchupTwoId, matchup.winnerTeamId, teamsById),
    };
  }

  /**
   *
   * @param {number} roundIdx
   * @param {number} matchupIdx
   * @param {types.Round[]} rounds
   * @returns {types.Matchup}
   */
  static getMatchup(roundIdx, matchupIdx, rounds) {
    return rounds[roundIdx].matchups[matchupIdx];
  }

  /**
   *
   * @param {types.Matchup} matchup
   * @param {number} roundIdx
   * @param {number} matchupIdx
   * @param {Object.<string, types.Team>} teamsById
   * @returns {types.TournamentGame}
   */
  static createTournamentGame(matchup, roundIdx, matchupIdx, teamsById) {
    return {
      id: matchup.matchupId,
      name: this.createGameName(roundIdx, matchupIdx),
      sides: this.createTournamentSides(matchup, teamsById),
      selected: false,
      // "scheduled": 0
    };
  }

  /**
   * Creates the games for a round
   *
   * @param {types.Round} round
   * @param {number} roundIdx
   * @param {Object.<string, types.Team>} teamsById
   * @returns {types.TournamentGame[]}
   */
  static createTournamentGamesForRound(round, roundIdx, teamsById) {
    return round.matchups.map((matchup, matchupIdx) => this.createTournamentGame(matchup, roundIdx, matchupIdx, teamsById), this);
  }

  /**
   * List of all tournament games sorted by round idx ascending
   * @param {types.Round[]} rounds
   * @param {Object.<string, types.Team>} teamsById
   * @returns {types.TournamentGame[]} tournament games sorted by round idx ascending
   */
  static getTournamentGames(rounds, teamsById) {
    const tournamentGames = [];
    rounds.forEach((round, roundIdx) => {
      const gamesForThisRound = this.createTournamentGamesForRound(round, roundIdx, teamsById);
      tournamentGames.push(...gamesForThisRound);
    });

    return tournamentGames;
  }

  // /**
  //  * Converts rounds into the React Tournament Bracket component object format.
  //  * Since the react tournament bracket data is represented as a tree
  //  * with the finals at the root, the return value of this method
  //  * contains the entire bracket.
  //  *
  //  * @param {types.Round[]} rounds
  //  * @param {Object.<string, types.Team>} teamsById
  //  * @returns {types.TournamentGame}
  //  */
  // static generateBracket(rounds, teamsById) {
  //   const tournamentGamesByMatchupId = this.getTournamentGamesByMatchupId(rounds, teamsById);
  //   const finalsMatchupId = rounds[rounds.length - 1].matchups[0].matchupId;
  //   return tournamentGamesByMatchupId[finalsMatchupId];
  // }

  /**
   * Converts rounds into the React Tournament Bracket component object format.
   * Since the react tournament bracket data is represented as a tree
   * with the finals at the root, the "rootGame" value of this method
   * contains the entire bracket.
   * "teamsById" and "gamesForDisplay" will be used for displaying the bracket.
   *
   * @param {types.Round[]} rounds
   * @param {types.Team[]} teams
   * @returns {types.BracketDisplayInfo}
   */
  static generateBracketDisplayInfo(rounds, teams) {
    const teamsById = this.getTeamsById(teams);

    // This should be ordered by round ascending.
    // Can replace getTournamentGamesByMatchupId since game.id === matchupId
    const games = this.getTournamentGames(rounds, teamsById);

    // Populate source games
    const tournamentGamesByMatchupId = {}; // cache used to populate source games
    games.forEach((game) => {
      // because we're going in order from leaves to root, we shouldn't encounter a game before we've populated it
      tournamentGamesByMatchupId[game.id] = game;
      const homeSeed = game.sides.home.seed;
      homeSeed.sourceGame = this.getTournamentGameByMatchupId(homeSeed.sourceGameId, tournamentGamesByMatchupId);
      const visitorSeed = game.sides.visitor.seed;
      visitorSeed.sourceGame = this.getTournamentGameByMatchupId(visitorSeed.sourceGameId, tournamentGamesByMatchupId);
    });

    const finalsMatchupId = rounds[rounds.length - 1].matchups[0].matchupId;
    const rootGame = tournamentGamesByMatchupId[finalsMatchupId];

    const gamesForDisplay = this.generateGamesForDisplay(games);
    const gamesForDisplayIndex = this.getFirstUnfilledGameForDisplayIndex(gamesForDisplay);
    const displayedRootGame = gamesForDisplay[gamesForDisplayIndex];
    const selectedGame = this.selectDefaultTournamentGame(displayedRootGame);

    // TODO: unit test all of this
    return {
      rootGame,
      teamsById,
      gamesForDisplay,
      gamesForDisplayIndex,
      selectedGame,
      displayedRootGame,
    };
  }

  /**
   * Generate list of games (and their source games) that will be displayed for editing.
   * These games will be trees with a height of 0 - 2.
   * @param {types.TournamentGame[]} games
   */
  static generateGamesForDisplay(games) {
    // if there are 1, 2 or 3 games, only show the final, since the height of the tree is at most 1 in these cases.
    if (games.length < 4) {
      return games.slice(-1);
    }

    const desiredTreeDepth = 2;

    const gamesForDisplay = [];
    games.forEach((game) => {
      // exclude all nodes that don't have a height of at least 2
      if (this.hasHeight(game, desiredTreeDepth)) {
        const rootGameToPrune = JSON.parse(JSON.stringify(game));
        gamesForDisplay.push(rootGameToPrune);
        const gamesToPrune = this.getGamesToPrune(rootGameToPrune, desiredTreeDepth);

        // For all nodes that have a height of 2 or more, prune the tree to a height of 2
        gamesToPrune.forEach((gameToPrune) => {
          const homeSeed = gameToPrune.sides.home.seed;
          homeSeed.sourceGame = null;
          const visitorSeed = gameToPrune.sides.visitor.seed;
          visitorSeed.sourceGame = null;
        });
      }
    });

    return gamesForDisplay;
  }

  /**
   *
   * @param {types.TournamentGame} game
   * @param {number} currentHeight
   * @param {number} desiredHeight
   * @param {types.TournamentGame[]} gamesToPrune
   */
  static getGamesToPruneHelper(game, currentHeight, desiredHeight, gamesToPrune) {
    if (game === null) {
      return gamesToPrune;
    }

    if (currentHeight === desiredHeight) {
      gamesToPrune.push(game);
      return gamesToPrune;
    }

    this.getGamesToPruneHelper(game.sides.home.seed.sourceGame, currentHeight + 1, desiredHeight, gamesToPrune);
    this.getGamesToPruneHelper(game.sides.visitor.seed.sourceGame, currentHeight + 1, desiredHeight, gamesToPrune);
    return gamesToPrune;
  }

  /**
   *
   * @param {types.TournamentGame} game
   * @param {number} desiredHeight
   * @returns {types.TournamentGame[]}
   */
  static getGamesToPrune(game, desiredHeight) {
    return this.getGamesToPruneHelper(game, 0, desiredHeight, []);
  }

  /**
   *
   * @param {types.TournamentGame} game
   * @param {number} currentHeight
   * @param {number} desiredHeight
   * @returns {boolean}
   */
  static hasHeightHelper(game, currentHeight, desiredHeight) {
    if (game === null) {
      return false;
    }

    if (currentHeight === desiredHeight) {
      return true;
    }

    const homeHasHeight = this.hasHeightHelper(game.sides.home.seed.sourceGame, currentHeight + 1, desiredHeight);
    const visitorHasHeight = this.hasHeightHelper(game.sides.visitor.seed.sourceGame, currentHeight + 1, desiredHeight);
    return homeHasHeight || visitorHasHeight;
  }

  /**
   *
   * @param {types.TournamentGame} game
   * @param {number} desiredHeight
   * @returns {boolean} true if root game node has the given height
   */
  static hasHeight(game, desiredHeight) {
    return this.hasHeightHelper(game, 0, desiredHeight);
  }

  /**
   * Marks the first game with no winner as selected. For display only.
   * @param {types.TournamentGame} finals
   * @returns {types.TournamentGame}
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
   *
   * @param {types.TournamentGame[]} gamesForDisplay
   * @returns {number} the index of the first game for display that isn't completely filled out
   */
  static getFirstUnfilledGameForDisplayIndex(gamesForDisplay) {
    let firstUnfilledGameIndex = 0;
    gamesForDisplay.some((gameForDisplay) => {
      if (BracketUtils.getTournamentGameWinningSide(gameForDisplay) === null) {
        return true;
      }

      firstUnfilledGameIndex += 1;
      return false;
    });

    if (firstUnfilledGameIndex === gamesForDisplay.length) {
      firstUnfilledGameIndex = gamesForDisplay.length - 1;
    }

    return firstUnfilledGameIndex;
  }

  /**
   * Returns the earliest game that has no winner
   * @param {types.TournamentGame} game
   * @returns {types.TournamentGame}
   */
  static getFirstUnfilledTournamentGame(game) {
    let unfilledGame = null;
    const homeSide = game.sides.home;
    const visitorSide = game.sides.visitor;
    const winningSide = BracketUtils.getTournamentGameWinningSide(game);
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
}
