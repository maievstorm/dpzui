import { useEffect, useState } from "react"
import { getUserSubscription } from "services/SubscriptionService"
import MUIDataTable from "mui-datatables"
import DeleteIcon from '@mui/icons-material/Delete';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Tooltip, IconButton } from '@mui/material';
import AddInGroup from './AddInGroup';
import { deleteInGroup } from "services/InGroupService";
import { ToastContainer, toast } from 'react-toastify';
import RequestSub from "./RequestSub";
import 'react-toastify/dist/ReactToastify.css';
import { getUserInfor, resetPassword } from "services/KeycloakService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import {
    TextField,
    Button,
    Box,
    Stack
} from '@mui/material';


export default function FormManageUser() {

    const [users, setUsers] = useState([])

    const [newPassword, setNewPassword] = useState('')

    const handleTypeInput = (evt) => {
        const value = evt.target.value;
        setNewPassword(value);
    }

    console.log(users)



    const columns = [
        {
            name: "user_name",
            options: {
                filter: true
            },
            label: 'Tài Khoản'
        },
        {
            name: "email",
            options: {
                filter: true
            },
            label: 'Email'
        }
        ,
        {
            name: "customer_invoice_data",
            options: {
                filter: true
            },
            label: 'Nhóm'
        },
        {
            name: "group_admin",

            label: 'Quản trị'
        },
        {
            name: "time_added",
            options: {
                filter: true
            },
            label: 'Ngày tạo'
        }


    ];


    const [dataGroup, setDataGroup] = useState([])
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const deleteSubscription = (selected) => {
        let indexSelected = selected?.data[0].dataIndex
        let userInfor = users[indexSelected]
        deleteInGroup(userInfor.user_group_id, userInfor.user_account_id)
            .then(res => {
                toast.success("Xoá subscription thành công!");
                setTimeout(() => {
                    users.splice(indexSelected, 1)
                    setUsers(users)
                    seRowsSelected([])

                }, 500)
                return true
            })
            .catch(err => {
                toast.error("Có lỗi xảy ra!");
                return false
            })

    }

    const [rowsSelected, seRowsSelected] = useState([])


    const handleResetPassword = () => {
        let userSelected = users[rowsSelected]
        let username = userSelected.user_name
        let email = userSelected.email

        console.log(username, email)
        getUserInfor(username, email)
            .then(res => {
                if (res.status === 401) {
                    toast.error('Phiên làm việc không còn hiệu lực!')

                }
                else if (res.data.data.length > 0) {
                    let userId = res.data.data[0].id
                    return userId
                }
                else {
                    return;
                }
            })
            .then(userId => {
                if (userId !== undefined) {
                    resetPassword(userId, newPassword)
                        .then(res => {
                            if (res.status === 401) {
                                toast.error('Phiên làm việc không còn hiệu lực!')
                            }
                            else {
                                toast.success('Cập nhật mật khẩu thành công!')
                                setTimeout(() => {
                                    handleClose()
                                }, 1500)

                            }

                        })
                        .catch(err => {
                            toast.error('Cập nhật mật khẩu thất bại!')

                        })
                }
                else {
                    toast.error('Không tìm thấy tài khoản!')
                }
            })
            .catch(err => {
                toast.error('Thông tin tài khoản không hợp lệ!')

            })
    }

    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {},
        rowsSelected: rowsSelected,
        onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
            seRowsSelected(rowsSelected);
        },
        customToolbarSelect: selectedRows => (
            <>
                <Tooltip title="Đổi mật khẩu">
                    <IconButton
                        onClick={handleClickOpen}
                    >
                        <VpnKeyIcon />
                    </IconButton>

                </Tooltip>
                <Tooltip title="delete">
                    <IconButton
                        onClick={() => {
                            deleteSubscription(selectedRows);
                        }}


                    >
                        <DeleteIcon />
                    </IconButton>

                </Tooltip>

            </>

        )
    };

    useEffect(() => {
        getUserSubscription()
            .then(res => {
                let data = res?.data?.data?.data


                let initDataGroup = []
                for (var i = 0; i < data.length; i++) {
                    var dTime = new Date(data[i]?.time_added).toLocaleString();
                    let localTime = dTime === '1/1/1970, 8:00:00 AM' ? 'null' : dTime
                    data[i].time_added = localTime;



                    var dTime = new Date(data[i]?.time_removed).toLocaleString();
                    data[i].time_removed = dTime === '1/1/1970, 8:00:00 AM' ? 'null' : dTime
                    let isAdmin = data[i].group_admin === true ? 'true' : 'false'
                    data[i].group_admin = isAdmin
                    initDataGroup.push([data[i].user_group_id, data[i].customer_invoice_data])
                }
                setUsers(data)
                let stringArray = initDataGroup.map(JSON.stringify);
                let uniqueStringArray = new Set(stringArray);
                let uniqueArray = Array.from(uniqueStringArray, JSON.parse);
                setDataGroup(uniqueArray)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])




    return (
        <Box>
            <MUIDataTable
                title={'Danh sách người dùng'}
                data={users}
                columns={columns}
                options={options}
            />
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
            // spacing={{ xs: 2, sm: 2, md: 4 }}
            // spacing={2}
            >
                <AddInGroup dataGroup={dataGroup} />
                <RequestSub dataGroup={dataGroup} />
            </Stack>
            <Dialog open={open}
                onClose={handleClose} fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle>Cập nhật mật khẩu</DialogTitle>
                <Box marginLeft={10} marginRight={10} marginTop={5} >
                    <Stack spacing={2}>
                        <TextField label="Mật khẩu mới" name='newPassword' type='password' onChange={handleTypeInput}></TextField>

                    </Stack>
                    <br></br>
                    <br></br>

                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleResetPassword}>Xác nhận</Button>

                    </DialogActions>
                </Box>
            </Dialog>
            <ToastContainer />
        </Box>

    )
}