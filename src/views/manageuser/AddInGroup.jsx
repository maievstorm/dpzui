import { FormControl, TextField, Stack, Button } from '@mui/material';
import MUIDataTable from "mui-datatables"
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, IconButton, Box } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { accountByUsername } from 'services/UserAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSubscription } from 'services/InGroupService';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';



export default function AddInGroup({ dataGroup }) {

    // const columns = ["user_group_id", "customer_invoice_data"];

    const [userName, setUserName] = useState('')
    const [subscriptionInfo, setSubscriptionInfo] = useState('')

    const [isAdmin, setIsAdmin] = useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    // const options = {
    //     filter: false,
    //     print: false,
    //     selectableRows: "single",
    //     responsive: "standard",
    //     textLabels: {},
    //     customToolbarSelect: selectedRows => {
    //         setSubscriptionInfo(dataGroup[selectedRows.data[0].dataIndex])
    //     }
    // };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setSubscriptionInfo(event.target.value);
    };


    const handleSubmit = () => {
        handleClose()
        console.log(userName)
        accountByUsername(userName)
            .then(res => {
                let data = res.data.data
                let user_account_id = data.id
                let user_group_id = subscriptionInfo
                console.log(user_group_id, user_account_id, isAdmin)
                addSubscription(user_group_id, user_account_id, isAdmin)
                    .then(res => {
                        toast.success("Thêm user thành công!");
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500)
                    })
                    .catch(err => {
                        toast.error("Thêm user thất bại!");
                    })

            })
            .catch(err => {
                toast.error("Username invalid!");
            })
    };

    return (
        <Box marginTop={5}>

            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm tài khoản
            </Button>


            <Dialog open={open}
                onClose={handleClose} fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle>Thêm tài khoản</DialogTitle>
                <Box marginLeft={10} marginRight={10} marginTop={5} minHeight={300}>

                    <Box
                    >
                        <TextField id="outlined-basic" label="User name" variant="outlined" onChange={e => setUserName(e.target.value)} />
                        {/* <MUIDataTable
                        title={"Danh sách đăng ký"}
                        data={dataGroup}
                        columns={columns}
                        options={options}
                    /> */}
                        <br></br>

                        <br></br>


                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Nhóm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subscriptionInfo}
                                label="Age"
                                onChange={handleChange}
                            >
                                {
                                    dataGroup.map((item, index) => {
                                        return <MenuItem key={index} value={item[0]}>{item[1]}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <br></br>


                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Admin</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => setIsAdmin(e.target.value)}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="true" />
                            <FormControlLabel value={false} control={<Radio />} label="false" />
                        </RadioGroup>
                    </FormControl>

                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleSubmit}>Xác nhận</Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <ToastContainer />
        </Box>


    )
}