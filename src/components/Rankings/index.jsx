import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './Rankings.css';
import PropTypes from 'prop-types';
import RankingsStore from '../../stores/RankingsStore';

class Rankings extends Component {

  constructor() {
    super();
    this.RankingsStore = RankingsStore;
  }

  victimsFunction(props) {
    // return (<span>{props.value}</span>);
    const listItems = props.value.map((victimId) => (
      <li key={victimId}>{this.getDescription(victimId)}</li>
    ));
    // const listItemsSubset = listItems.slice(0, 4);
    const ellipses = ''; // listItemsSubset.length < listItems.length ? '...' : '';
    return <span className="victims">{listItems}{ellipses}</span>;
  }

  getDescription(subjectId) {
    const subject = this.RankingsStore.getSubjectById(subjectId);
    return subject.description;
  }

  render() {
    const columns = [{
      columns: [{
        Header: 'Rank',
        accessor: 'rank'
      },{
        accessor: 'imgLink',
        Cell: props => <span><img className="imgLink" src={props.value} alt=""/></span>
      },{
        Header: 'Description',
        accessor: 'description'
      },{
        Header: 'Wins',
        accessor: 'wins'
      },{
        id: 'losses',
        Header: 'Losses',
        accessor: d => (d.faced - d.wins)
      },{
        Header: 'Total',
        accessor: 'faced'
      },{
        Header: 'Victims',
        accessor: 'victims', 
        Cell: props => this.victimsFunction(props)
      }]
    }];

    return (
      <div>
        <h2>Rankings</h2>
        <ReactTable
          className="rankingsTable"
          data={this.props.rankings}
          columns={columns}
          pageSize={Math.min(this.props.rankings.length,20)}
        />
      </div>
    );
  }
}

Rankings.propTypes = {
  rank: PropTypes.number,
  imgLink: PropTypes.string,
  description: PropTypes.string,
  victims: PropTypes.array
};

Rankings.defaultProps = {
  rank: 999999,
  imgLink: '',
  description: '',
  victims: []
};

export default Rankings;