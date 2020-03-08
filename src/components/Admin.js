import React, { useState } from 'react';
import CheckpointTable from './Admin/CheckpointTable';
import ChargeTable from './Admin/ChargeTable';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap3';



class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        currentTab : 0
    }
  }

  componentDidMount() {

  }

  getRowId = row => row.id;

  commitChanges = ({ added, changed, deleted }) => {
    let rows = this.rows
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setRows(changedRows);
  };

 

  handleTabsClick = (e) =>{
    if(e !== undefined){
      const index = parseInt(e.target.getAttribute('value'));   
      if(index !== undefined){
          this.setState({currentTab: index});
      }
  }
  }


  render() {


    return (
      <div>
      <div className="navbar-space">
        <div className="columns is-centered">
          <div className="column is-11">

          <div className="tabs is-boxed">
            <ul>
              <li className={this.state.currentTab === 0 ? "is-active" : ""} >
                <a >
                  <span value={0} onClick={this.handleTabsClick}> Checkpoint</span>
                </a>
              </li>
              <li className={this.state.currentTab === 1 ? "is-active" : ""} >
                <a >
                  <span value={1} onClick={this.handleTabsClick}>Something else</span>
                </a>
              </li>
              
            </ul>

          </div>

          {
            this.state.currentTab === 0 ?
            <CheckpointTable history={this.props.history}/>
            :
            null
          }

          {
            this.state.currentTab === 1 ?
            <ChargeTable history={this.props.history}/>
            :
            null
          }

          </div>

        </div>
      </div>
      </div>
    )
  }
}

export default Admin;