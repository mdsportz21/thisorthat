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
        Cell: props => <span><img className="imgLink" src={props.value}/></span>
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
          pageSize={Math.min(4,20)}
        />
      </div>
    );
  }
}

export default Rankings;