import { useState, useEffect } from 'react'
import React from "react";
import { useLocation, useNavigate } from "react-router"
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import config from "../../config";
import { Tooltip, IconButton } from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { CreateInvoiceProcess } from 'services/DataIngest';

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { CreateUserStorage } from 'services/StorageConf';
import { DpzStorageConf } from 'services/StorageConf';
//import KeycloakService from 'services/KeycloakService';
import {addKeycloakUser} from 'services/KeycloakService';
import { changeRequestStatus } from 'services/OfferPlanService';
import UserAccount from 'services/UserAccount';
import RateReviewIcon from '@mui/icons-material/RateReview';


export default function ManageSubscription() {
    const [rows, setData] = useState([]);
    const columns = [
        {
            name: "id",
            options: {
                filter: true
            },
            label: 'ID'
        },
        {
            name: "user_account_id",
            options: {
                filter: true
            },
            label: 'ID Tài khoản',
        },
        {
            name: "user_name",
            options: {
                filter: false
            },
            label: 'Tài khoản'
        }
        ,
        {
            name: "fullname",
            options: {
                filter: false
            },
            label: 'Họ và tên'
        }
        ,
        {
            name: "email",
            options: {
                filter: false
            },
            label: 'Email'
        },
        {
            name: "upassword",
            options: {
                filter: false
            },
            label: 'Mật khẩu'
        },
        {
            name: "offer_id",
            options: {
                filter: false
            },
            label: 'ID Offer'
        },
        {
            name: "plan_id",
            options: {
                filter: false
            },
            label: 'ID Plan'
        },
        {
            name: "request_date",
            options: {
                filter: false
            },
            label: 'Ngày yêu cầu'
        },
        {
            name: "request_type",
            options: {
                filter: false
            },
            label: 'Loại yêu cầu'
        }
        ,
        {
            name: "request_status",
            options: {
                filter: false
            },
            label: 'Trạng thái'
        }

    ];
    const getsubapi = config.rootapi + '/requestsub';

    useEffect(() => {
        axios({ method: 'get', url: getsubapi }
        ).then(res => {
            setData(res.data.data.map(item => {
                let request_date = new Date(Date.parse(item.request_date)).toLocaleString()
                return {
                    'id': item.id,
                    'user_account_id': item.user_account_id,
                    'user_name': item.user_name,
                    'fullname': item.fullname,
                    'email': item.email,
                    'upassword': item.upassword,
                    'offer_id': item.offer_id,
                    'plan_id': item.plan_id,
                    'request_date': request_date,
                    'request_status': item.request_status,
                    'request_type': item.request_type,
                }

            }));
            // setData(res.data.data);
        }).catch(err => { console.log(err) })
    }, []);


    // {
    //     "user_group_type_id": 10,
    //     "customer_invoice_data": "",
    //     "insert_ts": today,
    //     *"first_name": "sdaghs",
    //     *"last_name": "dshgfad",
    //     *"user_name": "dsafdas",
    //     *"password": "1",
    //     *"email": "dsadhgfhsad@fpt.com.vn",
    //     "confirmation_code": "9",
    //     "confirmation_time": "2022-03-02",
    //     "insert_ts": today,
    //     "ingroup": [
    //         {
    //             "time_added":today,
    //             "time_removed":null,
    //             "group_admin": true
    //         }
    //     ],
    //     "subscription": [
    //         {
    //             "trial_period_start_date": today,
    //             "trial_period_end_date": null,
    //             "subscribe_after_trial": false,
    //             *"current_plan_id": 83,
    //            * "offer_id": 92,
    //             "offer_start_date": today,
    //             "offer_end_date": null,
    //             "date_subscribed": today,
    //             "valid_to": null,
    //             "date_unsubscribed": null,
    //             "insert_ts": today,
    //             "requestsub_id":null
    //         }
    //     ]
    // }




    const [loading, setLoading] = React.useState(true);

    const createuserandsub = (id, account_id, first_name, last_name, user_name, email, password, current_plan_id, offer_id, requestsub_id, request_type) => {

        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const ingroup = [{
            "time_added": new Date().toLocaleString() + '',
            "time_removed": null,
            "group_admin": true
        }];

        const subscription = [
            {
                "trial_period_start_date": new Date().toLocaleString() + '',
                "trial_period_end_date": null,
                "subscribe_after_trial": false,
                "current_plan_id": current_plan_id,
                "offer_id": offer_id,
                "offer_start_date": new Date().toLocaleString() + '',
                "offer_end_date": new Date(year + 1, month, day).toLocaleString() + '',
                "date_subscribed": new Date().toLocaleString() + '',
                "valid_to": new Date(year + 1, month, day).toLocaleString() + '',
                "date_unsubscribed": null,
                "insert_ts": new Date().toLocaleString() + '',
                "requestsub_id": requestsub_id,
                "subscription_name": 'Thuê bao ' + user_name + ' plan ' + current_plan_id + ' offer ' + offer_id + ' ' + new Date().toLocaleString() + ''


            }
        ];

        const bodydwh = {
            host: 'postgresql-ha-pgpool',
            port: '5432',
            user: 'postgres',
            password: 'HztIWjzS57',
            database: 'postgres',
        }

        const bodybigdata = {
            host: '10.14.222.186:8020/warehouse/tablespace/managed/hive',
            user: user_name,
            password: password,
            database: 'cdp_cn.db',
        }

        const bodystorage = {
            bucket: 'trinhhkbucket',
            accessKey: "85dtbrEshxH9d6Jf",
            secretKey: "LC7ziR8BnstCgiL2te1bykAp5HwV4MOO",
        }



        if (request_type == 1) {
            const bodycreate = {

                "user_group_type_id": 10,
                "customer_invoice_data": user_name + ' With offer ' + offer_id,
                "insert_ts": new Date().toLocaleString() + '',
                "account_id": account_id,
                "ingroup": ingroup,
                "trial_period_start_date": new Date().toLocaleString() + '',
                "trial_period_end_date": null,
                "subscribe_after_trial": false,
                "current_plan_id": current_plan_id,
                "offer_id": offer_id,
                "offer_start_date": new Date().toLocaleString() + '',
                "offer_end_date": new Date(year + 1, month, day).toLocaleString() + '',
                "date_subscribed": new Date().toLocaleString() + '',
                "valid_to": new Date(year + 1, month, day).toLocaleString() + '',
                "date_unsubscribed": null,
                "insert_ts": new Date().toLocaleString() + '',
                "requestsub_id": requestsub_id,
                "subscription_name": 'Thuê bao ' + user_name + ' plan ' + current_plan_id + ' offer ' + offer_id + ' ' + new Date().toLocaleString() + '',
                "requestsub_id": requestsub_id

            };
            console.log(JSON.stringify(bodycreate));
            axios({
                method: 'post',
                url: config.rootapi + '/subscription/creategroupsub',
                data: bodycreate
            })
                .then(res => {
                    console.log(res.data.subscription.id)

                    const invoicebodybigdata =
                    {
                        "item_name": user_name + 'bigdata' + res.data.subscription.id,
                        "item_type": 'bigdata',
                        "customer_invoice_data": JSON.stringify(bodybigdata),
                        "subscription_id": res.data.subscription.id,
                        "plan_history_id": current_plan_id,
                        "invoice_period_start_date": new Date().toLocaleString() + '',
                        "invoice_period_end_date": new Date().toLocaleString() + '',
                        "invoice_description": user_name + 'bigdata' + res.data.subscription.id,
                        "invoice_amount": 100,
                        "invoice_created_ts": new Date().toLocaleString() + '',
                        "invoice_due_ts": new Date().toLocaleString() + '',
                        "invoice_paid_ts": new Date().toLocaleString() + ''
                    }

                    const invoicebodystorage =
                    {
                        "item_name": user_name + 'storage' + res.data.subscription.id,
                        "item_type": 'storage',
                        "customer_invoice_data": JSON.stringify(bodystorage),
                        "subscription_id": res.data.subscription.id,
                        "plan_history_id": current_plan_id,
                        "invoice_period_start_date": new Date().toLocaleString() + '',
                        "invoice_period_end_date": new Date().toLocaleString() + '',
                        "invoice_description": user_name + 'storage' + res.data.subscription.id,
                        "invoice_amount": 100,
                        "invoice_created_ts": new Date().toLocaleString() + '',
                        "invoice_due_ts": new Date().toLocaleString() + '',
                        "invoice_paid_ts": new Date().toLocaleString() + ''
                    }

                    const invoicebodydwh =
                    {
                        "item_name": user_name + 'dwh' + res.data.subscription.id,
                        "item_type": 'dwh',
                        "customer_invoice_data": JSON.stringify(bodydwh),
                        "subscription_id": res.data.subscription.id,
                        "plan_history_id": current_plan_id,
                        "invoice_period_start_date": new Date().toLocaleString() + '',
                        "invoice_period_end_date": new Date().toLocaleString() + '',
                        "invoice_description": user_name + 'dwh' + res.data.subscription.id,
                        "invoice_amount": 100,
                        "invoice_created_ts": new Date().toLocaleString() + '',
                        "invoice_due_ts": new Date().toLocaleString() + '',
                        "invoice_paid_ts": new Date().toLocaleString() + ''
                    }
                    CreateInvoiceProcess(invoicebodybigdata);
                    CreateInvoiceProcess(invoicebodystorage);
                    CreateInvoiceProcess(invoicebodydwh);
                    CreateUserStorage(invoicebodystorage?.item_name)
                        .then(() => {
                            console.log('Create successfully:', invoicebodystorage?.item_name)
                        })
                        .catch(err => console.log(err))

                    setTimeout(() => {
                        setLoading(false)
                    }, 5000);

                })
                .catch(err => {
                    console.log(err)

                })


        }
        else {
           

            addKeycloakUser(user_name, first_name, last_name, email, password)
                .then(() => {
                    console.log('Add user done!')
                    let status = 1
                    changeRequestStatus(id, status)
                        .then(() => {
                            console.log('Update user status done!')
                            UserAccount.addUser(first_name, last_name, user_name, password, email)
                            window.location.reload()
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
            console.log('a');



        }




    }
    const navigate = useNavigate()
    const onEdittJobClickHandler = (type, id, account_id, offer_id, username, upassword, first_name, email, current_plan_id, request_type,request_status) => {
        navigate(type, {
            state: {
                id: id,
                account_id: account_id,
                offer_id: offer_id,
                username: username,
                upassword: upassword,
                first_name: first_name,
                email: email,
                current_plan_id: current_plan_id,
                request_type: request_type,
                request_status:request_status

            }
        })

    }
    const location = useLocation()

    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {},
        customToolbarSelect: selectedRows => (
            <>
                {/* <Tooltip title="Phê duyệt">
                    <IconButton
                        onClick={() => {
                            createuserandsub(
                                rows[selectedRows.data[0].dataIndex]['id'],

                                rows[selectedRows.data[0].dataIndex]['user_account_id'],
                                rows[selectedRows.data[0].dataIndex]['fullname'],
                                rows[selectedRows.data[0].dataIndex]['fullname'],
                                rows[selectedRows.data[0].dataIndex]['user_name'],
                                rows[selectedRows.data[0].dataIndex]['email'],
                                rows[selectedRows.data[0].dataIndex]['upassword'],
                                rows[selectedRows.data[0].dataIndex]['plan_id'],
                                rows[selectedRows.data[0].dataIndex]['offer_id'],
                                rows[selectedRows.data[0].dataIndex]['id'],
                                rows[selectedRows.data[0].dataIndex]['request_type']
                            );


                        }}

                    >
                        <PersonAddAltOutlinedIcon />
                    </IconButton>

                </Tooltip> */}
                <Tooltip title="Xem xét phê duyệt">
                    <IconButton
                        onClick={() => {
                            onEdittJobClickHandler('reviewsubcription', rows[selectedRows.data[0].dataIndex]['id'], rows[selectedRows.data[0].dataIndex]['user_account_id'], rows[selectedRows.data[0].dataIndex]['offer_id'], rows[selectedRows.data[0].dataIndex]['user_name'], rows[selectedRows.data[0].dataIndex]['upassword'], rows[selectedRows.data[0].dataIndex]['fullname'], rows[selectedRows.data[0].dataIndex]['email'], rows[selectedRows.data[0].dataIndex]['plan_id'], rows[selectedRows.data[0].dataIndex]['request_type'],rows[selectedRows.data[0].dataIndex]['request_status']);

                        }}

                    >
                        <RateReviewIcon />
                    </IconButton>
                </Tooltip>
            </>

        )

    };

    const [bucket, setBucket] = useState('')


    const submit = () => {
        let akey = 'naQrl3yAjoue8o22'
        let skey = 'A0d6ZmTAbcVrhgTorNzCFBddtAWUjruP'
        DpzStorageConf(akey, skey)
            .then(minio => {
                console.log(minio)

            })
            .catch(err => console.log(err))

    }




    return (
        <div>

            <MUIDataTable
                title={"Danh sách subscription"}
                data={rows}
                columns={columns}
                options={options}
            />

            <Input onChange={e => setBucket(e.target.value)} value={bucket} />
            <Button onClick={() => CreateUserStorage(bucket)}>Create</Button>
            <Button onClick={submit}>Create</Button>


        </div>

    )

}



