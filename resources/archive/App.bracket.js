import React, { PureComponent } from 'react';
import './App.css';
import connectToStores from 'alt-utils/lib/connectToStores';
import Subject from './components/Subject';
import BracketStore from './stores/BracketStore';
import BracketActions from './actions/BracketActions';
import {BracketGame, Bracket} from 'react-tournament-bracket';

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

  componentDidMount() {
    BracketActions.fetchBracket('15', '');
  }

  handleSaveClick() {
    BracketActions.saveBracket(this.props.finals, this.props.bracketWrapper.bracket.name);
  }

  /**
   * 
   * @param {TournamentSide} side 
   */
  handleSideClick(side) {
    if (side.team != null) {
      BracketActions.selectWinner(side);
    }

    // TODO: Add this same handler to the subject click handler
  }

  /**
   * Highlight game on rollover
   * @param {TournamentGame} game 
   */
  handleGameMouseEnter(game) {
    BracketActions.selectGame(game.id);
  }

  gameComponent = props => {
    return (
      <BracketGame
        {...props}
        // onHoveredTeamIdChange={hoveredTeamId => this.setState({ hoveredTeamId })}
        onSideClick={(side) => this.handleSideClick(side)}
        onMouseEnter={() => this.handleGameMouseEnter(props.game)}
        // hoveredTeamId={this.state.hoveredTeamId}
        />
    );
  };

  render() {
    const { sideOne, sideTwo, teamOne, teamTwo, homeOnTop } = this.props;
    const { gameComponent: GameComponent } = this; 

    const bracket = this.props.finals ? (
      <Bracket game={this.props.finals} homeOnTop={homeOnTop} GameComponent={GameComponent}  />
    ) : ( 
      <div></div> 
    );
    
    return (
      <div className="App">
          
        <div className="Title">
          <h2>Brack It</h2>
        </div>

        <h4>{this.props.bracketWrapper && this.props.bracketWrapper.bracket.name}</h4>

        <div className="Subjects">
            <Subject 
              team={teamOne}
              onClick={(e) => this.handleSideClick(sideOne)}
              />
            <h3 className="Or">or</h3>
            <Subject 
              team={teamTwo}
              onClick={(e) => this.handleSideClick(sideTwo)}
              />
        </div>

        <div className="Bracket">
          {bracket}
        </div>

      <div>
        <button onClick={(e) => this.handleSaveClick()}>
          save
        </button>
      </div>
      </div>
    );
  }
}

App.getStores = function() {
  return [BracketStore];
};

App.getPropsFromStores = function() {
  const { bracketWrapper, teamsBySlotId, finals, selectedGame } = BracketStore.getState();

  const sideOne = selectedGame ? selectedGame.sides.home : null;
  const sideTwo = selectedGame ? selectedGame.sides.visitor : null;

  const selectedGameHomeTeam = selectedGame ? selectedGame.sides.home.team : null;
  const selecteeGameVisitorTeam = selectedGame ? selectedGame.sides.visitor.team : null;

  const teamOne = teamsBySlotId && selectedGameHomeTeam ? teamsBySlotId[selectedGameHomeTeam.id] : null;
  const teamTwo = teamsBySlotId && selecteeGameVisitorTeam ? teamsBySlotId[selecteeGameVisitorTeam.id] : null;

  return {
    bracketWrapper,
    teamsBySlotId,
    finals,
    sideOne,
    sideTwo,
    teamOne,
    teamTwo
  };
};

export default connectToStores(App);
