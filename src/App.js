import React, { PureComponent } from 'react';
import './App.css';
// import Bracket from './components/Bracket';
import connectToStores from 'alt-utils/lib/connectToStores';
import Subject from './components/Subject';

import {BracketGame, Bracket} from 'react-tournament-bracket';

import BracketUtils from './utils/BracketUtils';

class App extends PureComponent {

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
   * Helper object used to set winner
   * @typedef {Object} GameResult
   * @property {string} parentId ID of the game the winner plays in next. Null if this game is the finals
   * @property {TournamentTeam} winningTeam
   * @property {TournamentTeam} losingTeam
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

  constructor(props) {
    super(props);

    /** @type {BracketWrapper} */
    const bracketWrapper = {
      "teams" : [
         {
            "imgLink" : "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_2280000/ff_2280914_full.jpg&w=600",
            "slotId" : "5aadc806dbe120a48757f13e",
            "name" : "Aberdeen Ironbirds",
            "seed" : "1"
         },
         {
            "imgLink" : "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_2808000/ff_2808206_full.jpg&w=600",
            "name" : "Aberdeen Steamed Crabs",
            "slotId" : "5aadc806dbe120a48757f140",
            "seed" : "2"
         },
         {
            "slotId" : "5aadc806dbe120a48757f142",
            "name" : "Akron RubberDucks",
            "imgLink" : "http://static1.squarespace.com/static/594061048419c282ed731d4a/59406864d482e90beeb42ec9/594c3fcb44024311bb70a1f2/1498169292727/thumb+%2815%29.jpeg",
            "seed" : "3"
         },
         {
            "imgLink" : "http://lf.lids.com/hwl?set=sku[20868220],c[2],w[400],h[300]&call=url[file:product]",
            "slotId" : "5aadc806dbe120a48757f144",
            "name" : "Albuquerque Dukes",
            "seed" : "4"
         },
         {
            "seed" : "5",
            "imgLink" : "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_2811000/ff_2811798_full.jpg&w=600",
            "name" : "Albuquerque Green Chile Cheeseburgers",
            "slotId" : "5aadc806dbe120a48757f146"
         },
         {
            "name" : "Albuquerque Isotopes",
            "slotId" : "5aadc806dbe120a48757f148",
            "imgLink" : "http://static1.squarespace.com/static/594061048419c282ed731d4a/5940a6aadb29d64c86b8250d/594183cdf5e231163ce2ebc6/1497465818011/IsotopesHomeCapSide_500.jpg",
            "seed" : "6"
         },
         {
            "seed" : "7",
            "name" : "Altoona Curve",
            "slotId" : "5aadc806dbe120a48757f14a",
            "imgLink" : "http://static1.squarespace.com/static/594061048419c282ed731d4a/5941836b46c3c47f9ea83c34/5941837edb29d664699a3fb3/1497465727145/AltoonaRoadSide_500.jpg"
         },
         {
            "seed" : "8",
            "name" : "Arkansas Travelers",
            "slotId" : "5aadc806dbe120a48757f14c",
            "imgLink" : "http://static1.squarespace.com/static/594061048419c282ed731d4a/5941b1fc2e69cf730d16635a/594307e23a0411e6bdf77eb6/1497565154400/thumb.aspx-10.jpeg"
         }
      ],
      "bracket" : {
         "name" : "elite_eight",
         "rounds" : [
            {
               "matchups" : [
                  {
                     "sourceMatchupTwoId" : "None",
                     "slotTwoId" : "5aadc806dbe120a48757f14c",
                     "sourceMatchupOneId" : "None",
                     "slotOneId" : "5aadc806dbe120a48757f13e",
                     "region" : null,
                     "winnerSlotId" : "None",
                     "matchupId" : "5aadc806d6f45f4e8afa0db4"
                  },
                  {
                     "sourceMatchupOneId" : "None",
                     "slotTwoId" : "5aadc806dbe120a48757f14a",
                     "sourceMatchupTwoId" : "None",
                     "slotOneId" : "5aadc806dbe120a48757f140",
                     "matchupId" : "5aadc806d6f45f4e8afa0db5",
                     "winnerSlotId" : "None",
                     "region" : null
                  },
                  {
                     "slotTwoId" : "5aadc806dbe120a48757f148",
                     "sourceMatchupTwoId" : "None",
                     "sourceMatchupOneId" : "None",
                     "slotOneId" : "5aadc806dbe120a48757f142",
                     "winnerSlotId" : "None",
                     "region" : null,
                     "matchupId" : "5aadc806d6f45f4e8afa0db6"
                  },
                  {
                     "region" : null,
                     "winnerSlotId" : "None",
                     "matchupId" : "5aadc806d6f45f4e8afa0db7",
                     "slotOneId" : "5aadc806dbe120a48757f144",
                     "sourceMatchupOneId" : "None",
                     "sourceMatchupTwoId" : "None",
                     "slotTwoId" : "5aadc806dbe120a48757f146"
                  }
               ]
            },
            {
               "matchups" : [
                  {
                     "slotOneId" : "None",
                     "matchupId" : "5aadc806d6f45f4e8afa0db8",
                     "winnerSlotId" : "None",
                     "region" : null,
                     "sourceMatchupOneId" : "5aadc806d6f45f4e8afa0db4",
                     "sourceMatchupTwoId" : "5aadc806d6f45f4e8afa0db5",
                     "slotTwoId" : "None"
                  },
                  {
                     "sourceMatchupTwoId" : "5aadc806d6f45f4e8afa0db7",
                     "slotTwoId" : "None",
                     "sourceMatchupOneId" : "5aadc806d6f45f4e8afa0db6",
                     "slotOneId" : "None",
                     "region" : null,
                     "winnerSlotId" : "None",
                     "matchupId" : "5aadc806d6f45f4e8afa0db9"
                  }
               ]
            },
            {
               "matchups" : [
                  {
                     "winnerSlotId" : "None",
                     "region" : null,
                     "matchupId" : "5aadc806d6f45f4e8afa0dba",
                     "slotOneId" : "None",
                     "sourceMatchupTwoId" : "5aadc806d6f45f4e8afa0db9",
                     "slotTwoId" : "None",
                     "sourceMatchupOneId" : "5aadc806d6f45f4e8afa0db8"
                  }
               ]
            }
         ]
      }
   };


    /**
     * Map of matchupId to TournamentGame. Should be populated as the games are created.
     * 
     * @ type {Object.<string, TournamentGame>}
     */
    const gamesByMatchupId = {};
    /**
     * We're gonna need this to fill out sides.
     */
    const teamsBySlotId = BracketUtils.getTeamsBySlotId(bracketWrapper.teams);

    const rounds = bracketWrapper.bracket.rounds;

    rounds.forEach(function(round, roundIdx) {
      BracketUtils.createGames(round, roundIdx, teamsBySlotId, gamesByMatchupId);
    });

    const finalsMatchupId = rounds[rounds.length - 1].matchups[0].matchupId;

    const finals = gamesByMatchupId[finalsMatchupId];
    let firstUnfilledGame = this.getFirstUnfilledGame(finals);

    if (firstUnfilledGame == null) {
      firstUnfilledGame = finals;
    }

    firstUnfilledGame.selected = true;
    
    this.state = {
      finals: finals,
      teamsBySlotId: teamsBySlotId,
      sideOne: firstUnfilledGame.sides.home,
      sideTwo: firstUnfilledGame.sides.visitor,
      teamOne: teamsBySlotId[firstUnfilledGame.sides.home.team.id],
      teamTwo: teamsBySlotId[firstUnfilledGame.sides.visitor.team.id]
    }
  }

  state = {
    homeOnTop: false,
    hoveredTeamId: null
  };

  /**
   * 
   * @param {TournamentSide} side 
   */
  handleSideClick(side) {
    console.log("side clicked: " + side);

    if (side.team != null) {
      const updatedFinals = this.state.finals;
      let sideOne = this.state.sideOne;
      let sideTwo = this.state.sideTwo;
      let teamOne = this.state.teamOne;
      let teamTwo = this.state.teamTwo;

      const finalsWinner = this.setWinner(updatedFinals, side.gameId, side.team.id, null);

      const firstUnfilledGame = this.getFirstUnfilledGame(updatedFinals);
      if (firstUnfilledGame != null) {
        this.selectGame(updatedFinals, firstUnfilledGame.id);
        sideOne = firstUnfilledGame.sides.home;
        sideTwo = firstUnfilledGame.sides.visitor;
        teamOne = sideOne.team != null ? this.state.teamsBySlotId[sideOne.team.id] : {};
        teamTwo = sideTwo.team != null ? this.state.teamsBySlotId[sideTwo.team.id] : {};
      }

      this.setState(() => {
        return {
          finals: updatedFinals,
          sideOne,
          sideTwo,
          teamOne,
          teamTwo
        };
      });
      
      if (finalsWinner != null) {
        // TODO: display champion
      }
    }

    // TODO: if the non-clicked side is a winner, clear it out all the way down the bracket (need to figure out how to traverse the bracket the other way)
    // TODO: Add this same handler to the subject click handler
  }

  /**
   * Highlight game on rollover
   * @param {TournamentGame} game 
   */
  handleGameMouseEnter(game) {
    //TODO: set subjects to this game's teams
    const updatedFinals = this.state.finals;
    const selectedGame = this.selectGame(updatedFinals, game.id);
    const sideOne = selectedGame.sides.home;
    const sideTwo = selectedGame.sides.visitor;
    const teamOne = sideOne.team != null ? this.state.teamsBySlotId[sideOne.team.id] : {};
    const teamTwo = sideTwo.team != null ? this.state.teamsBySlotId[sideTwo.team.id] : {};

    this.setState(() => {
      return {
        finals: updatedFinals,
        sideOne,
        sideTwo,
        teamOne,
        teamTwo
      };
    });
  }

  /**
   * 
   * @param {TournamentGame} game 
   * @returns {TournamentGame}
   */
  getFirstUnfilledGame(game) {
    let unfilledGame = null;
    const homeSide = game.sides.home;
    const visitorSide = game.sides.visitor;
    const winningSide = this.getWinningSide(homeSide, visitorSide);
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
   * @param {TournamentSide} sideOne 
   * @param {TournamentSide} sideTwo 
   * @returns {TournamentSide}
   */
  getWinningSide(sideOne, sideTwo) {
    if (sideOne.score.score === sideTwo.score.score) {
      return null
    }

    return sideOne.score.score > sideTwo.score.score ? sideOne : sideTwo;
  }

  /**
   * Recursively search the tree for the game with gameId. Once found, set the winner, and clear out the loser from any parent nodes.
   * @param {TournamentGame} root The game from which to start the search. from the root, traverse towards the first round.
   * @param {string} gameId ID of the game to set the winner on
   * @param {string} winningTeamId winner of the game
   * @param {string} parentId ID of the game that the winner plays in next
   * @returns {GameResult} winning and losing team of the game in question. passed up to the root from whichever game it was set. null if the game was not found in the bracket.
   */
  setWinner(root, gameId, winningTeamId, parentId) {
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

  /**
   * And unselect other games
   * @param {TournamentGame} game 
   * @param {string} gameId 
   * @param {boolean} toSelect
   * @returns {TournamentGame} selected game
   */
  selectGame(game, gameId) {
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

  gameComponent = props => {
    return (
      <BracketGame
        {...props}
        onHoveredTeamIdChange={hoveredTeamId => this.setState({ hoveredTeamId })}
        onSideClick={(side) => this.handleSideClick(side)}
        onMouseEnter={() => this.handleGameMouseEnter(props.game)}
        hoveredTeamId={this.state.hoveredTeamId}/>
    );
  };

  render() {
    const { homeOnTop, sideOne, sideTwo, teamOne, teamTwo } = this.state;
    const { gameComponent: GameComponent } = this; 

    // const subjectOne = {
    //     "subjectId":"59756722fc278e3ec13c355a",
    //     "imgLink":"https://static1.squarespace.com/static/594061048419c282ed731d4a/5949b25b86e6c05c7d5cf26d/5949b27f6b8f5bfb66cee7e1/1498002048239/thumb+%2814%29.jpeg",
    //     "imgDesc":"Charleston RiverDogs",
    //     "description":"Charleston RiverDogs"
    // };
    // const subjectTwo = subjectOne;

    return (
      <div className="App">
          
        <div className="Title">
          <h2>Brack It</h2>
        </div>

        <div className="Subjects">
            <Subject 
              side={sideOne}
              team={teamOne}
              onClick={() => this.onSideClick(sideOne)}
              />
            <h3 className="Or">or</h3>
            <Subject 
              side={sideTwo}
              team={teamTwo}
              onClick={(e) => this.onClick(e)}
              />
        </div>

        <div className="Bracket">
        {<Bracket game={this.state.finals} homeOnTop={homeOnTop} GameComponent={GameComponent}  />}
        </div>
      </div>
    );
  }
}

App.getStores = function() {
  // return [SubjectStore, RankingsStore];
  return [];
};

App.getPropsFromStores = function() {
  // const subjectState = SubjectStore.getState();
  // const rankingsState = RankingsStore.getState();
  return {
    // subjects: subjectState.subjects,
    // responseSaved: subjectState.responseSaved,
    // percentCompleted: subjectState.percentCompleted,
    // rankings: rankingsState.rankings
  };
};

export default connectToStores(App);
