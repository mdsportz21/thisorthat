import React, { Component } from "react";
import connectToStores from 'alt-utils/lib/connectToStores';
import BracketStore from './stores/BracketStore';
import BracketActions from './actions/BracketActions';
 
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {bracketFields: []};
  }

  componentDidMount() {
    BracketActions.fetchBracketFields();
  }

  handleBracketFieldClick(bracketFieldId) {
    this.props.history.push({
      pathname: '/bracket',
      search: '?id=' + bracketFieldId
    });
  }

  BracketFieldList = (props) => {
    const { bracketFields } = props;
    const listItems = bracketFields.map((bracketField) =>
      <li key={bracketField.bracketFieldId} onClick={(e) => this.handleBracketFieldClick(bracketField.bracketFieldId)}>
        {bracketField.name}
      </li>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  render() {
    const { BracketFieldList } = this;
    const { bracketFields } = this.props;

    return (
      <div>
        {bracketFields && <BracketFieldList bracketFields={bracketFields} />}
      </div>
    );
  }
}

Home.getStores = function() {
  return [BracketStore];
};

Home.getPropsFromStores = function() {
  const { bracketFields } = BracketStore.getState();

  return {
    bracketFields
  };
}
 
export default connectToStores(Home);