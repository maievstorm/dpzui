import { useState, useEffect } from 'react'
import React from "react";
import { useLocation } from "react-router"
import OfferPlanService from 'services/OfferPlanService';
import axios from 'axios';
import config from "../../config";
import { CreateInvoiceProcess } from 'services/DataIngest';
import Button from '@mui/material/Button';
import { CreateUserStorage } from 'services/StorageConf';
//import {KeycloakService} from 'services/KeycloakService';
import { addKeycloakUser } from 'services/KeycloakService';
import { changeRequestStatus } from 'services/OfferPlanService';
import UserAccount from 'services/UserAccount';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { addLog } from "services/LogService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody
} from '@mui/material';

import { createDatabase, getCsrfToken, login,login1 } from 'services/SupersetService';

export default function ReviewSubscription() {

    const location = useLocation();
    const OfferId = location?.state?.offer_id;
    const requestid = location?.state?.id;
    const account_id = location?.state?.account_id;
    const username = location?.state?.username;
    const password = location?.state?.upassword;
    const full_name = location?.state?.first_name;
    const email = location?.state?.email;
    const current_plan_id = location?.state?.current_plan_id;
    const request_type = location?.state?.request_type;
    const requeststatus = location?.state?.request_status;

    const [OfferSelected, setOfferSelected] = useState([])
    const [rows, setRows] = useState([])
    const [dataoffer, setdataoffer] = useState([])
    useEffect(() => {
        // login1()
        //     .then(res => {
        //         console.log('success:', res)
        //         // getCsrfToken(res.data.access_token)
        //         //     .then(({ config }) => {
        //         //         console.log(config.jar.toJSON());
        //         //     })
        //         //     // .then(res=>{
        //         //     //     console.log('csrf')
        //         //     //     console.log(res)
        //         //     //     console.log(res.headers)
        //         //     //     console.log(res.cookie)
        //         //     // })
        //         //     .catch(err => {

        //         //         console.log('err:', err)
        //         //     })
        //     })
        //     .catch(err => {

        //         console.log('err:', err)
        //     })
        // createDatabase()
        // .then(res=>{
        //     console.log('success:',res)
        // })
        // .catch(err=> {

        //     console.log('err:',err)
        // })

        OfferPlanService.getOffer()
            .then(res => {

                let data = (res.data.pre).filter((offer) => offer.offer_id === OfferId)[0]
                console.log(data)

                setOfferSelected((res.data.pre).filter((offer) => offer.offer_id === OfferId)[0])
                let listTable = JSON.parse(data?.description)
                setdataoffer(listTable)
                let listrow = []
                for (var key in listTable) {

                    listrow.push({
                        'key': key,
                        'value': listTable[key]
                    })
                }
                setRows(listrow)

            })
            .catch(err => console.log(err))
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#f4f5f7",
            color: "#707275",
            fontWeight: 600,
            fontSize: ".875rem",
            textAlign: "left"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 10,
        },
    }));

    // const submit = () => {

    //     let today = new Date()
    //     let data = {
    //         user_account_id: userinfo.id,
    //         'username': userinfo.username,
    //         'fullname': userinfo.last_name + ' ' + userinfo.first_name,
    //         'email': userinfo.email,
    //         'upassword': null,
    //         'offer_id': OfferSelected?.offer_id,
    //         'plan_id': OfferSelected.plan_id,
    //         'request_date': today,
    //         'request_status': 0,
    //         'request_type': 1
    //     }



    //     addLog('request_resource', data)


    // }


    const [loading, setLoading] = React.useState(true);
    const createuserandsub = () => {

        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const ingroup = [{
            "time_added": new Date().toLocaleString() + '',
            "time_removed": null,
            "group_admin": true
        }];


        let data = {
            user_account_id: account_id,
            'username': username,
            'fullname': full_name,
            'email': email,
            'upassword': null,
            'offer_id': OfferId,
            'plan_id': current_plan_id,
            'request_date': date,
            'request_status': 0,
            'request_type': 1
        }




        // const subscription = [
        //     {
        //         "trial_period_start_date": new Date().toLocaleString() + '',
        //         "trial_period_end_date": null,
        //         "subscribe_after_trial": false,
        //         "current_plan_id": current_plan_id,
        //         "offer_id": OfferId,
        //         "offer_start_date": new Date().toLocaleString() + '',
        //         "offer_end_date": new Date(year + 1, month, day).toLocaleString() + '',
        //         "date_subscribed": new Date().toLocaleString() + '',
        //         "valid_to": new Date(year + 1, month, day).toLocaleString() + '',
        //         "date_unsubscribed": null,
        //         "insert_ts": new Date().toLocaleString() + '',
        //         "requestsub_id": requestid,
        //         "subscription_name": 'Thuê bao ' + username + ' plan ' + current_plan_id + ' offer ' + OfferId + ' ' + new Date().toLocaleString() + ''


        //     }
        // ];

        const bodydwh = {
            host: username + requestid + 'dwh',
            port: '5432',
            user: username,
            password: password,
            database: username,
        }

        const bodybigdata = {
            host: '10.14.222.186:8020/warehouse/tablespace/managed/hive',
            user: username,
            password: password,
            database: username + requestid + 'bigdata',
        }

        const bodystorage = {
            bucket: username + requestid + 'storage',
            accessKey: "KMuxz0Z6tKM3r2ct",
            secretKey: "FG1CwGywpeY8eXNwPFw0eK9CMrVN99ra",
        }



        if (request_type === 1 && requeststatus === '0') {
            const bodycreate = {

                "user_group_type_id": 10,
                "customer_invoice_data": 'Thuê bao ' + username + ' plan ' + current_plan_id + ' offer ' + OfferId + 'request' + requestid,
                "insert_ts": new Date().toLocaleString() + '',
                "account_id": account_id,
                "ingroup": ingroup,
                "trial_period_start_date": new Date().toLocaleString() + '',
                "trial_period_end_date": null,
                "subscribe_after_trial": false,
                "current_plan_id": current_plan_id,
                "offer_id": OfferId,
                "offer_start_date": new Date().toLocaleString() + '',
                "offer_end_date": new Date(year + 1, month, day).toLocaleString() + '',
                "date_subscribed": new Date().toLocaleString() + '',
                "valid_to": new Date(year + 1, month, day).toLocaleString() + '',
                "date_unsubscribed": null,
                "insert_ts": new Date().toLocaleString() + '',
                "requestsub_id": requestid,
                "subscription_name": 'Thuê bao ' + username + ' plan ' + current_plan_id + ' offer ' + OfferId + 'request' + requestid + new Date().toLocaleString() + '',
                "requestsub_id": requestid

            };

            axios({
                method: 'post',
                url: config.rootapi + '/subscription/creategroupsub',
                data: bodycreate
            })
                .then(res => {
                    console.log(res.data.subscription.id)

                    const invoicebodybigdata =
                    {
                        "item_name": username + requestid + 'bigdata',
                        "item_type": 'bigdata',
                        "customer_invoice_data": JSON.stringify(bodybigdata),
                        "subscription_id": res.data.subscription.id,
                        "plan_history_id": current_plan_id,
                        "invoice_period_start_date": new Date().toLocaleString() + '',
                        "invoice_period_end_date": new Date().toLocaleString() + '',
                        "invoice_description": username + requestid + 'bigdata',
                        "invoice_amount": dataoffer['Dữ liệu lớn(GB)'],
                        "invoice_created_ts": new Date().toLocaleString() + '',
                        "invoice_due_ts": new Date().toLocaleString() + '',
                        "invoice_paid_ts": new Date().toLocaleString() + ''
                    }

                    const invoicebodystorage =
                    {
                        "item_name": username + requestid + 'storage',
                        "item_type": 'storage',
                        "customer_invoice_data": JSON.stringify(bodystorage),
                        "subscription_id": res.data.subscription.id,
                        "plan_history_id": current_plan_id,
                        "invoice_period_start_date": new Date().toLocaleString() + '',
                        "invoice_period_end_date": new Date().toLocaleString() + '',
                        "invoice_description": username + requestid + 'storage',
                        "invoice_amount": dataoffer['Lưu trữ đám mây(GB)'],
                        "invoice_created_ts": new Date().toLocaleString() + '',
                        "invoice_due_ts": new Date().toLocaleString() + '',
                        "invoice_paid_ts": new Date().toLocaleString() + ''
                    }

                    const invoicebodydwh =
                    {
                        "item_name": username + requestid + 'dwh',
                        "item_type": 'dwh',
                        "customer_invoice_data": JSON.stringify(bodydwh),
                        "subscription_id": res.data.subscription.id,
                        "plan_history_id": current_plan_id,
                        "invoice_period_start_date": new Date().toLocaleString() + '',
                        "invoice_period_end_date": new Date().toLocaleString() + '',
                        "invoice_description": username + requestid + 'dwh',
                        "invoice_amount": dataoffer['Kho dữ liệu(GB)'],
                        "invoice_created_ts": new Date().toLocaleString() + '',
                        "invoice_due_ts": new Date().toLocaleString() + '',
                        "invoice_paid_ts": new Date().toLocaleString() + ''
                    }
                    CreateInvoiceProcess(invoicebodybigdata);
                    CreateInvoiceProcess(invoicebodystorage);
                    CreateInvoiceProcess(invoicebodydwh);
                    CreateUserStorage(invoicebodystorage?.item_name)
                        .then(() => {
                            console.log('Create successfully:', invoicebodystorage?.item_name);
                            let status = 1;
                            changeRequestStatus(requestid, status);
                        })
                        .catch(err => console.log(err))
                    toast.success('Tạo tài nguyên thành công');
                    setTimeout(() => {
                        setLoading(false)
                    }, 5000);

                })
                .catch(err => {
                    toast.success('Có lỗi xảy ra trong quá trình xử lý');
                    console.log(err)

                })


        }
        else {


            addKeycloakUser(username, full_name, email, password)
                .then(() => {
                    console.log('Add user done!')
                    let status = 1
                    changeRequestStatus(requestid, status)
                        .then(() => {
                            console.log('Update user status done!')
                            UserAccount.addUser(full_name, full_name, username, password, email)
                            window.location.reload()
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))




        }

        addLog('request_resource', data);


    }
    return (
        <>
            <Box >
                <Card sx={{
                    minWidth: 275,
                    borderRadius: "0.75rem",
                    p: 3
                }}>
                    <CardContent>
                        <Box>
                            <Box >
                                <Typography variant="h6">
                                    {OfferSelected?.offer_name}
                                </Typography>
                                <Typography component="div">
                                    <span style={{
                                        color: "#707275",
                                        fontWeight: 500,
                                        marginTop: "0.5rem",
                                        fontSize: "0.75rem",
                                        paddingRight: "10px"
                                    }}>
                                        Trạng thái:
                                    </span>
                                    <span>
                                        <Button
                                            variant="contained"
                                            elevation={0}
                                            sx={{
                                                bgcolor: "#fdf5b2",
                                                color: "#c27702",
                                                lineHeight: "1.25rem",
                                                fontSize: "0.75rem",
                                                textTransform: "none",
                                                boxShadow: "0",
                                                borderRadius: "9999px",
                                                display: "inline-flex",
                                                boxSizing: "border-box",
                                                px: "0.5rem",
                                                py: "0px"
                                            }}>
                                            {requeststatus}
                                        </Button>
                                    </span>
                                </Typography>
                            </Box>
                            <Box sx={{ float: "right" }}>
                                <Typography >DpZ</Typography>
                                <Typography >

                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Paper sx={{ textAlign: "left" }} elevation={0}>
                                        <Typography >Ngày đăng ký</Typography>
                                        <Typography >
                                            {new Date().toLocaleString()}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs>
                                    <Paper sx={{ textAlign: "center" }} elevation={0}>
                                        <Typography>Mã đăng ký</Typography>
                                        <Typography >#{requestid}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs>
                                    <Paper sx={{ textAlign: "right", marginBottom: "20px" }} elevation={0}>

                                        <Typography >Người đăng ký</Typography>
                                        <Typography>
                                            {username}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <TableContainer component={Paper} elevation={0} sx={{ borderColor: "#d5d6d7" }} variant="outlined">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow style={{ textTransform: "uppercase" }}>
                                            <StyledTableCell>stt.</StyledTableCell>
                                            <StyledTableCell align="right">Tên dịch vụ</StyledTableCell>
                                            <StyledTableCell align="right">Số lượng</StyledTableCell>
                                            {/* <StyledTableCell align="right">Đơn giá</StyledTableCell>
                                            <StyledTableCell align="right">Giá</StyledTableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Typography >
                                                        {index}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    <Typography >
                                                        {row.key}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">{row.value}</TableCell>

                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell align="right" colSpan={5}>
                                                <Typography >Tổng cộng: {OfferSelected?.current_price} Tr.VND/Tháng
                                                </Typography>

                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>


                        <Box >
                            <br></br>
                            <Button name={OfferSelected?.OfferId}
                                variant="outlined"
                                color="primary"
                                onClick={() => createuserandsub()}>Phê duyệt</Button>


                        </Box>

                    </CardContent>
                </Card>

                <ToastContainer></ToastContainer>

            </Box>

        </>
    )

}
