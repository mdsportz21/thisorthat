import React, { Component } from "react";
import connectToStores from 'alt-utils/lib/connectToStores';
import './App.css';
import Subject from './components/Subject';
import DeduperStore from './stores/DeduperStore';
import DeduperActions from './actions/DeduperActions';

class Deduper extends Component {

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      DeduperActions.fetchDupes();
    }
  }

  componentDidUpdate() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      DeduperActions.fetchDupes();
    }
  }

  handleDupeClick(clickedTeam) {
    const { teams } = this.props;
    const clickedTeamInList = teams.find(team => team.imgLink === clickedTeam.imgLink);
    const clickedTeamIsDuplicate = clickedTeam.isDuplicate;
    clickedTeamInList.isDuplicate = clickedTeamIsDuplicate ? false : true;
    this.setState({ teams });
  }

  handleSubmitDuplicates() {
    const { name, teams } = this.props;
    const teamIds = teams.filter(team => team.isDuplicate).map(team => team.teamId);
    // if (teamIds.length === 0) {
    //   return;
    // }
    DeduperActions.saveDupes(name, teamIds);
    // teamIds = teams.map(team => team.id);
  }

  TeamGrid = () => {
    const { teams } = this.props;
    if (!teams) {
      return null;
    }
    const teamComponents = teams.map((team, i) => {
      return (
        <div className={"dupe-candidate " + (team.isDuplicate ? "dupe" : "") } key={team.imgLink}>
          <Subject 
            team={team}
            hideLabel={true}
            onClick={(e) => this.handleDupeClick(team)}
            />
        </div>);
    });
    return(
      <div className="box">{teamComponents}</div>
    );
  };

  render() {
    const { name } = this.props;
    const { TeamGrid } = this;
    return (
      <div>
        <h2>{name}</h2>
        <p>Click to eliminate</p>
        <div className="dupe-candidates"><TeamGrid/></div>
        <button onClick={ (e) => this.handleSubmitDuplicates() }> Submit </button>
      </div>
    );
  }
}

Deduper.getStores = function() {
  return [DeduperStore];
};

Deduper.getPropsFromStores = function() {
  const { teams, name, isLoaded } = DeduperStore.getState();

  return {
    teams,
    name,
    isLoaded
  };
};

export default connectToStores(Deduper);