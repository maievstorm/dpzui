import {
    TextField,
    Button,
    Box,
    Stack,
    Select,
    MenuItem,
    InputLabel

} from '@mui/material';
import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import { getSubcription } from 'services/DataIngest';
import DataIngest from 'services/DataIngest';

import { addLog } from 'services/LogService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetProcess } from 'services/DataIngest';
import { PostgresBackupRestore } from 'services/BackupService';

export default function CreateBackup() {
    const divStyle = {
        margin: '5px'
    };

    const [configData, setConfigData] = useState([])
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
        GetProcess('dwh')
            .then(res => {
                setConfigData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])



    const handleCancel = () => {

    }
    const handleSubmit = () => {
        const body = {
            "conf": { configInfo },
        }
        // let createTime = new Date().toLocaleString();
        // let item_name = `${configInfo?.host}_${configInfo?.user}_${configInfo?.database}_${createTime}`
        const invoicebody =
        {
            "item_name": configInfo?.file_name,
            "item_type": 'backup',
            "customer_invoice_data": JSON.stringify(body),
            "subscription_id": configInfo?.subscription_id,
            "plan_history_id": 1,
            "invoice_period_start_date": new Date().toLocaleString() + '',
            "invoice_period_end_date": new Date().toLocaleString() + '',
            "invoice_description": configInfo?.file_name,
            "invoice_amount": 100,
            "invoice_created_ts": new Date().toLocaleString() + '',
            "invoice_due_ts": new Date().toLocaleString() + '',
            "invoice_paid_ts": new Date().toLocaleString() + ''
        }

        DataIngest.CreateInvoiceProcess(invoicebody)
            .then(res => {
                toast.success("Thêm invoice backup thành công!");

                addLog('create_flow', invoicebody)
                    .then(res => {
                        toast.success("Thêm log backup thành công!");

                    })
                    .catch(err => {
                        toast.error("Thêm log backup thất bại!");
                    })
            })
            .catch(err => {
                toast.error("Thêm invoice backup thất bại!");
                console.log(err)
            })
            let type = 'backup'
        
            PostgresBackupRestore(configInfo.host,configInfo.port,configInfo.user,configInfo.password,configInfo.database,configInfo.file_name,type)
            .then(res => {
                toast.success("Thêm tiến trình backup thành công!");
            })
            .catch(err => {
                toast.error("Thêm tiến trình backup thất bại!");
                console.log(err)
            })


    }

    const handleSelect = (evt) => {
        const value = evt.target.value;


        let data = configData.filter(item => item.subscription_id === value)
        let customer_invoice_data = data[0]?.customer_invoice_data
        customer_invoice_data = JSON.parse(customer_invoice_data)
        let createTime = new Date().toISOString();

        let file_name = `${customer_invoice_data.host}_${customer_invoice_data.user}_${customer_invoice_data.database}_${createTime}`

        setConfigInfo({
            'subscription_id': value,
            'file_name': file_name,
            ...customer_invoice_data
        });

    }




    return (
        <Box marginLeft={10} marginRight={10} marginTop={5} >
            <h3>Khai báo thông tin</h3>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subscription</InputLabel>

                    <Select id="subscription_id" name='subscription_id' value={configInfo?.subscription_id} onChange={handleSelect}
                        size="small"
                        style={divStyle}
                        headername={'Subscription id'}
                    >

                        {configData.map((sub) => (
                            <MenuItem
                                key={sub.subscription_id}
                                value={sub.subscription_id}
                            >
                                {sub.invoice_description}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                
                <TextField label="host" name='host' onChange={handleTypeInput} value={configInfo?.host} InputProps={{ readOnly: true, }}></TextField>
                <TextField label="port" name='port' onChange={handleTypeInput} value={configInfo?.port} InputProps={{ readOnly: true, }}></TextField>
                <TextField label="user" name='user' onChange={handleTypeInput} value={configInfo?.user} InputProps={{ readOnly: true, }}></TextField>

                <TextField label="password" name='password' type={'password'} onChange={handleTypeInput} value={configInfo?.password} InputProps={{ readOnly: true, }}></TextField>
                <TextField label="database" name='database' onChange={handleTypeInput} value={configInfo?.database} InputProps={{ readOnly: true, }}></TextField>

                <TextField label="file_name" name='file_name' onChange={handleTypeInput} value={configInfo?.file_name} InputProps={{ readOnly: true, }}></TextField>



            </Stack>
            <br></br>
            <br></br>
            <Box marginLeft={50}>

                <Button onClick={handleCancel}>Huỷ</Button>
                <Button onClick={handleSubmit}>Xác nhận</Button>
            </Box>
            <ToastContainer />
        </Box>
    )

}