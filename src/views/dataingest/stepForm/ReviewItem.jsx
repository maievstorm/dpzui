import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";
import { scheduletypes, writemodetype } from "./constant";
import { datatypes } from "./constant";
import { IconSquarePlus, IconCircleMinus } from '@tabler/icons'
import MultipleSelectCheckmarks from "../MultipleSelectCheckmarks";
import UserService from "services/UserService";
import config from "../../../config";
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { processTime } from "./constant";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


import {
    Grid,
    Button

} from "@mui/material";



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

    const styles = {
        style: {
            marginTop: '10px'
        },
        InputProps: {
            style: { fontSize: 18 },
            readOnly: edit,
            disableUnderline: edit,
        },
        InputLabelProps: {
            style: {
                fontSize: 20,
            }

        }
    }

    const [lvPassword, setLvPassword] = useState([])

    const handleViewPassword = (index) => {
        let value;
        if (lvPassword[index] === undefined){
            value = false
        }
        else{
            value = !lvPassword[index]
        }
        setLvPassword({ ...lvPassword, [index]: value })
    }






    return (
        <div>
            <h3>Thông số chi tiết tiến trình</h3>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="DagId"
                            name="DagId"
                            label="Tên tiến trình"
                            value={conf?.DagId}
                            style={styles.style}
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                            }}
                            InputLabelProps={styles.InputLabelProps}
                            fullWidth
                            variant="standard"
                            // onChange={onInputChanged}
                            focused

                        />

                        {
                            !edit && <FormControl style={styles.style} fullWidth>
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
                                            style={styles.style}
                                            InputProps={{
                                                readOnly: true,
                                                disableUnderline: true,
                                            }}
                                            InputLabelProps={styles.InputLabelProps}
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

                                value={conf?.Schedule}
                                // onChange={onInputChanged}
                                InputProps={styles.InputProps}
                                InputLabelProps={styles.InputLabelProps}
                                fullWidth
                                variant="standard"
                                focused

                            />
                        }
                        {
                            !edit && <>
                                <br></br>
                                <br></br>


                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="Lịch chay"
                                        name="schedule_interval"
                                        value={dateValue}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </>
                        }

                        {
                            edit &&
                            <TextField
                                label="schedule_interval"
                                id="schedule_interval"
                                name="schedule_interval"

                                value={conf?.schedule_interval}
                                InputProps={styles.InputProps}
                                InputLabelProps={styles.InputLabelProps}
                                fullWidth
                                variant="standard"
                                focused

                            />
                        }


                        <TextField
                            label="Owner"
                            id="Owner"
                            name="Owner"

                            value={conf?.owner}
                            // onChange={onInputChanged}
                            InputProps={styles.InputProps}
                            InputLabelProps={styles.InputLabelProps}
                            fullWidth
                            variant="standard"
                            focused

                        />


                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Tags"
                            id="tags"
                            name="tags"
                            focused
                            value={conf?.tags}
                            onChange={onInputChanged}
                            InputProps={styles.InputProps}
                            InputLabelProps={styles.InputLabelProps}
                            fullWidth
                            variant="standard"

                        />

                        {
                            !edit &&
                            <FormControl fullWidth style={styles.style}>
                                <InputLabel id="demo-simple-select-label">Subscription</InputLabel>
                                <Select id="subscription_id" name='subscription_id' value={conf?.subscription_id} onChange={onInputChanged}
                                    size="small"
                                    style={divStyle}
                                    headername={'Subscription id'}
                                >

                                    {subscription_id.map((scheduletype, index) => (
                                        <MenuItem
                                            key={index}
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

                                value={conf?.subscription_id}
                                InputProps={styles.InputProps}
                                InputLabelProps={styles.InputLabelProps}
                                fullWidth
                                variant="standard"
                                focused

                            />
                        }

                    </Grid>
                </Grid>





            </Box>

            <Box>
                {
                    formSrcFields?.map((form, index) => (
                        <Box sx={{ flexGrow: 1 }} key={index}>
                            <h2> <strong>Nguồn dữ liệu {index + 1} </strong><br></br></h2>


                            <Grid container spacing={2}>
                                <Grid item xs={6}>
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
                                            InputProps={styles.InputProps}
                                            InputLabelProps={styles.InputLabelProps}
                                            fullWidth
                                            variant="standard"
                                            focused
                                        />
                                    }
                                    <TextField
                                        label='Đường dẫn kết nối'
                                        name='connectstring'
                                        value={form?.connectstring}
                                        onChange={event => props.handleFormSrcChange(event, index)}

                                        InputProps={styles.InputProps}
                                        InputLabelProps={styles.InputLabelProps}
                                        fullWidth
                                        variant="standard"
                                        focused
                                    />
                                    <TextField
                                        name='databasename'
                                        label='Tên cơ sở dữ liệu'
                                        onChange={event => props.handleFormSrcChange(event, index)}

                                        value={form.databasename}
                                        InputProps={styles.InputProps}
                                        InputLabelProps={styles.InputLabelProps}
                                        fullWidth
                                        variant="standard"
                                        focused
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name='srcusername'
                                        label='Tài khoản đăng nhập'
                                        onChange={event => props.handleFormSrcChange(event, index)}

                                        value={form.srcusername}
                                        InputProps={styles.InputProps}
                                        InputLabelProps={styles.InputLabelProps}
                                        fullWidth
                                        variant="standard"
                                        focused
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <TextField
                                            name='srcpassword'
                                            label='Mật khẩu'
                                            type={(lvPassword[index] === true || lvPassword[index] === undefined) ? "password" : ''}
                                            onChange={event => props.handleFormSrcChange(event, index)}

                                            value={form.srcpassword}
                                            InputProps={styles.InputProps}
                                            InputLabelProps={styles.InputLabelProps}
                                            variant="standard"
                                            focused />
                                        <Button onClick={() => handleViewPassword(index)}>
                                            <RemoveRedEyeOutlinedIcon />
                                        </Button>
                                    </Box>

                                    <TextField
                                        name='alias'
                                        label='Tên bảng cho tiến trình'
                                        onChange={event => props.handleFormSrcChange(event, index)}

                                        value={form.alias}
                                        InputProps={styles.InputProps}
                                        InputLabelProps={styles.InputLabelProps}
                                        fullWidth
                                        variant="standard"
                                        focused
                                    />





                                </Grid>

                                <Grid item xs={12}>

                                    <TextField
                                        name='tablename'
                                        multiline
                                        label='Tên bảng/Truy vấn/Tên file'
                                        onChange={event => props.handleFormSrcChange(event, index)}

                                        value={form.tablename}
                                        InputProps={styles.InputProps}
                                        InputLabelProps={styles.InputLabelProps}
                                        fullWidth
                                        variant="standard"
                                        focused />
                                </Grid>
                                {
                                    !edit && <Button style={divStyle} name="removesource" onClick={() => props?.removeFields(index)}><IconCircleMinus /></Button>
                                }
                            </Grid>


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
                                id={`queryname${index}`}
                                name="queryname"
                                value={formquery?.queryname}
                                style={divStyle}
                                onChange={event => props.handleformQuery(event, index)}

                                InputProps={styles.InputProps}
                                InputLabelProps={styles.InputLabelProps}
                                fullWidth
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
                                    style={divStyle}

                                    InputProps={styles.InputProps}
                                    InputLabelProps={styles.InputLabelProps}
                                    fullWidth
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
                                fullWidth
                                value={formquery?.querydetail}
                                onChange={event => props.handleformQuery(event, index)}

                                style={divStyle}
                                InputProps={styles.InputProps}
                                InputLabelProps={styles.InputLabelProps}
                                focused
                            />
                            <br></br>

                            {
                                edit && <TextField
                                    label="Target table"
                                    size="small"
                                    value={formquery?.targettable}
                                    style={styles.style}
                                    InputProps={styles.InputProps}
                                    InputLabelProps={styles.InputLabelProps}
                                    focused
                                    variant="standard"
                                    fullWidth
                                />
                            }

                            {
                                !edit && <Select name='targettable'
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
                            }
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
                                    value={formquery?.writemode}
                                    InputProps={styles.InputProps}
                                    InputLabelProps={styles.InputLabelProps}
                                    fullWidth
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
        </div >
    )
}