import { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import config from "../../config";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Tooltip, IconButton } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import RestoreIcon from '@mui/icons-material/Restore';


import { GetProcess } from 'services/DataIngest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    Box,
    Stack


} from '@mui/material';
import { PostgresBackupRestore } from 'services/BackupService';


export default function ManageBackUp() {

    const [rows, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const [selectedData, setSelectedData] = useState([]);

    const columns = [
        {
            name: "id_invoice",
            options: {
                filter: true
            },
            label: 'ID'
        },
        {
            name: "item_name",
            options: {
                filter: true
            },
            label: 'Tên backup',
        }
        ,

        {
            name: "invoice_created_ts",
            options: {
                filter: false
            },
            label: 'Ngày tạo'
        },
        {
            name: "invoice_due_ts",
            options: {
                filter: false
            },
            label: 'Ngày hiệu chỉnh'
        }

    ];

    useEffect(() => {
        GetProcess('backup')
            .then(res => {
                setData(res.data.data.map(item => {
                    let invoice_created_ts = new Date(Date.parse(item.invoice_created_ts)).toLocaleString();
                    let invoice_due_ts = new Date(Date.parse(item.invoice_due_ts)).toLocaleString();

                    return {
                        'id_invoice': item.id_invoice,
                        'item_name': item.item_name,
                        'invoice_created_ts': invoice_created_ts,
                        'invoice_due_ts': invoice_due_ts,
                        'customer_invoice_data': item.customer_invoice_data
                    }
                }));
            }).catch(err => { console.log(err) })
    }, []);





    const handleSelected = (selected) => {
        let data = JSON.parse(selected?.customer_invoice_data)
        data = data?.conf?.configInfo;
        setSelectedData(data)
        setOpen(true)
    }

    const handleRestore = () => {
        let type = 'restore'

        PostgresBackupRestore(selectedData.host, selectedData.port, selectedData.user, selectedData.password, selectedData.database, selectedData.file_name, type)
            .then(res => {
                toast.success("Restore backup thành công!");
            })
            .catch(err => {
                toast.error("Restore backup thất bại!");
                console.log(err)
            })
    }


    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {},
        customToolbarSelect: selectedRows => (
            <>
                <Tooltip title="Restore">
                    <IconButton
                        onClick={() => {

                            handleSelected(rows[selectedRows.data[0].dataIndex]);

                        }}

                    >
                        <RestoreIcon />
                    </IconButton>

                </Tooltip>
            </>

        )
    };



    const navigate = useNavigate()

    const onClickHandler = () => navigate('/databackup/createbackup')

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={onClickHandler} > {<AddIcon />} Tạo sao lưu</Button>

            <MUIDataTable isLoading={isLoading}
                title={"Danh sách tiến trình"}
                data={rows}
                columns={columns}
                options={options}
            />

            <Dialog open={open}
                onClose={handleClose} fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle>Restore database</DialogTitle>
                <Box marginLeft={10} marginRight={10} marginTop={5} >
                    <Stack spacing={2}>
                        <TextField label="host" name='host' value={selectedData?.host} InputProps={{ readOnly: true, }}></TextField>
                        <TextField label="port" name='port' value={selectedData?.port} InputProps={{ readOnly: true, }}></TextField>
                        <TextField label="user" name='user' value={selectedData?.user} InputProps={{ readOnly: true, }}></TextField>

                        <TextField label="password" name='password' type={'password'} value={selectedData?.password} InputProps={{ readOnly: true, }}></TextField>
                        <TextField label="database" name='database' value={selectedData?.database} InputProps={{ readOnly: true, }}></TextField>

                        <TextField label="file_name" name='file_name' value={selectedData?.file_name} InputProps={{ readOnly: true, }}></TextField>

                    </Stack>
                    <br></br>
                    <br></br>

                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleRestore} >Xác nhận</Button>

                    </DialogActions>
                </Box>
            </Dialog>

            <ToastContainer />

        </div>

    )

}



