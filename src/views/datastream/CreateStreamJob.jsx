import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { IconSquarePlus,IconCircleMinus} from '@tabler/icons'; 
import axios from 'axios';

function CreateStreamJob() {
    const [formSrcFields, setFormSrcFields] = useState([
        {
            sourcetype: '',
            connectstring: '',
            srcusername:'',
            srcpassword :'',
            tablename: '',
            alias: ''
        },
    ])
    const [Streaminfo, setStreaminfo] = useState([
        {
            StreamId: '',
            Schedule: '',
            owner: '',
            Description: ''
        },
    ])

    const [formQuery, setformQuery] = useState([
        {
            queryname: '',
            querydetail: '',
            listsourcetable: '',
            targettable: ''
        },
    ])
    // console.log(formQuery)



    const handleFormSrcChange = (event, index) => {
        let data = [...formSrcFields];
        data[index][event.target.name] = event.target.value;
        setFormSrcFields(data);
    }
    const handleformQuery = (event, index) => {
        let data = [...formQuery];
        data[index][event.target.name] = event.target.value;
        setformQuery(data);
    }

    const handleStreaminfo = (event, index) => {
        let data = [...Streaminfo];
        data[index][event.target.name] = event.target.value;
        setStreaminfo(data);
    }


    const submit = (e) => {
        e.preventDefault();
        let data = {
            'DAG': [
                {
                    'DagId': Streaminfo.DagId,
                    "Schedule": Streaminfo.Schedule,
                    "owner": Streaminfo.owner,
                    'tags': Streaminfo.tags_name,
                    'source': formSrcFields,
                    'query': formQuery
                }

            ]
        }

        
        const json = JSON.stringify({ "name": "SQLDBZtest", "config": { "connector.class": "io.debezium.connector.sqlserver.SqlServerConnector", "database.hostname": "10.15.10.135", "database.port": "1433", "database.user": "sa",  "database.password": "123456a@",  "database.dbname": "dpa", "database.server.name": "test", "table.include.list": "dbo.CARD_TRANSACTION", "database.history.kafka.bootstrap.servers": "kafkadpa-headless:9092" , "database.history.kafka.topic": "test_dbhistory", "decimal.handling.mode":"double", "time.precision.mode": "connect", "transforms": "route,unwrap", "transforms.route.type": "org.apache.kafka.connect.transforms.RegexRouter", "transforms.route.regex": "([^.]+)\\.([^.]+)\\.([^.]+)", "transforms.route.replacement": "$3", "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState", "transforms.unwrap.drop.tombstones": "false" } });
        console.log(json)
        
        const res =  axios.post('https://streamdpa.apps.xplat.fis.com.vn', json);
    }

    const addFields = () => {
        let object = {
            sourcetype: '',
            connectstring: '',
            tablename: '',
            alias: ''
        }

        setFormSrcFields([...formSrcFields, object])
    }

    const removeFields = (index) => {
        let data = [...formSrcFields];
        data.splice(index, 1)
        setFormSrcFields(data)
    }
   

    const addFieldQuery = () => {
        let object = {
            queryname: '',
            querydetail: '',
            targettype: '',
            listsourcetable: '',
            targettable: ''
        }

        setformQuery([...formQuery, object])

    }
    const removeQuery = (index) => {
        let data = [...formQuery];
        data.splice(index, 1)
        setformQuery(data)
    }
    const datatypes = [
        {
            key :'storage',
            name : 'Lưu trữ đám mây'
        },
        {
            key :'dwh',
            name : 'Kho dữ liệu'
        },
        {
            key :'bigdata',
            name : 'Dữ liệu lớn'
        }
        ,
        {
            key :'mssql',
            name : 'Microsof Sql, Azure SQL'
        } ,
        {
            key :'oracle',
            name : 'Oracle'
        }
        ,
        {
            key :'mysql',
            name : 'MySQL'
        }
        ,
        {
            key :'postgres',
            name : 'PostgresSQL'
        }
        

    ]

    
    const divStyle = {
        margin: '5px'
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
        };
  


    return (
        <div >
            <strong>
                Thông tin job
            </strong>
            <Box >

                <TextField
                    label="Tên Job"
                    id="DagId"
                    name="DagId"
                    value={Streaminfo.DagId}
                    size="small"
                    onChange={event => setStreaminfo({ ...Streaminfo.DagId, ['DagId']: event.target.value })}
                    style={divStyle}

                />
                <TextField
                    label="Schedule"
                    id="Schedule"
                    name="Schedule"
                    size="small"
                    value={Streaminfo.Schedule}
                    onChange={event => setStreaminfo({ ...Streaminfo, 'Schedule': event.target.value })}
                    style={divStyle}
                />
                <TextField
                    label="Người tạo"
                    id="owner"
                    name="owner"
                    value={Streaminfo.owner}
                    onChange={event => setStreaminfo({ ...Streaminfo, 'owner': event.target.value })}
                    size="small"
                    style={divStyle}
                />
                <TextField
                    label="Tags"
                    id="tags_name"
                    name="tags_name"
                    value={Streaminfo.tags_name}
                    onChange={event => setStreaminfo({ ...Streaminfo, 'tags_name': event.target.value })}
                    size="small"
                    style={divStyle}
                />


            </Box>
            <div>
                <p>
                <strong>
                    Đăng ký dữ liệu
                </strong>
                </p>
               
                <Box >
                    {formSrcFields.map((form, index) => {
                        return (
                            <div key={index}  >
                               <strong>{index+1} </strong> 
                                <Select name='sourcetype' value={form.sourcetype} onChange={event => handleFormSrcChange(event, index)}
                                 size="small"
                                 style={divStyle}
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


                                <TextField
                                    name='connectstring'
                                    size="small"
                                    label='Đường dẫn kết nối'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.connectstring}
                                    style={divStyle}
                                />
                                <TextField
                                    name='srcusername'
                                    size="small"
                                    label='Tài khoản đăng nhập'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.srcusername}
                                    style={divStyle}
                                />
                                 <TextField
                                    name='srcpassword'
                                    size="small"
                                    label='Mật khẩu'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.srcpassword}
                                    style={divStyle}
                                />
                                <TextField
                                    name='tablename'
                                    size="small"
                                    label='Tên bảng/tên file'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.tablename}
                                    style={divStyle}
                                />
                                <TextField
                                    name='alias'
                                    size="small"
                                    label='Tên bảng cho truy vấn'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.alias}
                                    style={divStyle}
                                />
                                <Button style={divStyle} name="removesource" onClick={() => removeFields(index)}><IconCircleMinus/></Button>
                                <br></br>
                            </div>
                        )
                    })}
                    <Button style={divStyle} name = "addsoruce" onClick={addFields}><IconSquarePlus/></Button>
                </Box>
                <strong>
                    Đăng ký thủ tục truyền tải dữ liệu
                </strong>
                <div  >
                    {/* <input placeholder='Số query' onChange={e => addFieldQuery(e.target.value)}/> */}
                    {formQuery.map((formquery, index) => (
                        <div key={index} >
                            <strong>{index+1} </strong> 
                            <div >
                                {/* <strong>Query {index}</strong> */}
                                <TextField
                                    label="Tên job streaming"
                                    id="queryname"
                                    name="queryname"
                                    value={formquery.queryname}
                                    size="small"
                                    onChange={event => handleformQuery(event, index)}
                                    style={divStyle}
                                />
                                 <br></br>
                                 Bảng nguồn: 
                                 <Select name='listsourcetable' 
                                        value={formquery.listsourcetable}  
                                        onChange={event => handleformQuery(event, index)}
                                        size="small"
                                        style={divStyle}
                                >
                                   
                                     {formSrcFields.map((formSrcField) => (
                                            <MenuItem
                                            key={formSrcField.alias}
                                            value={formSrcField.alias}
                                            >
                                            {formSrcField.alias}
                                            </MenuItem>
                                        ))}

                                </Select>
                                 <Button name="btnremovequery" onClick={() => removeQuery(index)}><IconCircleMinus/></Button>
                                 <br></br>
                               
                                Bảng đích :
                                <Select name='targettable' 
                                        value={formquery.targettable}  
                                        onChange={event => handleformQuery(event, index)}
                                        size="small"
                                        style={divStyle}
                                >
                                   
                                     {formSrcFields.map((formSrcField) => (
                                            <MenuItem
                                            key={formSrcField.alias}
                                            value={formSrcField.alias}
                                            >
                                            {formSrcField.alias}
                                            </MenuItem>
                                        ))}

                                </Select>

                                {/* <TextField
                                    label="Tên bảng đích"
                                    id="targettable"
                                    name="targettable"
                                    value={formquery.targettable}
                                    onChange={event => handleformQuery(event, index)}
                                    size="small"
                                    style={divStyle}
                                /> */}
                            </div>
                          
                        </div>
                        
                    ))
                    }
                 
                </div>
            </div>
            <br />
            <Button onClick={submit}>Tạo tiến trình</Button>
        </div>
    );
}

export default CreateStreamJob;