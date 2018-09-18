import * as types from '../types'; // eslint-disable-line no-unused-vars
import BracketUtils from './BracketUtils';

export default class {
  // TODO: consider replacing this by reconstructing the rounds
  /**
   * Get results from bracket
   * @param {types.TournamentGame} root
   * @returns {types.BracketResults} list of bracket results
   */
  static collectResults(root) {
    const winnerTeamIdByMatchupId = this.getResults(root, {});
    const results = Object.entries(winnerTeamIdByMatchupId).map(([matchupId, winnerTeamId]) => ({
      matchupId,
      winnerTeamId,
    }));

    return {
      results,
    };
  }

  // TODO: figure out how this is used
  /**
   * Recursively search the tree to populate winners
   * @param {types.TournamentGame} root
   * @param {Object.<string, string>} winnerTeamIdByMatchupId
   * @returns {Object.<string, string>} map of matchup id to winning team id
   */
  static getResults(root, winnerTeamIdByMatchupId) {
    const winningSide = BracketUtils.getTournamentGameWinningSide(root);
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
}
