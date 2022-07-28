import React from "react";
import ActionButtons from "./ActionButton";

import Box from '@mui/material/Box';
import { Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconSquarePlus, IconCircleMinus } from '@tabler/icons'
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { datatypes } from "./constant";

export const Source = (props) => {
    const [error, setError] = useState("");

    
    const [formSrcFields, setFormSrcFields] = useState([
        {
            sourcetype: '',
            connectstring: '',
            databasename: '',
            srcusername: '',
            srcpassword: '',
            tablename: '',
            alias: ''
        },
    ])
    const handleFormSrcChange = (event, index) => {
        let data = [...formSrcFields];
        data[index][event.target.name] = event.target.value;
        setFormSrcFields(data);
    }
    const removeFields = (index) => {
        let data = [...formSrcFields];
        data.splice(index, 1)
        setFormSrcFields(data)
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


    const divStyle = {
        margin: '5px'
    };

    const validate = () => {
        let is_error = true;
        let check_dict = {}
        for(let i= 0;i<formSrcFields.length;i++){
            if(!formSrcFields[i].alias){
                is_error = false
                setError("Không được bỏ trống trường Alias");
                break;
            }
            if(formSrcFields[i].alias in check_dict){
                setError("Các trường Alias phải khác nhau");
                is_error = false
                break;
            }
            check_dict[formSrcFields[i].alias] = 1
        }
        if(is_error){
            setError("");
            props.nextStep();
            props.userCallback(formSrcFields);
        }

    };


    return (
        <div>
            <p>
                <strong>
                    Đăng ký dữ liệu
                </strong>
            </p>
            <br></br>
            <span style={{color:'red'}}>{error}</span>


            <Box >
                {formSrcFields?.map((form, index) => {
                    return (
                        <div key={index}  >
                            <h2><strong>Nguồn dữ liệu {index + 1} </strong></h2>

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
                                name='databasename'
                                size="small"
                                label='Tên cơ sở dữ liệu'
                                onChange={event => handleFormSrcChange(event, index)}
                                value={form.databasename}
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
                            <br></br>

                            <TextField
                                name='tablename'
                                size="small"
                                multiline
                                fullWidth
                                label='Tên bảng/Truy vấn/Tên file'
                                onChange={event => handleFormSrcChange(event, index)}
                                value={form.tablename}
                                style={divStyle}
                            />
                            <br></br>
                            <TextField
                                name='alias'
                                size="small"
                                label='Tên bảng cho tiến trình'
                                onChange={event => handleFormSrcChange(event, index)}
                                value={form.alias}
                                style={divStyle}
                            />
                            <Button style={divStyle} name="removesource" onClick={() => removeFields(index)}><IconCircleMinus /></Button>
                            <br></br>
                        </div>
                    )
                })}
                <Button style={divStyle} name="addsoruce" onClick={addFields}><IconSquarePlus /></Button>
            </Box>

            <ActionButtons {...props} nextStep={validate}/>

        </div>
    );
};
