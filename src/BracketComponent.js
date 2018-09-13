import React, { Component } from "react";
import './App.css';
import connectToStores from 'alt-utils/lib/connectToStores';
import Subject from './components/Subject';
import BracketStore from './stores/BracketStore';
import BracketActions from './actions/BracketActions';
import {BracketGame, Bracket} from 'react-tournament-bracket';
// import * as types from './types';
 
class BracketComponent extends Component {

  componentDidMount() {
    const { finalTournamentGame, history } = this.props;
    const { search } = history.location;
    if (!search) {
      if (!finalTournamentGame) {
        history.push('/');
      }
      return;
    }
    // const bracketName = search.substring(search.indexOf('=') + 1);
    // BracketActions.fetchBracket(bracketName);

    const bracketFieldId = search.substring(search.indexOf('=') + 1);
    BracketActions.generateBracketInstance(bracketFieldId);
  }

  handleSaveClick() {
    const { finalTournamentGame, bracketWrapper } = this.props;
    // BracketActions.saveBracket(finalTournamentGame, bracketInstance.bracket.name);
  }

  /**
   * 
   * @param {types.TournamentSide} side 
   */
  handleSideClick(side) {
    if (side.team != null) {
      BracketActions.selectWinner(side);
    }

    // TODO: Add this same handler to the subject click handler
  }

  /**
   * Highlight game on rollover
   * @param {types.TournamentGame} game 
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

  /**
   * 
   * @param {types.TournamentSide} side 
   */
  isWinner(side) {
    return side && side.score && side.score.score === 1;
  }

  render() {
    const { sideOne, sideTwo, teamOne, teamTwo, homeOnTop, finalTournamentGame, bracketInstance } = this.props;
    const { gameComponent: GameComponent } = this; 

    const bracket = finalTournamentGame ? (
      <Bracket game={finalTournamentGame} homeOnTop={homeOnTop} GameComponent={GameComponent}  />
    ) : ( 
      <div></div> 
    );
    
    return (
      <div className="App">
          
        <div className="Title">
          <h2>Brack It</h2>
        </div>

        <h4>{bracketInstance && bracketInstance.bracketField.name}</h4>

        <div className="Subjects">
            <Subject 
              team={teamOne}
              isWinner={this.isWinner(sideOne)}
              onClick={(e) => this.handleSideClick(sideOne)}
              />
            <h3 className="Or">or</h3>
            <Subject 
              team={teamTwo}
              isWinner={this.isWinner(sideTwo)}
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

BracketComponent.getStores = function() {
  return [BracketStore];
};

BracketComponent.getPropsFromStores = function() {
  /** @type {types.BracketStore} */
  const bracketStoreState = BracketStore.getState();
  const { bracketInstance, teamsById, finalTournamentGame, selectedGame } = bracketStoreState;

  const sideOne = selectedGame ? selectedGame.sides.home : null;
  const sideTwo = selectedGame ? selectedGame.sides.visitor : null;

  const selectedGameHomeTeam = selectedGame ? selectedGame.sides.home.team : null;
  const selectedGameVisitorTeam = selectedGame ? selectedGame.sides.visitor.team : null;

  const teamOne = teamsById && selectedGameHomeTeam ? teamsById[selectedGameHomeTeam.id] : null;
  const teamTwo = teamsById && selectedGameVisitorTeam ? teamsById[selectedGameVisitorTeam.id] : null;

  return {
    bracketInstance,
    teamsById,
    finalTournamentGame,
    sideOne,
    sideTwo,
    teamOne,
    teamTwo
  };
};
 
export default connectToStores(BracketComponent);