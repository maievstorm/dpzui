import { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
 
import { GetProcess } from 'services/DataIngest'; 



export default function ManageBigdata() {
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
            label: 'Tên CSDL',
        },
        {
            name: "customer_invoice_data",
            options: {
                filter: false
            },
            label: 'Thông số CSDL'
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
        GetProcess('bigdata').then(res => {
            setData(res.data.data.map(item => {
                let invoice_created_ts = new Date(Date.parse(item.invoice_created_ts)).toLocaleString()
                return {
                    'id_invoice': item.id_invoice,
                    'item_name': item.item_name,
                    'customer_invoice_data':item.customer_invoice_data,
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





    return (
        <div>

            <MUIDataTable
                title={"Danh sách dữ liệu lớn"}
                data={rows}
                columns={columns}
                options={options}
            />

        </div>

    )

}



