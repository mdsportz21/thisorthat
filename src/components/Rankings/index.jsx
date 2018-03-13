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
      <li key={victimId}>{this.getName(victimId)}</li>
    ));
    const listItemsSubset = listItems.slice(0, 4);
    const ellipses = listItemsSubset.length < listItems.length ? '...' : '';
    return <span className="victims">{listItemsSubset}{ellipses}</span>;
  }

  getName(subjectId) {
    const subject = this.RankingsStore.getSubjectById(subjectId);
    return subject.name;
  }

  render() {
    const columns = [{
      columns: [{
        Header: 'Rank',
        accessor: 'rank',
        maxWidth: 70
      },{
        accessor: 'imgLink',
        Cell: props => <span><img className="imgLink" src={props.value} alt=""/></span>,
        maxWidth: 85
      },{
        Header: 'Name',
        accessor: 'name'
      },{
        Header: 'Wins',
        accessor: 'wins',
        maxWidth: 70
      },{
        id: 'losses',
        Header: 'Losses',
        accessor: d => (d.faced - d.wins),
        maxWidth: 70
      },{
        Header: 'Total',
        accessor: 'faced',
        maxWidth: 70
      },{
        Header: 'Victims',
        accessor: 'victims', 
        Cell: props => this.victimsFunction(props),
        style: {
          justifyContent: 'left',
          'padding': '20px'
        }
      },{
        accessor: 'selected',
        show: false
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
          getTrProps={(state, rowInfo, column) => {
            if (rowInfo) {
              return {
                style: {
                  fontWeight: rowInfo.row.selected ? 'bold' : 'normal'
                }
              };
            }
          }}
          sortable={false}
          sorted={[{
            id: 'selected',
            desc: true
          },{
            id: 'rank',
            desc: false
          }]}
        />
      </div>
    );
  }
}

Rankings.propTypes = {
  rank: PropTypes.number,
  imgLink: PropTypes.string,
  name: PropTypes.string,
  victims: PropTypes.array
};

Rankings.defaultProps = {
  rank: 999999,
  imgLink: '',
  name: '',
  victims: []
};

export default Rankings;