import React, { useState } from 'react';
import CheckpointTable from './Admin/CheckpointTable';
import ChargeTable from './Admin/ChargeTable';
import AccountTable from './Admin/AccountTable';
import InvalidTable from './Admin/InvalidTable';
import { withRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Select from 'react-select';
import getToken from '../helpers/getToken'
import axios from 'axios';

// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap3';



class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 3,
      inputValue: '',
      cpk_list_th: [],
      cpk_list_en: [],
      cpkSelected: props.lang === 'en' ? {value: "Chonburi", label: "Chonburi", id: 1}: {value: "ชลบุรี", label: "ชลบุรี", id: 1},
      cpk_id: 1
    }
  }

  componentDidMount() {
    this.loadCPK();
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

 loadCPK = () => {
    const token = getToken();
    console.log(token)
    if (token) {
        axios.get('https://mlffts-api.herokuapp.com/checkpoint/limit=100&offset=0', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            
            let options_th = res.data.data.map((item, i) => ({  value: item.area_name, label: item.area_name, id:item.id }));
            let options_en = res.data.data.map((item, i) => ({  value: item.area_name_en, label: item.area_name_en, id:item.id }));
            this.setState({cpk_list_th: options_th, cpk_list_en: options_en})
        }
        ).catch((err) => {
            console.log(err)
            // props.history.push('/login');
        });
    }
};

selectCPK = (selected) => {
  console.log(selected)
  this.setState({cpkSelected: selected, cpk_id:selected.id})
}

  render() {

    
    let theme = createMuiTheme({
      typography: {
        fontFamily: [
            'Sarabun',
            'Roboto',
            'sans-serif'
        ].join(','),
    },
    overrides: {
      MuiTableCell: {
        root: {
          fontSize: '1rem',
        }
      }
    }
  });

    return (
      <div>
        <div className="navbar-space">
          <div className="columns is-centered">
            <div className="column is-11">
              <div className="tabs is-boxed is-marginless z-index-555">
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
                      <span value={1}>Charge</span>
                    </a>
                  </li>
                  <li className={this.state.currentTab === 3 ? "is-active" : ""} >
                    <a value={3} onClick={this.handleTabsClick}>
                      <span value={3}>Invalid Transaction</span>
                    </a>
                  </li>
                </ul>
                {this.state.currentTab === 3 && 
                <div className="container search-cpk-box">
                  <Select
                   options={this.props.lang === 'en' ? this.state.cpk_list_en : this.state.cpk_list_th}
                   isSearchable="false"
                   onChange={this.selectCPK}
                   value={this.state.cpkSelected}
                  />
                </div>}
              </div>

              <ThemeProvider theme={theme} >
              {
                this.state.currentTab === 0 ?
                  <CheckpointTable history={this.props.history} lang={this.props.lang}/>
                  :
                  null
              }

              {
                this.state.currentTab === 1 ?
                  <ChargeTable history={this.props.history} lang={this.props.lang}/>
                  :
                  null
              }
              {
                this.state.currentTab === 2 ?
                  <AccountTable history={this.props.history} lang={this.props.lang}/>
                  :
                  null
              }
              {
                this.state.currentTab === 3 ?
                  <InvalidTable history={this.props.history} lang={this.props.lang} cpk_id={this.state.cpk_id}/>
                  :
                  null
              }
            </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Admin);