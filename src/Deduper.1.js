import React, { Component } from "react";
import connectToStores from 'alt-utils/lib/connectToStores';
// import DupeStore from './stores/DupeStore';
// import DupeActions from './actions/DupeActions';

class Deduper extends Component {

  constructor(props) {
    super(props);
    const teams = [
      {name: 'Aberdeen Ironbirds'},
      {name: 'Aberdeen Steamed Crabs'},
      {name: 'Akron RubberDucks'},
      {name: 'Albuquerque Dukes'},
      {name: 'Albuquerque Green Chile Cheeseburgers'},
      {name: 'Albuquerque Isotopes'},
      {name: 'Altoona Curve'},
      {name: 'Arkansas Travelers'},
      {name: 'Asheville Tourists'}
    ];
    this.state = {teams};
  }

  TeamGrid = () => {
    
    return(
      <div>test</div>
    );
  };

  render() {
    const { TeamGrid } = this;
    return (
      <TeamGrid/>
    );
  }
}

// Deduper.getStores = function() {
//   return [DupeStore];
// };

Deduper.getPropsFromStores = function() {
  return {

  };
};

// export default connectToStores(Deduper);