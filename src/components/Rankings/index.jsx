import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './Rankings.css';

class Rankings extends Component {

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
      }]
    }];

    return (
      <div>
        <h2>Rankings</h2>
        <ReactTable
          data={this.props.rankings}
          columns={columns}
          pageSize={Math.min(this.props.rankings.length,20)}
        />
      </div>
    );
  }
}

export default Rankings;