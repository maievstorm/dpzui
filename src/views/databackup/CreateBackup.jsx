import {
    TextField,
    Button,
    Box,
    Stack,
    Select,
    MenuItem
} from '@mui/material';
import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { getSubcription } from 'services/DataIngest';
import DataIngest from 'services/DataIngest';
import { addLog } from 'services/LogService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateBackup() {
    const divStyle = {
        margin: '5px'
    };
    const [configInfo, setConfigInfo] = useState({
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
        file_name: '',
        subscription_id: ''
    })
    const handleTypeInput = (evt) => {
        const value = evt.target.value;
        setConfigInfo({
            ...configInfo,
            [evt.target.name]: value
        });
    }

    const [subscription_id, setSubscription_id] = useState([]);
    useEffect(() => {
        getSubcription()
            .then(res => {
                setSubscription_id(res.data.data)

            })
            .catch(error => console.log(error))

    }, [])


    const handleCancel = () => {

    }
    const handleSubmit = () => {
        const body = {
            "conf": { configInfo },
        }
        let createTime = new Date().toLocaleString();
        let item_name = `${configInfo.host}_${configInfo.user}_${configInfo.database}_${createTime}`
        const invoicebody =
        {
            "item_name": item_name,
            "item_type": 'backup',
            "customer_invoice_data": JSON.stringify(body),
            "subscription_id": configInfo.subscription_id,
            "plan_history_id": 1,
            "invoice_period_start_date": new Date().toLocaleString() + '',
            "invoice_period_end_date": new Date().toLocaleString() + '',
            "invoice_description": item_name,
            "invoice_amount": 100,
            "invoice_created_ts": new Date().toLocaleString() + '',
            "invoice_due_ts": new Date().toLocaleString() + '',
            "invoice_paid_ts": new Date().toLocaleString() + ''
        }

        DataIngest.CreateInvoiceProcess(invoicebody)
            .then(res => {
                toast.success("Thêm tiến trình backup thành công!");

                addLog('create_flow', invoicebody)
                    .then(res => {
                        toast.success("Thêm log backup thành công!");
                        
                    })
                    .catch(err => {
                        toast.error("Thêm log backup thất bại!");
                    })
            })
            .catch(err => {
                toast.error("Thêm tiến trình backup thất bại!");
                console.log(err)
            })


    }



    console.log(configInfo)

    return (
        <Box marginLeft={10} marginRight={10} marginTop={5} >
            <h3>Khai báo thông tin</h3>
            <Stack spacing={2}>
                <TextField label="host" name='host' onChange={handleTypeInput}></TextField>
                <TextField label="port" name='port' onChange={handleTypeInput}></TextField>
                <TextField label="user" name='user' onChange={handleTypeInput}></TextField>

                <TextField label="password" name='password' type={'password'} onChange={handleTypeInput}></TextField>
                <TextField label="database" name='database' onChange={handleTypeInput}></TextField>

                <TextField label="file_name" name='file_name' onChange={handleTypeInput}></TextField>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subscription</InputLabel>

                    <Select id="subscription_id" name='subscription_id' value={configInfo.subscription_id} onChange={handleTypeInput}
                        size="small"
                        style={divStyle}
                        headername={'Subscription id'}
                    >

                        {subscription_id.map((sub) => (
                            <MenuItem
                                key={sub.subscription_id}
                                value={sub.subscription_id}
                            >
                                {sub.subscription_name}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>

            </Stack>
            <br></br>
            <br></br>
            <Box marginLeft={50}>

                <Button onClick={handleCancel}>Huỷ</Button>
                <Button onClick={handleSubmit}>Xác nhận</Button>
            </Box>
            <ToastContainer/>
        </Box>
    )

}