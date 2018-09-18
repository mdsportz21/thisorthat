import React, { Component } from "react";
import './App.css';
import connectToStores from 'alt-utils/lib/connectToStores';
import Subject from './components/Subject';
import BracketStore from './stores/BracketStore';
import BracketActions from './actions/BracketActions';
import { BracketGame, Bracket } from 'react-tournament-bracket';
import * as types from './types'; // eslint-disable-line no-unused-vars

class BracketComponent extends Component {
  /**
   * @typedef {Object} BracketComponentProps
   * @property {types.BracketInstance} bracketInstance
   * @property {types.TournamentGame} displayedRootGame
   * @property {types.TournamentGame[]} gamesForDisplay
   * @property {number} gamesForDisplayIndex
   * @property {boolean} homeOnTop
   * @property {types.TournamentGame} rootGame
   * @property {types.TournamentGame} selectedGame
   * @property {types.TournamentSide} sideOne
   * @property {types.TournamentSide} sideTwo
   * @property {Object.<string,types.Team>} teamsById
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
    const { gamesForDisplayIndex } = this.props;
    if (gamesForDisplayIndex > 0) {
      BracketActions.showPage(gamesForDisplayIndex - 1);
    }
  }

  handleFirstUnfinishedPageClick() {
    BracketActions.showFirstUnfinishedPage();
  }

  handleNextPageClick() {
    /** @type {BracketComponentProps} */
    const { gamesForDisplayIndex, gamesForDisplay } = this.props;
    if (gamesForDisplayIndex < gamesForDisplay.length - 1) {
      BracketActions.showPage(gamesForDisplayIndex + 1);
    }
  }

  render() {
    /** @type {BracketComponentProps} */
    const {
      homeOnTop,
      displayedRootGame,
      gamesForDisplay,
      gamesForDisplayIndex,
      bracketInstance,
      teamsById,
      selectedGame
    } = this.props;
    const { gameComponent: GameComponent } = this;

    const sideOne = selectedGame ? selectedGame.sides.home : null;
    const sideTwo = selectedGame ? selectedGame.sides.visitor : null;
  
    const selectedGameHomeTeam = selectedGame ? selectedGame.sides.home.team : null;
    const selecteeGameVisitorTeam = selectedGame ? selectedGame.sides.visitor.team : null;
  
    const teamOne = teamsById && selectedGameHomeTeam ? teamsById[selectedGameHomeTeam.id] : null;
    const teamTwo = teamsById && selecteeGameVisitorTeam ? teamsById[selecteeGameVisitorTeam.id] : null;
  
    const bracket = displayedRootGame ? (
      <Bracket game={displayedRootGame} homeOnTop={homeOnTop} GameComponent={GameComponent} />
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
          <button onClick={(e) => this.handlePreviousPageClick()}>Previous Page</button>
          <button onClick={(e) => this.handleFirstUnfinishedPageClick()}>First Unfinished Page</button>
          <button onClick={(e) => this.handleNextPageClick()}>Next Page</button>
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

BracketComponent.getStores = function () {
  return [BracketStore];
};

BracketComponent.getPropsFromStores = function () {
  /** @type {types.BracketStore} */
  const bracketStoreState = BracketStore.getState();

  return {
    bracketInstance: bracketStoreState.bracketInstance,
    homeOnTop: bracketStoreState.homeOnTop,
    displayedRootGame: bracketStoreState.displayedRootGame,
    gamesForDisplay: bracketStoreState.gamesForDisplay,
    gamesForDisplayIndex: bracketStoreState.gamesForDisplayIndex,
    rootGame: bracketStoreState.rootGame,
    selectedGame: bracketStoreState.selectedGame,
    teamsById: bracketStoreState.teamsById
  };
};

export default connectToStores(BracketComponent);