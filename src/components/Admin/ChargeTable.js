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
import qs from 'qs';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Lang from '../../helpers/Lang';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import { withStyles } from '@material-ui/core/styles';

const TableRowBase = ({ tableRow, selected, onToggle, classes, ...restProps }) => {

    // const handleClick = () => {
    //     alert(JSON.stringify(tableRow.row));
    // };

    // const handleDoubleClick = () => {
    //     alert(JSON.stringify(tableRow.row));
    // }

    return (
        <Table.Row
            {...restProps}
            className={classes.customRow}
            style={{ color: 'green' }}
            // onClick={handleClick}
            // onDoubleClick={handleDoubleClick}
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
    const [pageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isDialog, setIsDialog] = useState(false);
    const [changeSave, setChangeSave] = useState();
    const [rowBefore, setRowBefore] = useState();
    const [mode, setMode] = useState('');
    const [modeTxt, setModeTxt] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [subDialogTitle, setSubDialogTitle] = useState('');
    const [dialogCont, setDialogCont] = useState();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    
    const hideDialog = () => {
        setRows(rowBefore);
        setIsDialog(false);
    }

    const reload = () => {
        const token = getToken();
        console.log(token)
        const queryString = getQueryString();
        if (token && !loading ) {
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
                if (err.response) {
                    if (err.response.status === 404) {
                        setRows([]);
                        setLoading(false);
                    }
                }
            });
    }}


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
                handleOpen()
                reload()
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
                handleOpen()
                // reload()
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
                handleOpen()
                reload()
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
            changedRows = rows;
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
        if (deleted) {
            console.log(deleted)
            console.log(rows);
            const context = rows.filter(i =>  i.id == deleted[0]);
            console.log(context)
            const dialogtxt = props.lang === 'th' ? 'ลบ' : 'Delete';
            const subdialogtxt = props.lang === 'th' ? 'คุณต้องการลบ Charge นี้ใช่หรือไม่' : 'Are you sure you want to delete this Charge?';
            const buttontxt = props.lang === 'th' ? 'ลบ' : 'Delete';
            setModeTxt(buttontxt);
            setDialogTitle(dialogtxt);
            setSubDialogTitle(subdialogtxt);
            setDialogCont(context);
            setRowBefore(rows);
            setIsDialog(true);
            setChangeSave(deleted);
            setMode('DELETE');
            // deleteRow(deleted);
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };

    const saveChanges = () => {
        if (mode === 'SAVE') {
            editRow(changeSave);
        } else if (mode === 'DELETE') {
            deleteRow(changeSave);
        }
        setIsDialog(false);
    }

    useEffect(() => loadData());

    if (rows === undefined || rows.length === 0) {

        return (
            <div >
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
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                    messages = {{
                        addCommand : props.lang === 'th' ? 'เพิ่ม' : 'ADD',
                        editCommand : props.lang === 'th' ? 'แก้ไข' : 'EDIT',
                        cancelCommand : props.lang === 'th' ? 'ยกเลิก' : 'CANCEL',
                        commitCommand : props.lang === 'th' ? 'ยืนยัน' : 'SAVE',
                        deleteCommand : props.lang === 'th' ? 'ลบ' : 'DELETE'
                    }}
                />
                <PagingPanel />
            </Grid>
            <Dialog open={isDialog}>
                    <DialogTitle><i className={`fas ${mode == 'DELETE' ? 'fa-trash-alt delete-icon' : 'fa-save save-icon' }`}/>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {subDialogTitle}
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
                <Snackbar
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
            />
        </Paper>
    );
};
