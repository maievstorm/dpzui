import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRequestsub } from 'services/SubscriptionService';
import {
  
    TextField,
    Button,
    Box,
    Stack
} from '@mui/material';



export default function RequestSub() {
    const [userInfo, setUserInfo] = useState({
        user_name: '',
        fullname: '',
        email: '',
        upassword: ''
    })
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        createRequestsub(userInfo.user_name,userInfo.fullname,userInfo.email,userInfo.upassword)
            .then(res => {
                toast.success('Thêm subscription thành công!')
                setTimeout(()=>{
                    handleClose()
                },1500)
            })
            .catch(err => {
                toast.error('Thêm subscription thất bại!')
            })

    };

    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleTypeInput = (evt) => {
        const value = evt.target.value;
        setUserInfo({
            ...userInfo,
            [evt.target.name]: value
        });
    }


    return (
        <Box marginTop={5} marginLeft={5}>

            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm tài khoản
            </Button>


            <Dialog open={open}
                onClose={handleClose} fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle>Thêm tài khoản</DialogTitle>
                <Box marginLeft={10} marginRight={10} marginTop={5} >
                    <Stack spacing={2}>
                        <TextField label="Username" name='user_name' onChange={handleTypeInput}></TextField>
                        <TextField label="Password" type={'password'} name='upassword' onChange={handleTypeInput}></TextField>
                        <TextField label="Fullname" name='fullname' onChange={handleTypeInput}></TextField>

                        <TextField label="Email" name='email' onChange={handleTypeInput}></TextField>

                    </Stack>
                    <br></br>
                    <br></br>

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