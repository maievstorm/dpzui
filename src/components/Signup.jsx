import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserService from 'services/UserService';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef} from 'react';

const theme = createTheme();

export default function SignInSide() {
    const captchaRef = useRef(null)
    const handleSubmit = (event) => {
        event.preventDefault();
        var today = new Date();
        let data = new FormData(event.currentTarget);
        data = {
            user_account_id: null,
            user_name: data.get('username'),
            'fullname': data.get('fullname'),
            email: data.get('email'),
            upassword: data.get('password'),
            'offer_id': null,
            'plan_id': null,
            'request_date': today,
            'request_status': 0,
            'type': 0
        }
        // console.log(JSON.stringify(data))
        let token =captchaRef.current.getValue()
        console.log(token)
        if (token){
            UserService.applyService(data)
            toast.success("Đăng ký thành công!",{theme: "colored" })
            captchaRef.current.reset()
        }
        else{
            toast.error("Hãy nhập CAPTCHA",{theme: "colored" })
        }
    };


    return (
        <ThemeProvider theme={theme}>
        
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Họ và tên"
                        name="fullname"
                        autoComplete="fullname"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Địa chỉ Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tài khoản"
                        name="username"
                        autoComplete="email"
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng ký
                    </Button>

                </Box>
                <br></br>
                <ReCAPTCHA
                    sitekey="6LdSCMEgAAAAACzYgkBiTcNcr7DbA02I2MUL5UbU"
                    ref={captchaRef } 
                                 />
            </Box>
            {/* </Grid>
      </Grid> */}
      <ToastContainer />
        </ThemeProvider>
    );
}