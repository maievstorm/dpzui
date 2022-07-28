import { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
 
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import { GetProcess } from 'services/DataIngest';




export default function ManageStream() {
    const [rows, setData] = useState([]);
    const columns = [
        {
            name: "id_invoice",
            options: {
                filter: true
            },
            label: 'ID'
        },
        {
            name: "item_name",
            options: {
                filter: true
            },
            label: 'Tên tiến trình',
        }
        ,
        {
            name: "invoice_created_ts",
            options: {
                filter: false
            },
            label: 'Ngày tạo'
        }

    ];
   
    useEffect(() => {
        GetProcess('stream')
        .then(res => {
            setData(res.data.data.map(item => {
                let invoice_created_ts = new Date(Date.parse(item.invoice_created_ts)).toLocaleString()
                return {
                    'id_invoice': item.id_invoice,
                    'item_name': item.item_name,
                    'invoice_created_ts': invoice_created_ts
                }

            }));
            // setData(res.data.data);
        }).catch(err => { console.log(err) })
    }, []);




    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {}

    };

    const navigate = useNavigate()
    const onClickHandler = () => navigate('/datastream/registerstream')


    return (
        <div>
            <Button onClick={onClickHandler} > {<AddIcon />} Tạo tiến trình</Button>
            <Button   > {<ModeEditIcon />} Hiệu chỉnh</Button>

            <MUIDataTable
                title={"Danh sách tiến trình"}
                data={rows}
                columns={columns}
                options={options}
            />

        </div>

    )

}



