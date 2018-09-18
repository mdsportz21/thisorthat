import React, { Component } from "react";
import './App.css';
import connectToStores from 'alt-utils/lib/connectToStores';
import Subject from './components/Subject';
import BracketStore from './stores/BracketStore';
import BracketActions from './actions/BracketActions';
import {BracketGame, Bracket} from 'react-tournament-bracket';
import * as types from './types'; // eslint-disable-line no-unused-vars
 
class BracketComponent extends Component {
  /**
   * @typedef {Object} BracketComponentProps
   * @property {types.BracketInstance} bracketInstance
   * @property {types.BracketDisplayInfo} bracketDisplayInfo
   * @property {boolean} homeOnTop
   * @property {types.TournamentSide} sideOne
   * @property {types.TournamentSide} sideTwo
   * @property {types.Team} teamOne
   * @property {types.Team} teamTwo
   */

  componentDidMount() {
    /** @type {BracketComponentProps} */
    const { rootGame, history } = this.props;
    const { search } = history.location;
    if (!search) {
      if (!rootGame) {
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
    // const { finalTournamentGame, bracketWrapper } = this.props;
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
  }

  /**
   * Highlight game on rollover
   * @param {types.TournamentGame} game 
   */
  handleGameClick(game) {
    BracketActions.selectGame(game.id);
  }

  gameComponent = props => {
    return (
      <BracketGame
        {...props}
        // onHoveredTeamIdChange={hoveredTeamId => this.setState({ hoveredTeamId })}
        // onSideClick={(side) => this.handleSideClick(side)}
        onClick={() => this.handleGameClick(props.game)}
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

  handlePreviousPageClick() {
    /** @type {BracketComponentProps} */
    const { bracketDisplayInfo } = this.props;
    const { gamesForDisplayIndex } = bracketDisplayInfo;
    if (gamesForDisplayIndex > 0) {
      BracketActions.showPage(gamesForDisplayIndex - 1);
    }
  }

  handleFirstUnfinishedPageClick() {
    BracketActions.showFirstUnfinishedPage();
  }

  handleNextPageClick() {
    /** @type {BracketComponentProps} */
    const { bracketDisplayInfo } = this.props;
    const { gamesForDisplayIndex, gamesForDisplay } = bracketDisplayInfo;
    if (gamesForDisplayIndex < gamesForDisplay.length - 1 ) {
      BracketActions.showPage(gamesForDisplayIndex + 1);
    }
  }

  render() {
    /** @type {BracketComponentProps} */
    const { sideOne, sideTwo, teamOne, teamTwo, homeOnTop, bracketDisplayInfo, bracketInstance } = this.props;
    /** @type {types.BracketDisplayInfo} */
    const { 
      displayedRootGame, 
      gamesForDisplay,
      gamesForDisplayIndex 
    } = bracketDisplayInfo;
    const { gameComponent: GameComponent } = this;

    const bracket = displayedRootGame ? (
      <Bracket game={displayedRootGame} homeOnTop={homeOnTop} GameComponent={GameComponent}  />
    ) : ( 
      <div></div> 
    );
    
    // TODO: replace pagination buttons with slider maybe
    return (
      <div className="App">
          
        {/* <div className="Title">
          <h2>Brack It</h2>
        </div> */}

        <h4>{bracketInstance && bracketInstance.bracketField.name}</h4>

        <h5>{gamesForDisplay && "Page " + (gamesForDisplayIndex + 1) + " of " + gamesForDisplay.length}</h5>

        <span>
          <button onClick={ (e) => this.handlePreviousPageClick() }>Previous Page</button>
          <button onClick={ (e) => this.handleFirstUnfinishedPageClick() }>First Unfinished Page</button>
          <button onClick={ (e) => this.handleNextPageClick() }>Next Page</button>
        </span>

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
  const { bracketInstance, bracketDisplayInfo, homeOnTop} = bracketStoreState;
  const { selectedGame, teamsById } = bracketDisplayInfo;

  const sideOne = selectedGame ? selectedGame.sides.home : null;
  const sideTwo = selectedGame ? selectedGame.sides.visitor : null;

  const selectedGameHomeTeam = selectedGame ? selectedGame.sides.home.team : null;
  const selectedGameVisitorTeam = selectedGame ? selectedGame.sides.visitor.team : null;

  const teamOne = teamsById && selectedGameHomeTeam ? teamsById[selectedGameHomeTeam.id] : null;
  const teamTwo = teamsById && selectedGameVisitorTeam ? teamsById[selectedGameVisitorTeam.id] : null;

  return {
    bracketInstance,
    bracketDisplayInfo,
    sideOne,
    sideTwo,
    teamOne,
    teamTwo,
    homeOnTop
  };
};
 
export default connectToStores(BracketComponent);