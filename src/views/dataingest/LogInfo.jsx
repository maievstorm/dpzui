import { useEffect, useState } from "react";
import { useLocation, useNavigate,useParams } from "react-router"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MUIDataTable from "mui-datatables";
import DataIngest from "services/DataIngest";
import { Tooltip, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import RateReviewIcon from '@mui/icons-material/RateReview';
export default function LogInfo() {
    const navigate = useNavigate()
    // const location = useLocation()
    let params = useParams();
    const DagId = params?.dagid;

    const [rows, setData] = useState([]);


    const getData = () => {
        DataIngest.getLoginfo(DagId)
            .then(res => {
                setData(res.data.dag_runs?.map(item => {
                    let start_date = new Date(Date.parse(item?.start_date)).toLocaleString()
                    // let execution_date = new Date( Date.parse(item?.execution_date) ).toLocaleString()
                    let end_date = new Date(Date.parse(item?.end_date)).toLocaleString()

                    return {
                        'dag_run_id': item?.dag_run_id,
                        'start_date': start_date,
                        // 'execution_date': execution_date,
                        'end_date': end_date,
                        'state': item?.state
                    }
                }))
            })

    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            name: "dag_run_id",
            options: {
                filter: true
            },
            label: 'Lịch sử'
        },
        {
            name: "start_date",
            options: {
                filter: true
            },
            label: 'Bắt đầu',
        },
        // {
        //     name: "execution_date",
        //     options: {
        //         filter: true
        //     },
        //     label: 'execution_date'
        // },
        {
            name: "end_date",
            options: {
                filter: true
            },
            label: 'Kết thúc'
        }
        ,
        {
            name: "state",
            options: {
                filter: true
            },
            label: 'Trạng thái'
        }

    ];

    // const onEdittJobClickHandler = (type, selected) => {
    //     navigate(type, { state: { id: selected } })
    // }

    const onEdittJobClickHandler = (type, DagId,logid) => {
        navigate(type  + DagId + '/' + logid)
    }

    const refresh = () => {
        getData()
    }


    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {},
        customToolbar: () => {
            return (
                <IconButton onClick={refresh}>{<RefreshIcon />}</IconButton>
            )
        },
        customToolbarSelect: selectedRows => (
            <>
                <Tooltip title="Xem chi tiết log">
                    <IconButton
                        onClick={() => {
                            onEdittJobClickHandler('/dataingest/loginformation/', DagId, rows[selectedRows.data[0].dataIndex]['dag_run_id']);
                            // onEdittJobClickHandler('/dataingest/loginformation/logdagdetail', DagId + '/dagRuns/' + rows[selectedRows.data[0].dataIndex]['dag_run_id']);

                        }}

                    >
                        <RateReviewIcon />
                    </IconButton>

                </Tooltip>

            </>

        )


    };

    return (
        <Box>
            <Box>
                <Button onClick={() => navigate('/dataingest')} >{<ArrowBackIcon />}</Button>
                <p>Tên tiến trình: <strong>{DagId}</strong></p>
            </Box>

            <MUIDataTable
                title={"Lịch sử tiến trình"}
                data={rows}
                columns={columns}
                options={options}

            />
        </Box>
    )
}