import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState, PagingState, CustomPaging, } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import axios from 'axios';
import getToken from '../../helpers/getToken';
import Spinner from 'react-spinkit';
import qs from 'qs'



const getRowId = row => row.id;

export default (props) => {
    const [columns] = useState([
        {
            title: 'ID',
            name: 'id'
        },
        {
            title: 'CPK 1',
            name: 'cpk_1'
        },
        {
            title: 'CPK 2',
            name: 'cpk_2'
        }, {
            title: 'Cost',
            name: 'cost'
        },
    ]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState();
    const [pageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);


    const getQueryString = () => (
        `https://mlffts-api.herokuapp.com/charges/limit=${pageSize}&offset=${pageSize * currentPage}`
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
    ]);

    const addRow = (row) => {

        const data = row[0]
        const token = getToken();
        const reqBody = {
            cpk_1: data.cpk_1,
            cpk_2: data.cpk_2,
            cost: data.cost
        }
        console.log('reqbody', reqBody)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`
            }
        }

        console.log('in submit');

        axios.post('https://mlffts-api.herokuapp.com/charges/add', qs.stringify(reqBody), config).then(
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

    const deleteRow = (row) => {
        const id = row[0];
        console.log(typeof (id))
        const token = getToken();
        const reqBody = {
            id: id
        }
        console.log('reqbody', reqBody)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`
            }
        }

        console.log('in submit');

        axios.post('https://mlffts-api.herokuapp.com/charges/delete', qs.stringify(reqBody), config).then(
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

        axios.post('https://mlffts-api.herokuapp.com/charges/edit', qs.stringify(reqBody), config).then(
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
        if (added) {
            console.log(added)
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            // const startingAddedId = totalCount+1;
            // setTotalCount(startingAddedId);
            addRow(added)
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: null,
                    ...row,
                })),
            ];
        }
        if (changed) {
            console.log(changed)
            editRow(changed)
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            console.log(deleted)
            deleteRow(deleted)
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
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
                <Table />
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                />
                <PagingPanel />
            </Grid>
        </Paper>
    );
};
