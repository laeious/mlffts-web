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
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Lang from '../../helpers/Lang';
import LinearProgress from '@material-ui/core/LinearProgress';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';




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
        // {
        //     title: 'Password',
        //     name: 'password'
        // },
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
        // {
        //     title: 'token',
        //     name: 'token'
        // },
        // {
        //     title: 'accessToken',
        //     name: 'access_token'
        // },
    ]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState();
    const [pageSize] = useState(10);
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
    const [isDialog, setIsDialog] = useState(false);
    const [changeSave, setChangeSave] = useState();
    const [rowBefore, setRowBefore] = useState();
    const [mode, setMode] = useState('');
    const [modeTxt, setModeTxt] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [subDialogTitle, setSubDialogTitle] = useState('');

    const hideDialog = () => {
        setRows(rowBefore);
        setIsDialog(false);
    }

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
            const dialogtxt = props.lang === 'th' ? 'บันทึกการเปลี่ยนแปลง' : 'Save Changes';
            const subdialogtxt = props.lang === 'th' ? 'คุณต้องการบันทึกการเปลี่ยนแปลงนี้ใช่หรือไม่' : 'Are you sure you want to save changes?';
            const buttontxt = props.lang === 'th' ? 'บันทึก' : 'Save';
            setMode('SAVE');
            setModeTxt(buttontxt);
            setDialogTitle(dialogtxt);
            setSubDialogTitle(subdialogtxt);
            setRowBefore(rows);
            if (Object.values(changed)[0] !== undefined) {
                setIsDialog(true);
                console.log(changed);
                setChangeSave(changed);
                // editRow(changed);
            }
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        setRows(changedRows);
    };

    const saveChanges = () => {
        if (mode === 'SAVE') {
            editRow(changeSave);
        }
        setIsDialog(false);
    }

    useEffect(() => loadData());

    if (rows.length === 0) {

        return (
            <div>
                <LinearProgress />
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
                    messages={{
                        addCommand: props.lang === 'th' ? 'เพิ่ม' : 'ADD',
                        editCommand: props.lang === 'th' ? 'แก้ไข' : 'EDIT',
                        cancelCommand: props.lang === 'th' ? 'ยกเลิก' : 'CANCEL',
                        commitCommand: props.lang === 'th' ? 'ยืนยัน' : 'SAVE',
                        deleteCommand: props.lang === 'th' ? 'ลบ' : 'DELETE'
                    }}
                />
                {/* <TableColumnVisibility
                    hiddenColumnNames={hiddenColumnNames}
                    onHiddenColumnNamesChange={setHiddenColumnNames}
                />
                <Toolbar />
                <ColumnChooser /> */}
                <PagingPanel />
            </Grid>
            <Dialog open={isDialog}>
                <DialogTitle><i className={`fas ${mode == 'DELETE' ? 'fa-trash-alt delete-icon' : 'fa-save save-icon'}`} />{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {subDialogTitle}
                        <br />

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={saveChanges}
                        color={mode == 'DELETE' ? "secondary" : "primary"}
                        variant="contained"
                    >
                        <b>{modeTxt}</b>
                    </Button>
                    <Button
                        onClick={hideDialog}
                        variant="outlined"
                    >
                        <Lang lang={props.lang} th='ยกเลิก' en='Cancel' />
                    </Button>

                </DialogActions>
            </Dialog>
            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={props.lang === 'en' ? "The operation was successful." : "ดำเนินการสำเร็จ"}

                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            /> */}
        </Paper>
    );
};
