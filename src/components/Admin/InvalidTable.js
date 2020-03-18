import React, { useState, useEffect, useCallback } from 'react';
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
import qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import Modal from '../Modal';
import AsyncSelect from 'react-select/async';
import Lang from '../../helpers/Lang';
import Spinner from 'react-spinkit';



const getRowId = row => row.id;

export default (props) => {
    const [columns] = useState([
        {
            title: 'LP Number',
            name: 'lp_num'
        },
        {
            title: 'LP Province',
            name: 'lp_prov'
        },
        {
            title: 'Location In',
            name: 'location_in'
        },
        {
            title: 'Location Out',
            name: 'location_out'
        },
    ]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState();
    const [pageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isModal, toggleModal] = useState(false);
    const [lpnum, setlpnum] = useState('');
    const [lppro, setlppro] = useState('');
    const [rowNum, setRowNum] = useState('');
    const [rowPro, setRowPro] = useState('');
    const [isNumEmpty, setNumEmpty] = useState(false);
    const [isProEmpty, setProEmpty] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [image, setImage] = useState('');



    // const handleToggle = useCallback(
    //     () => {
    //         toggleModal(!isModal);
    //     },
    //     [isModal],
    // );

    const handleToggle = () =>{
        if(isModal){
            setImage('')
            toggleModal(false);
        }else{
            toggleModal(true);
        }
    }

    const TableRowBase = ({ tableRow, selected, onToggle, classes, ...restProps }) => {

        const handleClick = () => {
            setRowNum(tableRow.row.lp_num);
            setRowPro(tableRow.row.lp_prov);
            // setSelectedRow(tableRow.row)
            loadImage(tableRow.row.img_path, tableRow.row.location_in, tableRow.row.location_out);
            toggleModal(!isModal);
        };

        // const handleDoubleClick = () => {
        //     alert(JSON.stringify(tableRow.row));
        // }

        return (
            <Table.Row
                {...restProps}
                className={classes.customRow}
                style={{ color: 'green' }}
                onClick={handleClick}
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





    const getQueryString = () => (
        `https://mlffts-api.herokuapp.com/invalid/limit=${pageSize}&offset=${pageSize * currentPage}&cpkid=1`
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
                if (err.response) {
                    if (err.response.status === 404) {
                        setRows([]);
                        setLoading(false);
                    }
                }
            });
            setLastQuery(queryString);
        }
    };

    const loadOptionsNum = (lpnum, callBack) => {
        const token = getToken();
        const queryString = `https://mlffts-api.herokuapp.com/lpinfo/wc?type=lp_num&wildcard=${lpnum}`;
        if (token && queryString) {
            axios.get(queryString, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                // console.log(res.data.data)
                let reoptions = res.data.data.map((item, i) => ({ value: item, label: item }))
                callBack(reoptions)
            }
            ).catch((err) => {
                console.log(err)
                props.history.push('/login');
            });
        }
    };


    const loadOptionsPro = (pro, callBack) => {
        const token = getToken();
        const queryString = `https://mlffts-api.herokuapp.com/lpinfo/wc?type=prov&wildcard=${pro}`;
        if (token && queryString) {
            axios.get(queryString, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                // console.log(res.data.data)
                let reoptions = res.data.data.map((item, i) => ({ value: item, label: item }))
                callBack(reoptions)
            }
            ).catch((err) => {
                console.log(err)
                props.history.push('/login');
            });
        }
    };


    const [editingStateColumnExtensions] = useState([
        { columnName: 'id', editingEnabled: false },
    ]);


    useEffect(() => loadData());

    const handleLPnum = (newValue) => {
        if(newValue !== null){
            setlpnum(newValue.value)
        }else{
            setlpnum('')
        }
    };

    const handleLPpro = (newValue) => {
        if(newValue !== null){
            setlppro(newValue.value)
        }else{
            setlppro('')
        }
    };

    const Height = 34;

    const customStyles = {
        control: base => ({
            ...base,
            minHeight: 'initial',
            fontFamily: 'Athiti, sans-serif'
        }),
        valueContainer: base => ({
            ...base,
            height: `${Height - 1 - 1}px`,
            padding: '0 8px',
        }),
        clearIndicator: base => ({
            ...base,
            padding: `${(Height - 20 - 1 - 1) / 2}px`,
        }),
        dropdownIndicator: base => ({
            ...base,
            padding: `${(Height - 20 - 1 - 1) / 2}px`,
        }),
        menu: base => ({
            ...base,
            fontFamily: 'Athiti, sans-serif'
        })
    };

    const submit = () => {
        if(lpnum !== '' && lppro !== ''){
            setNumEmpty(false);
            setProEmpty(false);
            console.log(lpnum,lppro);
        }else{
            if(lpnum === ''){
                setNumEmpty(true);
            }else{
                setNumEmpty(false);
            }
            if (lppro === ''){
                setProEmpty(true)
            }else{
                setProEmpty(false);
            }
        }
    }

    const loadImage = (img_path, cpk_1, cpk_2) =>{
        console.log(img_path)
        const token = getToken();
        const queryString = `https://mlffts-api.herokuapp.com/invalid/info?cpk_1=${cpk_1}&cpk_2=${cpk_2}&image_name=${img_path}`;
        if (token && queryString) {
            console.log('in load image if')
            axios.get(queryString, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                console.log(res.data)
                setImage(res.data.image);
            }
            ).catch((err) => {
                console.log(err)
                props.history.push('/login');
            });
        }

    }

    if (rows.length === 0) {

        return (
            <div className="container">
                <Spinner name="line-scale" fadeIn='quarter' className="table-loading" />
            </div>
        )
    }

    return (
        <div>
                <div className={`modal  athiti  ${isModal?'is-active':''}`}>
                    <div className="modal-background" onClick={handleToggle}></div>
                    <div className="modal-card ">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{`${rowNum}-${rowPro} `}</p>
                            <button className="delete" aria-label="close" onClick={handleToggle}></button>
                        </header>
                        <section className="modal-card-body ">
                            <div className="">

                                <div className="card-content ">
                                    <div className="columns is-vcentered is-desktop">
                                        <div className="column">
                                            <div className="container  is-flex is-horizontal-center">
                                                {image==='' ?
                                                <Spinner name="cube-grid" fadeIn='quarter' />
                                                :
                                                <figure className="image ">
                                                    <img src={image} />
                                                </figure>
                                            }
                                            </div>
                                        </div>



                                        <div className="column is-7">
                                            <div className="container">
                                                <Lang lang={props.lang} en='License Number' th="เลขทะเบียน" />: 
                                                {isNumEmpty ? <span className="error"> *required </span> : null}

                                          <div>
                                                    <AsyncSelect
                                                        className="lp-select"
                                                        cacheOptions
                                                        loadOptions={loadOptionsNum}
                                                        defaultOptions
                                                        onChange={handleLPnum}
                                                        styles={customStyles}
                                                        isClearable={true}
                                                        noOptionsMessage={()=>'หาไม่เจอจ้า'}
                                                    />
                                                </div>
                                            </div>
                                            <div className="container" style={{marginTop:'2rem'}}>

                                                <Lang lang={props.lang} en='Province' th="จังหวัด" />:
                                                {isProEmpty ? <span className="error">*required</span> : null}
                                          <div>
                                                    <AsyncSelect
                                                        cacheOptions
                                                        loadOptions={loadOptionsPro}
                                                        defaultOptions
                                                        onChange={handleLPpro}
                                                        styles={customStyles}
                                                        isClearable={true}
                                                        noOptionsMessage={()=>'หาไม่เจอจ้า'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer className="my-card-footer ">
                            <a className="card-footer-item submit-btn" onClick={submit}>Submit</a>
                            <a className="card-footer-item cancel-submit-btn" onClick={handleToggle}>Cancel</a>
                        </footer>
                    </div>
                </div>
     
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >

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
                    <PagingPanel />
                </Grid>
            </Paper>
        </div>
    );
};
