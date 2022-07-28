import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";
import { scheduletypes, writemodetype } from "./constant";
import { datatypes } from "./constant";
import { IconSquarePlus, IconCircleMinus } from '@tabler/icons'
import Button from '@mui/material/Button';
import MultipleSelectCheckmarks from "../MultipleSelectCheckmarks";
import UserService from "services/UserService";
import config from "../../../config";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { processTime } from "./constant";



export default function ReviewItem(props) {
    const [dateValue, setDateValue] = useState(new Date('2014-08-18T21:11:54'));
    const setConfInfo = props?.setConfInfo
    const conf = props?.conf
    const edit = props?.edit === undefined ? true : props?.edit === false ? true : false
    const onInputChanged = props?.onInputChanged
    const [subscription_id, setSubscription_id] = useState([]);
   

    useEffect(() => {
        let router = config.rootapi + '/subscription/subbyusername/' + UserService.getUsername()
        axios({
            method: 'get',
            url: router
        })
            .then(res => {
                setSubscription_id(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])

    const divStyle = {
        margin: '5px'
    };
    const formSrcFields = props?.formSrcFields
    const formQuery = props?.formQuery
    const handleChange = (newValue) => {
        setDateValue(newValue)
        let crontab_struct = processTime(newValue, conf?.Schedule)
        setConfInfo({ ...conf, 'schedule_interval': crontab_struct });

    };
    useEffect(() => {
        let crontab_struct = processTime(dateValue, conf?.Schedule)
        setConfInfo({ ...conf, 'schedule_interval': crontab_struct });
    }, [conf?.Schedule])

   


    return (
        <div>
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">

                <TextField
                    id="DagId"
                    name="DagId"
                    label="Tên tiến trình"
                    value={conf?.DagId}
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                    }}
                    variant="standard"
                    // onChange={onInputChanged}
                    focused
                    size="small"

                />
               
                {
                    !edit && <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tần suất chạy</InputLabel>
                        <Select id="Schedule" name='Schedule' value={conf?.Schedule} onChange={onInputChanged}
                            size="small"
                            style={divStyle}
                            headername={'Tần suất chạy'}
                        >

                            {scheduletypes.map((scheduletype) => (
                                <MenuItem
                                    key={scheduletype.key}
                                    value={scheduletype.key}
                                >
                                    {scheduletype.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                }

                {
                    edit && <TextField
                        label="Tần suất chạy"
                        id="Schedule"
                        name="Schedule"
                        size="small"

                        value={conf?.Schedule}
                        // onChange={onInputChanged}
                        InputProps={{
                            readOnly: edit,
                            disableUnderline: edit,
                        }}
                        variant="standard"
                        focused

                    />
                }
                {
                    !edit && <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Lịch chay"
                            name="schedule_interval"
                            value={dateValue}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                }

                {
                    edit &&
                    <TextField
                        label="schedule_interval"
                        id="schedule_interval"
                        name="schedule_interval"
                        size="small"

                        value={conf?.schedule_interval}
                        // onChange={onInputChanged}
                        InputProps={{
                            readOnly: edit,
                            disableUnderline: true,
                        }}
                        variant="standard"
                        focused

                    />
                }


                <TextField
                    label="Owner"
                    id="Owner"
                    name="Owner"
                    size="small"

                    value={conf?.owner}
                    // onChange={onInputChanged}
                    InputProps={{
                        readOnly: edit,
                        disableUnderline: true,
                    }}
                    variant="standard"
                    focused

                />

                <TextField
                    label="Tags"
                    id="tags"
                    name="tags"

                    focused

                    value={conf?.tags}
                    onChange={onInputChanged}
                    size="small"
                    InputProps={{
                        readOnly: edit,
                        disableUnderline: edit,
                    }}
                    variant="standard"

                />

                {
                    !edit &&
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Subscription</InputLabel>
                        <Select id="subscription_id" name='subscription_id' value={conf?.subscription_id} onChange={onInputChanged}
                            size="small"
                            style={divStyle}
                            headername={'Subscription id'}
                        >

                            {subscription_id.map((scheduletype) => (
                                <MenuItem
                                    key={scheduletype.subscription_id}
                                    value={scheduletype.subscription_id}
                                >
                                    {scheduletype.subscription_id}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                }

                {
                    edit && <TextField
                        label="Subscription"
                        id="subscription_id"
                        name="subscription_id"
                        size="small"

                        value={conf?.subscription_id}
                        // onChange={onInputChanged}
                        InputProps={{
                            readOnly: edit,
                            disableUnderline: edit,
                        }}
                        variant="standard"
                        focused

                    />
                }

            </Box>

            <Box>
                {
                    formSrcFields?.map((form, index) => (
                        <Box
                            key={index}
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off">

                            <h2> <strong>Nguồn dữ liệu {index + 1} </strong><br></br></h2>
                            {
                                !edit && <Select name='sourcetype' value={form.sourcetype} onChange={event => props.handleFormSrcChange(event, index)}
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
                            }
                            {
                                edit &&
                                <TextField
                                    label='Source Type'
                                    name='sourcetype'
                                    onChange={event => props.handleFormSrcChange(event, index)}

                                    value={form?.sourcetype}
                                    size="small"
                                    InputProps={{
                                        readOnly: edit,
                                        disableUnderline: edit,
                                    }}
                                    variant="standard"
                                    focused
                                />
                            }
                            <TextField
                                label='Đường dẫn kết nối'
                                name='connectstring'
                                value={form?.connectstring}
                                size="small"
                                onChange={event => props.handleFormSrcChange(event, index)}

                                InputProps={{
                                    readOnly: edit,
                                    disableUnderline: edit,
                                }}
                                variant="standard"
                                focused
                            />
                            <TextField
                                name='databasename'
                                size="small"
                                label='Tên cơ sở dữ liệu'
                                onChange={event => props.handleFormSrcChange(event, index)}

                                value={form.databasename}
                                InputProps={{
                                    readOnly: edit,
                                    disableUnderline: edit,
                                }}
                                variant="standard"
                                focused
                            />
                            <br></br>
                            <TextField
                                name='srcusername'
                                size="small"
                                label='Tài khoản đăng nhập'
                                onChange={event => props.handleFormSrcChange(event, index)}

                                value={form.srcusername}
                                InputProps={{
                                    readOnly: edit,
                                    disableUnderline: edit,
                                }}
                                variant="standard"
                                focused
                            />
                            <TextField
                                name='srcpassword'
                                size="small"
                                label='Mật khẩu'
                                onChange={event => props.handleFormSrcChange(event, index)}

                                value={form.srcpassword}
                                InputProps={{
                                    readOnly: edit,
                                    disableUnderline: edit,
                                }}
                                variant="standard"
                                focused />

                            <TextField
                                name='tablename'
                                size="small"
                                multiline
                                fullWidth
                                label='Tên bảng/Truy vấn/Tên file'
                                onChange={event => props.handleFormSrcChange(event, index)}

                                value={form.tablename}
                                InputProps={{
                                    readOnly: edit,
                                    disableUnderline: edit,
                                }}
                                variant="standard"
                                focused />
                            <TextField
                                name='alias'
                                size="small"
                                label='Tên bảng cho tiến trình'
                                onChange={event => props.handleFormSrcChange(event, index)}

                                value={form.alias}
                                InputProps={{
                                    readOnly: edit,
                                    disableUnderline: edit,
                                }}
                                variant="standard"
                                focused
                            />
                            {
                                !edit && <Button style={divStyle} name="removesource" onClick={() => props?.removeFields(index)}><IconCircleMinus /></Button>
                            }
                        </Box>

                    ))

                }
                {
                    !edit && <Button style={divStyle} name="addsoruce" onClick={props?.addFields}><IconSquarePlus /></Button>

                }

            </Box>
            <Box>
                {
                    formQuery?.map((formquery, index) => (
                        <Box
                            // component="form"
                            //   sx={{
                            //     '& .MuiTextField-root': { m: 1, width: '25ch' },
                            //   }}
                            //   noValidate
                            //   autoComplete="off"
                            key={index}

                        >
                            <h2> <strong>Tổng hợp {index + 1} </strong></h2>
                            <br></br>
                            <TextField
                                label="Tên job tổng hợp"
                                id="queryname"
                                name="queryname"
                                value={formquery?.queryname}
                                size="small"
                                style={divStyle}
                                onChange={event => props.handleformQuery(event, index)}

                                InputProps={{
                                    readOnly: edit,
                                    disableUnderline: edit,
                                }}
                                variant="standard"
                                focused
                            />
                            {
                                !edit && <MultipleSelectCheckmarks
                                    headerName={'Danh sách bảng cần tổng hợp'}
                                    data={props.formSrcFields}
                                    formQuery={props.formQuery}
                                    setformQuery={props.setformQuery}
                                    index={index}
                                    source={'listsourcetable'} />
                            }
                            {
                                edit && <TextField
                                    label="Bảng cần tổng hợp"
                                    value={formquery?.listsourcetable}
                                    size="small"
                                    style={divStyle}

                                    InputProps={{
                                        readOnly: edit,
                                        disableUnderline: edit,
                                    }}
                                    variant="standard"
                                    focused
                                />
                            }

                            <br></br>

                            <TextField
                                label="Query Detail"
                                id="querydetail"
                                name="querydetail"
                                multiline
                                size="small"
                                fullWidth
                                value={formquery?.querydetail}
                                onChange={event => props.handleformQuery(event, index)}

                                style={divStyle}
                                InputProps={{
                                    readOnly: edit,
                                }}
                                focused
                            />
                            <br></br>



                            <Select name='targettable'
                                value={formquery?.targettable}
                                onChange={event => props.handleformQuery(event, index)}
                                size="small"
                                style={divStyle}
                                variant="standard"
                                focused
                            >

                                {formSrcFields?.map((formSrcField) => (
                                    <MenuItem
                                        key={formSrcField.alias}
                                        value={formSrcField.alias}
                                    >
                                        {formSrcField.alias}
                                    </MenuItem>
                                ))}

                            </Select>
                            {
                                !edit && <Select name='writemode'
                                    value={formquery.writemode}
                                    onChange={event => props.handleformQuery(event, index)}
                                    size="small"
                                    style={divStyle}
                                >

                                    {writemodetype.map((writemode) => (
                                        <MenuItem
                                            key={writemode.key}
                                            value={writemode.key}
                                        >
                                            {writemode.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            }
                            {
                                edit && <TextField
                                    label="Write mode"
                                    size="small"
                                    value={formquery?.writemode}
                                    style={divStyle}
                                    InputProps={{
                                        readOnly: edit,
                                        disableUnderline: edit,
                                    }}
                                    variant="standard"
                                    focused
                                />
                            }
                            {
                                !edit && <Button name="btnremovequery" onClick={() => props.removeQuery(index)}><IconCircleMinus /></Button>

                            }


                        </Box>

                    ))
                }
                {
                    !edit && <Button style={divStyle} name="btnaddquery" onClick={props.addFieldQuery}><IconSquarePlus /></Button>

                }

            </Box>
        </div>
    )
}