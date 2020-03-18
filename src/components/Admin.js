import React, { useState } from 'react';
import CheckpointTable from './Admin/CheckpointTable';
import ChargeTable from './Admin/ChargeTable';
import AccountTable from './Admin/AccountTable';
import InvalidTable from './Admin/InvalidTable';
import { withRouter } from 'react-router-dom';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap3';



class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 3,
      inputValue: ''
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

  handleTabsClick = (e) => {
    if (e !== undefined) {
      const index = parseInt(e.target.getAttribute('value'));
      if (index !== undefined) {
        this.setState({ currentTab: index });
      }
    }
  }


  render() {

    return (
      <div>
        <div className="navbar-space">
          <div className="columns is-centered ">
            <div className="column is-11">
              <div className="tabs is-boxed">
                <ul>
                  <li className={this.state.currentTab === 2 ? "is-active" : ""} >
                    <a value={2} onClick={this.handleTabsClick} >
                      <span value={2}>Account</span>
                    </a>
                  </li>
                  <li className={this.state.currentTab === 0 ? "is-active" : ""} >
                    <a value={0} onClick={this.handleTabsClick}>
                      <span value={0}> Checkpoint</span>
                    </a>
                  </li>
                  <li className={this.state.currentTab === 1 ? "is-active" : ""} >
                    <a value={1} onClick={this.handleTabsClick} >
                      <span value={1}>Charges</span>
                    </a>
                  </li>
                  <li className={this.state.currentTab === 3 ? "is-active" : ""} >
                    <a value={3} onClick={this.handleTabsClick}>
                      <span value={3}>Invalid Transaction</span>
                    </a>
                  </li>

                </ul>

              </div>

              {
                this.state.currentTab === 0 ?
                  <CheckpointTable history={this.props.history} />
                  :
                  null
              }

              {
                this.state.currentTab === 1 ?
                  <ChargeTable history={this.props.history} />
                  :
                  null
              }
              {
                this.state.currentTab === 2 ?
                  <AccountTable history={this.props.history} />
                  :
                  null
              }
              {
                this.state.currentTab === 3 ?

                  <InvalidTable history={this.props.history} lang={this.props.lang} />
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

export default withRouter(Admin);