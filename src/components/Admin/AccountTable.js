import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState, PagingState, CustomPaging, } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    TableColumnResizing,
    TableColumnVisibility,
    ColumnChooser,
    Toolbar
} from '@devexpress/dx-react-grid-material-ui';

import axios from 'axios';
import getToken from '../../helpers/getToken';
import Spinner from 'react-spinkit';
import qs from 'qs'
import { withStyles } from '@material-ui/core/styles';

const TableRowBase = ({ tableRow, selected, onToggle, classes, ...restProps }) => {

    const handleClick = () => {
        alert(JSON.stringify(tableRow.row));
    };

    const handleDoubleClick = () => {
        alert(JSON.stringify(tableRow.row));
    }

    return (
        <Table.Row
            {...restProps}
            className={classes.customRow}
            style={{ color: 'green' }}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        />
    );
};

const styles = {
    customRow: {
        '&:hover': {
            backgroundColor: '#F5F5F5',
        }
    },
};

const CustomRow = withStyles(styles, { name: 'CustomRow' })(TableRowBase);


const getRowId = row => row.id;

export default (props) => {
    const [columns] = useState([
        {
            title: 'ID',
            name: 'id'
        },
        {
            title: 'Username',
            name: 'username'
        },
        {
            title: 'Password',
            name: 'password'
        },
        {
            title: 'Type',
            name: 'type'
        },
        {
            title: 'isVerify',
            name: '_isVerify'
        },
        {
            title: 'isActivate',
            name: '_isActive'
        },
        {
            title: 'token',
            name: 'token'
        },
        {
            title: 'accessToken',
            name: 'access_token'
        },
    ]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState();
    const [pageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'id', width: 200 },
        { columnName: 'username', width: 200 },
        { columnName: 'password', width: 200 },
        { columnName: 'type', width: 200 },
        { columnName: '_isVerify', width: 200 },
        { columnName: '_isActive', width: 200 },
        { columnName: 'token', width: 240 },
        { columnName: 'access_token', width: 240 }
    ]);
    const [hiddenColumnNames, setHiddenColumnNames] = useState(['password', 'token', 'access_token']);

    const getQueryString = () => (
        // 'https://mlffts-api.herokuapp.com/account'
        `https://mlffts-api.herokuapp.com/account/limit=${pageSize}&offset=${pageSize * currentPage}`
    );

    const loadData = () => {
        const token = getToken();
        console.log(token)
        const queryString = getQueryString();
        if (token && !loading && queryString !== lastQuery) {
            setLoading(true);
            axios.get(queryString, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                console.log(res.data)
                setRows(res.data.data);
                setTotalCount(res.data.count);
                setLoading(false);
            }
            ).catch((err) => {
                console.log(err)
                setLoading(false)
                props.history.push('/login');
            });
            setLastQuery(queryString);
        }
    };


    const [editingStateColumnExtensions] = useState([
        { columnName: 'id', editingEnabled: false },
        { columnName: 'username', editingEnabled: false },
        { columnName: 'password', editingEnabled: false },
    ]);

    const editRow = (row) => {
        const id = Object.keys(row)[0]
        const data = Object.values(row)[0]

        const token = getToken();
        const reqBody = {
            id: id,
            ...data
        }
        console.log('reqbody', reqBody)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`
            }
        }

        console.log('in submit');

        axios.post('https://mlffts-api.herokuapp.com/account/edit', qs.stringify(reqBody), config).then(
            res => {
                console.log('done ' + res)
            }).catch(err => {
                console.log('error ja')
                console.log(err)
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    // console.log(err.response.headers);
                }
            })
    }

    const commitChanges = ({ added, changed, deleted }) => {
        console.log('commitChanges')
        let changedRows;
        if (changed) {
            console.log(changed)
            editRow(changed)
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        setRows(changedRows);
    };


    useEffect(() => loadData());

    if (rows.length === 0) {

        return (
            <div className="container">
                <Spinner name="line-scale" fadeIn='quarter' className="table-loading" />
            </div>
        )
    }

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                    columnExtensions={editingStateColumnExtensions}
                />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                />
                <CustomPaging
                    totalCount={totalCount}
                />
                <Table rowComponent={CustomRow} />
                {/* <TableColumnResizing
                    columnWidths={columnWidths}
                    onColumnWidthsChange={setColumnWidths}
                /> */}
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showEditCommand
                />
                <TableColumnVisibility
                    hiddenColumnNames={hiddenColumnNames}
                    onHiddenColumnNamesChange={setHiddenColumnNames}
                />
                <Toolbar />
                <ColumnChooser />
                <PagingPanel />
            </Grid>
        </Paper>
    );
};
