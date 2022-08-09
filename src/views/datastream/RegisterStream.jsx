import * as React from 'react';
import { useState, useEffect } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Select, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import UserService from 'services/UserService';
import { getSubcription, CreateInvoiceProcess } from 'services/DataIngest';
import MainCard from 'ui-component/cards/MainCard';
//import { getSubcription,createKafkaConnector, CreateInvoiceProcess, GetKafkaConnectors } from 'services/DataIngest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createKafkaConnector, GetKafkaConnectors } from 'services/KafkaConnect';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const RegisterStreaming = () => {


    const [subscription_id, setSubscription_id] = useState([]);
    useEffect(() => {
        getSubcription()
            .then(res => {
                setSubscription_id(res.data.data)
            })
            .catch(error => console.log(error))
    }, []);

    const divStyle = {
        marginTop: '10px',

    };
    const datatypes = [
        {
            key: 'storage',
            name: 'Lưu trữ đám mây'
        },
        {
            key: 'dwh',
            name: 'Kho dữ liệu'
        },
        {
            key: 'bigdata',
            name: 'Dữ liệu lớn'
        }
        ,
        {
            key: 'sqlserver',
            name: 'Microsof Sql'
        },
        {
            key: 'azuresql',
            name: 'Azure SQL'
        },
        {
            key: 'oracle',
            name: 'Oracle'
        }
        ,
        {
            key: 'mysql',
            name: 'MySQL'
        }
        ,
        {
            key: 'postgres',
            name: 'PostgresSQL'
        }


    ]



    // const [Streamtarget, setStreamtarget] = useState([
    //     {
    //         tdbtype: '',
    //         tdatabaseservername: '',
    //         tdatabasehostname: '',
    //         tdatabaseport: '',
    //         tdatabasedbname: '',
    //         tdatabaseuser: '',
    //         tdatabasepassword: '',
    //         ttableincludelist: ''

    //     },
    // ])

    const [Streamsource, setStreamsource] = useState({})
    const [Streamtarget, setStreamtarget] = useState({})

    const sonInputChanged = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setStreamsource((Streamsource) => ({
            ...Streamsource,
            [targetName]: targetValue
        }));
    };

    const tonInputChanged = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setStreamtarget((Streamtarget) => ({
            ...Streamtarget,
            [targetName]: targetValue
        }));
    };



    // const submit = (e) => {
    //     e.preventDefault();
    //     let stream = {
    //         'data': [
    //             {
    //                 'source': Streamsource,
    //                 'target': Streamtarget
    //             }

    //         ]
    //     }



    //     const body = {
    //         "conf": { stream },
    //     }


    //     console.log(JSON.stringify(body));
    //     const invoicebody =
    //     {
    //         "item_name": Streamsource.tentientrinh,
    //         "item_type": 'stream',
    //         "customer_invoice_data": JSON.stringify(body),
    //         "subscription_id": Streamsource.subscription_id,
    //         "plan_history_id": 1,
    //         "invoice_period_start_date": new Date().toLocaleString() + '',
    //         "invoice_period_end_date": new Date().toLocaleString() + '',
    //         "invoice_description": Streamsource.tentientrinh,
    //         "invoice_amount": 100,
    //         "invoice_created_ts": new Date().toLocaleString() + '',
    //         "invoice_due_ts": new Date().toLocaleString() + '',
    //         "invoice_paid_ts": new Date().toLocaleString() + ''
    //     }

    //     console.log(JSON.stringify(invoicebody));


    // }

    function getConnectorClass(dbType) {
        var ret;

        if (dbType === 'mysql') {
            ret = 'io.debezium.connector.mysql.MySqlConnector'
        }

        else if (dbType === 'sqlserver') {
            ret = 'io.debezium.connector.sqlserver.SqlServerConnector'
        }

        else if (dbType === 'oracle') {
            ret = 'io.debezium.connector.oracle.OracleConnector'
        }

        else if (dbType === 'postgres') {
            ret = 'io.debezium.connector.postgresql.PostgresConnector'
        }


        return ret
    }


    function toSourcePayload(Streamsource, nameProgress) {
        var sourcePayload = {};
        var configPayload = {};

        let connectorClass = getConnectorClass(Streamsource.sdbtype);
        configPayload['connector.class'] = connectorClass
        configPayload['database.server.name'] = Streamsource.sdatabaseservername
        configPayload['database.hostname'] = Streamsource.sdatabasehostname
        configPayload['database.port'] = Streamsource.sdatabaseport
        configPayload['database.user'] = Streamsource.sdatabaseuser
        configPayload['database.password'] = Streamsource.sdatabasepassword
        configPayload['database.dbname'] = Streamsource.sdatabasedbname
        configPayload['table.include.list'] = Streamsource.stableincludelist
        configPayload['database.history.kafka.bootstrap.servers'] = 'kafkadpa-headless:9092'
        configPayload['database.history.kafka.topic'] = `${nameProgress}_dbhistory`
        configPayload['database.serverTimezone'] = 'Asia/Ho_Chi_Minh'
        configPayload['decimal.handling.mode'] = 'double'
        configPayload['time.precision.mode'] = 'connect'
        configPayload['transforms'] = 'route,unwrap'
        configPayload['transforms.route.type'] = 'org.apache.kafka.connect.transforms.RegexRouter'
        configPayload['transforms.route.regex'] = '([^.]+)\\.([^.]+)\\.([^.]+)'
        configPayload['transforms.route.replacement'] = '$3'
        configPayload['transforms.unwrap.type'] = 'io.debezium.transforms.ExtractNewRecordState'
        configPayload['transforms.unwrap.drop.tombstones'] = 'false'

        sourcePayload["name"] = `${nameProgress}_source`;
        sourcePayload["config"] = configPayload;

        return JSON.stringify(sourcePayload);
    }

    function getUrlSinkDatabase(dbType, host, port, databaseName) {
        var ret;

        if (dbType === 'mysql') {
            ret = `jdbc:mysql://${host}/${databaseName}`
        }

        else if (dbType === 'sqlserver') {
            ret = `jdbc:sqlserver://${host};instance=SQLEXPRESS;databaseName=${databaseName}`
        }

        else if (dbType === 'oracle') {
            ret = `jdbc:oracle:thin:@${host}:${port}:${databaseName}`
        }

        else if (dbType === 'postgres') {
            ret = `jdbc:postgresql://${host}:${port}/${databaseName}`
        }


        return ret
    }

    function toSinkPayload(Streamsource, Streamtarget) {
        var sinkPayload = {};
        var configPayload = {};

        configPayload['connector.class'] = 'io.confluent.connect.jdbc.JdbcSinkConnector'
        configPayload['topics'] = Streamsource.stableincludelist
        var url = getUrlSinkDatabase(Streamtarget.tdbtype, Streamtarget.tdatabasehostname, Streamtarget.tdatabaseport, Streamtarget.tdatabasedbname)
        configPayload['connection.url'] = url
        configPayload['connection.user'] = Streamtarget.tdatabaseuser
        configPayload['connection.password'] = Streamtarget.tdatabasepassword
        configPayload['transforms'] = 'unwrap'
        configPayload['transforms.unwrap.type'] = 'io.debezium.transforms.ExtractNewRecordState'
        configPayload['auto.create'] = 'false'
        configPayload['insert.mode'] = 'upsert'
        //configPayload['delete.enabled'] = 'true'
        configPayload['pk.fields'] = Streamtarget.ttableprimarykey
        configPayload['pk.mode'] = 'record_value'
        configPayload['transforms.unwrap.drop.tombstones'] = 'true'
        configPayload['time.precision.mode'] = 'connect'
        configPayload['table.name.format'] = Streamtarget.ttableincludelist

        sinkPayload['name'] = `${Streamsource.tentientrinh}_sink`;
        sinkPayload['config'] = configPayload;

        return JSON.stringify(sinkPayload);
    }


    const submit = (e) => {
        e.preventDefault();
        let stream = {
            'data': [
                {
                    'source': Streamsource,
                    'target': Streamtarget
                }

            ]
        }

        var nameProgress = Streamsource.tentientrinh;
        const inputString = JSON.stringify(stream);
        var jsonInput = JSON.parse(inputString);


        var sourcePayLoadData = toSourcePayload(Streamsource, nameProgress);
        var sinkPayLoadData = toSinkPayload(Streamsource, Streamtarget);
        //console.log(sourcePayLoadData);
        //console.log(sinkPayLoadData);

        const body = {
            "conf": { stream },
        }


        const invoicebody =
        {
            "item_name": nameProgress,
            "item_type": 'stream',
            "customer_invoice_data": JSON.stringify(body),
            "subscription_id": Streamsource.subscription_id,
            "plan_history_id": 1,
            "invoice_period_start_date": new Date().toLocaleString() + '',
            "invoice_period_end_date": new Date().toLocaleString() + '',
            "invoice_description": nameProgress,
            "invoice_amount": 1,
            "invoice_created_ts": new Date().toLocaleString() + '',
            "invoice_due_ts": new Date().toLocaleString() + '',
            "invoice_paid_ts": new Date().toLocaleString() + ''
        }


        console.log('sourcePayLoadData', sourcePayLoadData);
        console.log('Start create source connector.')
        try {


            createKafkaConnector(sourcePayLoadData);

            console.log('sinkPayLoadData', sinkPayLoadData);
            console.log('Start create sink connector.')
            createKafkaConnector(sinkPayLoadData);

            CreateInvoiceProcess(invoicebody);
            toast.success("Thêm tiến trình thành công!");
        }
        catch (error) {
            console.log(error)
            toast.error("Thêm tiến trình thất bại!");

        }
        // createKafkaConnector(sourcePayLoadData).then(res => {
        //     if (res.status === 200) {
        //         console.log('Created source connector successfully.');
        //         console.log(res.data);
        //         // CreateInvoiceProcess(invoicebody);
        //         createKafkaConnector(sinkPayLoadData).then(res2 => {
        //             if (res2.status === 200) {
        //                 console.log('Created sink connector successfully.');
        //                 console.log(res2.data);
        //                 CreateInvoiceProcess(invoicebody);
        //             }
        //         })
        //             .catch(err2 =>{
        //                 console.log(err2.data);
        //                 console.log("Error create sink connector.");
        //             } );
        //     }
        // })
        //     .catch(err => {
        //         console.log(err.data);
        //         console.log("Error create source connector.");
        //     } );

    }
    return (
        <MainCard>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ sm: 6, md: 12 }} style={divStyle}>
                    <Grid item xs={3} sm={6} md={6} >
                        <strong>Chọn subcripttion: </strong>   <Select id="subscription_id" name='subscription_id'
                            size="small"
                            style={divStyle}
                            headername={'Subscription id'}
                            onChange={sonInputChanged}
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
                    </Grid>
                    <Grid item xs={3} sm={6} md={6} >
                        <TextField
                            type="text"
                            name="tentientrinh"
                            id="tentientrinh"
                            label="Tên tiến trình"
                            fullWidth
                            value={Streamsource.tentientrinh}
                            onChange={sonInputChanged}
                            style={divStyle}

                        />
                    </Grid>
                    <Grid item xs={3} sm={6} md={6} >
                        <Item style={divStyle} ><strong>Nguồn</strong></Item>
                        <strong>Loại CSDL Nguồn: </strong>
                        <Select name='sdbtype'
                            size="small"
                            style={divStyle}
                            value={Streamsource.sdbtype}
                            onChange={sonInputChanged}
                        >

                            {datatypes.map((datatype) => (
                                <MenuItem
                                    key={datatype.key}
                                    value={datatype.key}
                                >
                                    {datatype.name}
                                </MenuItem>
                            ))}

                        </Select>
                        {/* 1 */}
                        <TextField
                            type="text"
                            name="sdatabaseservername"
                            id="sdatabaseservername"
                            label="Tên máy chủ CSDL nguồn"
                            fullWidth
                            style={divStyle}
                            value={Streamsource.sdatabaseservername}
                            onChange={sonInputChanged}
                        />
                        {/* 2 */}
                        <TextField
                            type="text"
                            name="sdatabasehostname"
                            id="sdatabasehostname"
                            label="IP/Host Name CSDL nguồn"
                            fullWidth
                            style={divStyle}
                            value={Streamsource.sdatabasehostname}
                            onChange={sonInputChanged}
                        />
                        {/* 3 */}
                        <TextField
                            type="text"
                            name="sdatabaseport"
                            id="sdatabaseport"
                            label="Port CSDL nguồn"
                            fullWidth
                            style={divStyle}
                            value={Streamsource.sdatabaseport}
                            onChange={sonInputChanged}
                        />
                        {/* 4 */}
                        <TextField
                            type="text"
                            name="sdatabasedbname"
                            id="sdatabasedbname"
                            label="Tên CSDL nguồn"
                            fullWidth
                            style={divStyle}
                            value={Streamsource.sdatabasedbname}
                            onChange={sonInputChanged}
                        />
                        {/* 5 */}
                        <TextField
                            type="text"
                            name="sdatabaseuser"
                            id="sdatabaseuser"
                            label="Tài khoản đăng nhập nguồn"
                            fullWidth
                            style={divStyle}
                            value={Streamsource.sdatabaseuser}
                            onChange={sonInputChanged}
                        />
                        {/* 6 */}
                        <TextField
                            type="text"
                            name="sdatabasepassword"
                            id="sdatabasepassword"
                            label="Mật khẩu đăng nhặp nguồn"
                            fullWidth
                            style={divStyle}
                            value={Streamsource.sdatabasepassword}
                            onChange={sonInputChanged}
                        />
                        {/* 7 */}
                        <TextField
                            type="text"
                            name="stableincludelist"
                            id="stableincludelist"
                            label="Bảng dữ liệu nguồn"
                            fullWidth
                            style={divStyle}
                            value={Streamsource.stableincludelist}
                            onChange={sonInputChanged}
                        />

                    </Grid>
                    <Grid item xs={3} sm={6} md={6} >
                        <Item style={divStyle}><strong>Đích</strong></Item>
                        <strong>Loại CSDL Đích: </strong>
                        <Select name='tdbtype'
                            size="small"
                            style={divStyle}
                            value={Streamtarget.tdbtype}
                            onChange={tonInputChanged}
                        >

                            {datatypes.map((datatype) => (
                                <MenuItem
                                    key={datatype.key}
                                    value={datatype.key}
                                >
                                    {datatype.name}
                                </MenuItem>
                            ))}

                        </Select>
                        {/* 1 */}
                        <TextField
                            type="text"
                            name="tdatabaseservername"
                            id="tdatabaseservername"
                            label="Tên máy chủ CSDL đích"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.tdatabaseservername}
                            onChange={tonInputChanged}
                        />
                        {/* 2 */}
                        <TextField
                            type="text"
                            name="tdatabasehostname"
                            id="tdatabasehostname"
                            label="IP/Host Name CSDL đích"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.tdatabasehostname}
                            onChange={tonInputChanged}
                        />
                        {/* 3 */}
                        <TextField
                            type="text"
                            name="tdatabaseport"
                            id="tdatabaseport"
                            label="Port CSDL đích"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.tdatabaseport}
                            onChange={tonInputChanged}
                        />
                        {/* 4 */}
                        <TextField
                            type="text"
                            name="tdatabasedbname"
                            id="tdatabasedbname"
                            label="Tên CSDL đích"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.tdatabasedbname}
                            onChange={tonInputChanged}
                        />
                        {/* 5 */}
                        <TextField
                            type="text"
                            name="tdatabaseuser"
                            id="tdatabaseuser"
                            label="Tài khoản đăng nhập đích"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.tdatabaseuser}
                            onChange={tonInputChanged}
                        />
                        {/* 6 */}
                        <TextField
                            type="text"
                            name="tdatabasepassword"
                            id="tdatabasepassword"
                            label="Mật khẩu đăng nhặp đích"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.tdatabasepassword}
                            onChange={tonInputChanged}
                        />
                        {/* 7 */}
                        <TextField
                            type="text"
                            name="ttableincludelist"
                            id="ttableincludelist"
                            label="Bảng dữ liệu đích"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.ttableincludelist}
                            onChange={tonInputChanged}
                        />
                        {/* 7 */}
                        <TextField
                            type="text"
                            name="ttableprimarykey"
                            id="ttableprimarykey"
                            label="Primary Key Column (trường hợp cần update dữ liệu)"
                            fullWidth
                            style={divStyle}
                            value={Streamtarget.ttableprimarykey}
                            onChange={tonInputChanged}
                        />
                    </Grid>


                </Grid>
                <Button onClick={submit}>Tạo Tiến Trình</Button>
            </Box>
            <ToastContainer/>

        </MainCard>
    )
}

export default RegisterStreaming
