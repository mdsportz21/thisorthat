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

  state = {
    homeOnTop: false,
    hoveredTeamId: null
  };

  // changeHoveredTeamId = hoveredTeamId => this.setState({ hoveredTeamId });

//   handleClick = game => alert('clicked game: ' + game.name);

  handleClick(game) {
    /*
        "id": "B3",
        "name": "Round 1A",
        "sides": {
            "visitor": {...},
            "home": {...}
        }
    */
    alert('clicked game: ' + game.name);
  }

  gameComponent = props => {
    return (
      <BracketGame
        {...props}
        onHoveredTeamIdChange={hoveredTeamId => this.setState({ hoveredTeamId })}
        onClick={() => this.handleClick(props.game)}
        hoveredTeamId={this.state.hoveredTeamId}/>
    );
  };

  render() {
    const { homeOnTop, hoveredTeamId } = this.state;
    const { gameComponent: GameComponent } = this;

    console.log(BracketUtils.getGameName(0,0));

    /** @type {BracketWrapper} */
    const bracketWrapper = {
      "bracket" : {
         "rounds" : [
            {
               "matchups" : [
                  {
                     "winnerSlotId" : "None",
                     "matchupId" : "5a66941dd6f45f0caab3d280",
                     "slotTwoId" : "5a66941d00a50bae299dd9aa",
                     "sourceMatchupTwoId" : "None",
                     "sourceMatchupOneId" : "None",
                     "slotOneId" : "5a66941d00a50bae299dd9a4",
                     "region" : null
                  },
                  {
                     "winnerSlotId" : "None",
                     "matchupId" : "5a66941dd6f45f0caab3d281",
                     "region" : null,
                     "slotOneId" : "5a66941d00a50bae299dd9a6",
                     "sourceMatchupOneId" : "None",
                     "sourceMatchupTwoId" : "None",
                     "slotTwoId" : "5a66941d00a50bae299dd9a8"
                  }
               ]
            },
            {
               "matchups" : [
                  {
                     "winnerSlotId" : "None",
                     "matchupId" : "5a66941dd6f45f0caab3d282",
                     "sourceMatchupTwoId" : "5a66941dd6f45f0caab3d281",
                     "slotTwoId" : "None",
                     "region" : null,
                     "slotOneId" : "None",
                     "sourceMatchupOneId" : "5a66941dd6f45f0caab3d280"
                  }
               ]
            }
         ],
         "name" : "final_four"
      },
      "teams" : [
         {
            "slotId" : "5a66941d00a50bae299dd9a4",
            "name" : "Aberdeen Ironbirds",
            "seed" : "1",
            "imgLink" : "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_2280000/ff_2280914_full.jpg&w=600"
         },
         {
            "name" : "Aberdeen Steamed Crabs",
            "seed" : "2",
            "imgLink" : "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_2808000/ff_2808206_full.jpg&w=600",
            "slotId" : "5a66941d00a50bae299dd9a6"
         },
         {
            "slotId" : "5a66941d00a50bae299dd9a8",
            "imgLink" : "http://static1.squarespace.com/static/594061048419c282ed731d4a/59406864d482e90beeb42ec9/594c3fcb44024311bb70a1f2/1498169292727/thumb+%2815%29.jpeg",
            "seed" : "3",
            "name" : "Akron RubberDucks"
         },
         {
            "name" : "Albuquerque Dukes",
            "seed" : "4",
            "imgLink" : "http://lf.lids.com/hwl?set=sku[20868220],c[2],w[400],h[300]&call=url[file:product]",
            "slotId" : "5a66941d00a50bae299dd9aa"
         }
      ]
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

    const subjectOne = {
        "subjectId":"59756722fc278e3ec13c355a",
        "imgLink":"https://static1.squarespace.com/static/594061048419c282ed731d4a/5949b25b86e6c05c7d5cf26d/5949b27f6b8f5bfb66cee7e1/1498002048239/thumb+%2814%29.jpeg",
        "imgDesc":"Charleston RiverDogs",
        "description":"Charleston RiverDogs"
    };
    const subjectTwo = subjectOne;

    return (
      <div className="App">
          
        <div className="Title">
          <h2>Brack It</h2>
        </div>

        <div className="Subjects">
            <Subject 
              subjectId={subjectOne.subjectId}
              imgLink={subjectOne.imgLink} 
              altText={subjectOne.imgDesc}
              description={subjectOne.description}
              onClick={(e) => this.onClick(e)}
              />
            <h3 className="Or">or</h3>
            <Subject 
              subjectId={subjectTwo.subjectId}
              imgLink={subjectTwo.imgLink}
              altText={subjectTwo.imgDesc}
              description={subjectTwo.description}
              onClick={(e) => this.onClick(e)}
              />
        </div>

        {/* This is the test front end bracket */}
        <div className="Bracket">
        {<Bracket game={finals} homeOnTop={homeOnTop} GameComponent={GameComponent}  />}
        </div>

        {/* This is the converted bracket */}
        {/* <Bracket game={gameObject} homeOnTop={homeOnTop} GameComponent={GameComponent}  /> */}
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
