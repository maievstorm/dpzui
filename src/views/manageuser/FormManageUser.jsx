import { useEffect, useState } from "react"
import { getUserSubscription } from "services/SubscriptionService"
import MUIDataTable from "mui-datatables"
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, IconButton } from '@mui/material';
import AddInGroup from './AddInGroup';
import { deleteInGroup } from "services/InGroupService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FormManageUser() {

    const [users, setUsers] = useState([])


    const columns = [
        {
            name: "id",
            options: {
                filter: true
            },
            label: 'Id'
        },
        {
            name: "user_account_id",
            options: {
                filter: true
            },
            label: 'User account id',
        },
        {
            name: "user_name",
            options: {
                filter: true
            },
            label: 'User name'
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
            options: {
                filter: true
            },
            label: 'Group admin'
        },
        {
            name: "time_added",
            options: {
                filter: true
            },
            label: 'Thời gian thêm'
        },
        {
            name: "time_removed",
            options: {
                filter: true
            },
            label: 'Thời gian xoá'
        },
        {
            name: "user_group_id",
            options: {
                filter: true
            },
            label: 'User group id'
        }

    ];

    // const columns = ["id", "user_account_id", "user_name", "customer_invoice_data", "group_admin", "time_added", "time_removed", "user_group_id"];

    const [dataGroup,setDataGroup] = useState([])

    const deleteSubscription = (selected) => {
        let indexSelected = selected?.data.map(item => item.dataIndex)
        let userInfor = users[indexSelected]
        console.log(userInfor.user_group_id,userInfor.user_account_id)
        deleteInGroup(userInfor.user_group_id,userInfor.user_account_id)
        .then(res=>{
            toast.success("Xoá subscription thành công!");

                setTimeout(()=>{
                    window.location.reload();

                },1500)

        })
        .catch(err=>{
            toast.error("Có lỗi xảy ra!");
        })
        
    }

    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {},
        customToolbarSelect: selectedRows => (
            <Tooltip title="Xoá subscription">
                <IconButton
                    onClick={() => {
                        deleteSubscription(selectedRows);
                    }}
                >
                    <DeleteIcon />
                </IconButton>

            </Tooltip>
        )
    };

    useEffect(() => {
        getUserSubscription()
            .then(res => {
                let data = res?.data?.data?.data


                let initDataGroup = []
                for (var i = 0; i < data.length; i++) {
                    var dTime = new Date(data[i]?.time_added).toLocaleString();
                    let localTime = dTime === '1/1/1970, 8:00:00 AM'? 'null':dTime
                    data[i].time_added = localTime;



                    var dTime = new Date(data[i]?.time_removed).toLocaleString();
                    data[i].time_removed = dTime === '1/1/1970, 8:00:00 AM'? 'null':dTime
                    let isAdmin = data[i].group_admin === true? 'true':'false'
                    data[i].group_admin = isAdmin
                    initDataGroup.push([data[i].user_group_id,data[i].customer_invoice_data])
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
        <>
            <MUIDataTable
                title={'Thông tin yêu cầu đăng kí'}
                data={users}
                columns={columns}
                options={options}
            />
            <AddInGroup dataGroup = {dataGroup}/>
            <ToastContainer/>
        </>

    )
}