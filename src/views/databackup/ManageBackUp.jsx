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
import { GetProcess } from 'services/DataIngest';


export default function ManageBackUp() {
    
    const [rows, setData] = useState([]);
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
            label: 'Tên tiến trình',
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
            console.log(res)
            setData(res.data.data.map(item=>{
                let invoice_created_ts = new Date(Date.parse(item.invoice_created_ts)).toLocaleString();
                let invoice_due_ts = new Date(Date.parse(item.invoice_due_ts)).toLocaleString();
                
                return {
                    'id_invoice':item.id_invoice,
                    'item_name':item.item_name,
                    'invoice_created_ts':invoice_created_ts,
                    'invoice_due_ts':invoice_due_ts,
                    'customer_invoice_data':item.customer_invoice_data
                }
            }));
        }).catch(err => { console.log(err) })
    }, []);




    
    const onStartJobClickHandler = (selected) => {
        console.log(selected);
        const apidagurl = config.airflowapi + '/dags/' + selected + '/dagRuns'

        const body = {
            "conf": {},
        }
        axios({
            method: 'post',
            url: apidagurl,

            auth: {
                username: 'hung',
                password: '123456a@'
            },
            data: body
        });
        navigate('loginformation',{state:{id:selected}})

    }

    const onEdittJobClickHandler = (type,selected) => {
        navigate(type,{state:{id:selected}})

    }

    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {},
        customToolbarSelect: selectedRows => (
            <>
                <Tooltip title="Kích hoạt tiến trình">
                    <IconButton
                        onClick={() => {

                            onStartJobClickHandler(rows[selectedRows.data[0].dataIndex]['item_name']);

                        }}

                    >
                        <PlayCircleOutlineIcon />
                    </IconButton>

                </Tooltip>
                <Tooltip title="Xem log">
                    <IconButton
                        onClick={() => {

                            onEdittJobClickHandler('loginformation',rows[selectedRows.data[0].dataIndex]['item_name']);

                        }}

                    >
                        <RateReviewIcon />
                    </IconButton>

                </Tooltip>
                <Tooltip title="Hiệu chỉnh tiến trình">
                    <IconButton
                        onClick={() => {

                            onEdittJobClickHandler('editflowjob',rows[selectedRows.data[0].dataIndex]['item_name']);

                        }}

                    >
                        <ModeEditIcon />
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

    return (
        <div>
            <Button onClick={onClickHandler} > {<AddIcon />} Tạo sao lưu</Button>
          
            <MUIDataTable isLoading={isLoading}
                title={"Danh sách tiến trình"}
                data={rows}
                columns={columns}
                options={options}
            />

        </div>

    )

}



