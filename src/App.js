import React, { PureComponent } from 'react';
import './App.css';
// import Bracket from './components/Bracket';
import connectToStores from 'alt-utils/lib/connectToStores';
import Subject from './components/Subject';

import {BracketGame, Bracket} from 'react-tournament-bracket';

class App extends PureComponent {

  state = {
    homeOnTop: false,
    hoveredTeamId: null
  };

  changeHoveredTeamId = hoveredTeamId => this.setState({ hoveredTeamId });

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

// TODO: update this bracket structure to the new one
//   TEST_BRACKET = {}

  // Svc Types

  /**
   * A bracket
   * @typedef {Object} Bracket
   * @property {Round[]} rounds
   * @property {string} name
   * @property {string} id
   */

  /**
   * A bracket
   * @typedef {Object} Bracket
   * @property {Round[]} rounds
   * @property {string} name
   * @property {string} id
   */

  /**
   * A round
   * @typedef {Object} Round
   * @property {Matchup[]} matchups
   */

  /**
   * A matchup.
   * @typedef {Object} Matchup
   * @property {Slot} slotOne - First slot in a matchup
   * @property {Slot} slotTwo - Second slot in a matchup
   * @property {Slot} winner - Winner of the matchup. Either slotOne or slotTwo, or null if the matchup hasn't happened.
   */

  /**
   * A slot
   * @typedef {Object} Slot
   * @property {number} seed - Region ranking as of the start of the tournament
   * @property {Team} team - Team info
   */

  /**
   * A team
   * @typedef {Object} Team
   * @property {string} name
   * @property {string} imgLink
   */

  // React Tournament Bracket Types

  /**
   * A Team
   * @typedef {Object} TeamObject
   * @property {string} id
   * @property {string} name
   */

  /**
   * A Score
   * @typedef {Object} ScoreObject
   * @property {number} score
   */

  /**
   * A Seed
   * @typedef {Object} SeedObject
   * @property {GameObject} sourceGame
   * @property {number} rank
   * @property {string} displayName
   */

  /**
   * A Side
   * @typedef {Object} SideObject
   * @property {TeamObject} team
   * @property {ScoreObject} score
   * @property {SeedObject} seed
   */

  /**
   * Sides
   * @typedef {Object} SidesObject
   * @property {SideObject} visitor
   * @property {SideObject} home
   */

  /**
   * A Game. Brackets are built from the finals to the first round, recursively, using gameObject.sides.visitor|home.seed.sourceGame.
   * @typedef {Object} GameObject
   * @property {string} id
   * @property {string} name
   * @property {SidesObject} sides
   */

   /**
    * Convert svc rounds to react sides, recursively
    * @param {Round[]} rounds
    * @returns {SidesObject} sides
    */
  getSides(rounds) {
    /** @type {SidesObject} */
    const sidesObject = {};

    const roundObject = rounds.splice(-1,1)[0];

    /** @type {SideObject} */
    const visitorSide = {
      score: roundObject
    };

    /** @type {SideObject} */
    const homeSide = {

    };

    //  return sidesObject;
    return {
      "visitor": visitorSide,
      "home": homeSide
    }
  }

  /**
   * Convert svc bracket to react recursive round
   * @param {Bracket} bracket
   * @returns {GameObject} The finals, in the format of ReactTournamentBracket's BracketGame, containing nested games.
   */
  toGameObject(bracket) {
    const bracketId = bracket.id;
    const bracketName = bracket.name;
    const bracketRounds = bracket.rounds;

    const gameObject = {
      "id": "whatevs",
      "name": "finals",
      "sides": this.getSides(bracket)
    };

    return gameObject;
  }

  render() {
    const { homeOnTop, hoveredTeamId } = this.state;
    const { gameComponent: GameComponent } = this;

    // const gameObject = this.toGameObject(this.TEST_BRACKET);

    const visitorSide0A = {
      "team": {
        "id": "7 G",
        "name": "7 G"
      },
      "score": {
        "score": 0
      },
      "seed": {
        "sourceGame": null,
        "rank": 2,
        "displayName": ""
      }
    };
    const homeSideOA = {
      "team": {
        "id": "6 F",
        "name": "6 F"
      },
      "score": {
        "score": 1
      },
      "seed": {
        "sourceGame": null,
        "rank": 2,
        "displayName": ""
      }
    };
    const game0A = {
      "id": "B1",
      "name": "Round 0A",
      "sides": {
        "visitor": visitorSide0A,
        "home": homeSideOA
      }
    };
    const game0B = {
      "id": "B2",
      "name": "Round 0B",
      "sides": {
        "visitor": {
          "team": {
            "id": "8 H",
            "name": "8 H"
          },
          "score": null,
          "seed": {
            "sourceGame": null,
            "rank": 2,
            "displayName": ""
          }
        },
        "home": {
          "team": {
            "id": "5 E",
            "name": "5 E"
          },
          "score": null,
          "seed": {
            "sourceGame": null,
            "rank": 2,
            "displayName": ""
          }
        }
      }
    };
    const game1A = {
      "id": "B3",
      "name": "Round 1A",
      "sides": {
        "visitor": {
          "team": {
            "id": "6 F",
            "name": "6 F"
          },
          "score": null,
          "seed": {
            "sourceGame": game0A,
            "rank": 1,
            "displayName": ""
          }
        },
        "home": {
          "team": {
            "id": "1 A",
            "name": "1 A"
          },
          "score": null,
          "seed": {
            "sourceGame": null,
            "rank": 1,
            "displayName": ""
          }
        }
      }
    };
    const game1B = {
      "id": "B4",
      "name": "Round 1B",
      "sides": {
        "visitor": {
          "team": null,
          "score": null,
          "seed": {
            "sourceGame": game0B,
            "rank": 1,
            "displayName": ""
          }
        },
        "home": {
          "team": {
            "id": "2 B",
            "name": "2 B"
          },
          "score": null,
          "seed": {
            "sourceGame": null,
            "rank": 1,
            "displayName": ""
          }
        }
      }
    };    
    
    const finals = {
      "id": "B5",
      "name": "Round 2",
      "sides": {
        "visitor": {
          "team": null,
          "score": null,
          "seed": {
            "sourceGame": game1B,
            "rank": 1,
            "displayName": ""
          }
        },
        "home": {
          "team": null,
          "score": null,
          "seed": {
            "sourceGame": game1A,
            "rank": 1,
            "displayName": ""
          }
        }
      }
    };

    // a game is made up of:
    //  ID
    //  name
    //  sides

    // brackets are built from the finals back
    // sourceGame is used to define the previous round's games

    //let's always make the home == one and visitor == two

    // so, to construct a bracket, i need to:
    //  build a dictionary of slots by ID
    //  build a dictionary of matchups by ID
    //  find the finals matchup (last round) and transform to bracket game
    //      id = whatever
    //      name = round of {rounds[-1].matchups.size() * 2}
    //      if there is another round before this
    //          sides:
    //              home
    //          

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
        {<Bracket game={finals} homeOnTop={homeOnTop} GameComponent={GameComponent}  />}

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
