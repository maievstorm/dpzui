import { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip, IconButton } from '@mui/material';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
//import DpzStorageConf from 'services/StorageConf';
import { GetProcess } from 'services/DataIngest';
import { DpzStorageConf } from 'services/StorageConf';



export default function ManageStore() {
    const [rows, setData] = useState([]);
    const [ownbucket, setownbucket] = useState([]);
    const [selectedbucket, setselectedbucket] = useState([]);
    const [bucketname, setbucketname] = useState("");
    const [storagekey, setstoragekey] = useState("");

    useEffect(() => {
        // const getstorageapi = config.rootapi + '/invoice/usernamentype/' + UserService.getUsername() + '&storage';

        GetProcess('storage')
            .then(res => {
                let data = res.data.data.map(item => {
                    return {
                        'id': item.item_name, 
                        'name': item.item_name,
                        'storagekey':item.customer_invoice_data
                    }
                })
                setownbucket(data)
                setbucketname(data[0]?.name)
              //  getBuckets(data[0].name)
                getBuckets(data[0]?.name,data[0]?.storagekey)

                setselectedbucket(data[0])
                setstoragekey(data[0]?.storagekey)
                
            }).catch(err => { console.log(err) })
    }, []);


    const onInputChanged = (event) => {
        const targetValue = event.target.value;
        let res = ownbucket.filter((bucket)=>bucket.id===targetValue)[0]
        getBuckets(targetValue,res?.storagekey);
        setbucketname(targetValue);
    
    };
  



    const getBuckets = (targetValue,defaultStorageKey) => {
        // create the client

        
        const fileObj = []

       const storagekey = JSON.parse(defaultStorageKey)
      // console.log(storagekey?.accessKey,storagekey?.secretKey)
      

      
     
    //console.log(ownbucket.filter((bucket)=>bucket.id===targetValue)[0].storagekey)

        try {
            DpzStorageConf(storagekey?.accessKey,storagekey?.secretKey)
                .then(storage => {
                    const stream = storage.listObjects(targetValue, '', true);

                    stream.on('data', function (obj) { fileObj.push(obj) });
                    stream.on("end", function () {
                        let data = JSON.parse(JSON.stringify(fileObj))
                        let newData = data.map(item => {
                            let lastModified = new Date(Date.parse(item.lastModified)).toLocaleString()

                            return {
                                'etag': item.item,
                                'lastModified': lastModified,
                                'name': item.name,
                                'size': item.size
                            }
                        })
                        // data.lastModified = data.lastModified.map(item =>{
                        //     return new Date(Date.parse(item)).toLocaleString()
                        // })
                        setData(newData);
                    });
                    stream.on('error', function (err) { console.log(err) });

                })


        } catch (e) {
            console.log(e)
        }

    };



    const columns = [
        {
            name: "name",
            options: {
                filter: true
            },
            label: 'Tên tệp'
        },
        {
            name: "size",
            options: {
                filter: true
            },
            label: 'Dung lượng tệp',
        },
        {
            name: "lastModified",
            options: {
                filter: false
            },
            label: 'Ngày tạo'
        }

    ];





    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        textLabels: {},
        customToolbarSelect: selectedRows => (
            <>
                <Tooltip title="Tải về">
                    <IconButton
                        onClick={() => {
                            getObject(bucketname, rows[selectedRows.data[0].dataIndex]['name'])


                        }}

                    >
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Xoá">
                    <IconButton
                        onClick={() => {
                            deleteObjects(bucketname, rows[selectedRows.data[0].dataIndex]['name'])


                        }}

                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

            </>

        )
    };

    const deleteObjects = async (curent_bucketName, obj) => {
        let res = ownbucket.filter((bucket)=>bucket.id===curent_bucketName)[0]
        let storagekey = JSON.parse(res?.storagekey)



        if (obj) {

            try {
                DpzStorageConf(storagekey?.accessKey,storagekey?.secretKey)
                .then(storage => {
                    storage.removeObject(curent_bucketName, obj, function (err) {
                        if (err) {
                            return console.log('Unable to remove object', err)
                        }
                        console.log('Removed the object')
                        getBuckets(curent_bucketName,res?.storagekey);
                    });

                })
                .catch (e=> {
                    console.log(e)
                })
                
            } catch (e) {
                console.log(e)
            }

        }

    }

    const getObject = async (curent_bucketName, obj) => {
        let res = ownbucket.filter((bucket)=>bucket.id===curent_bucketName)[0]
        let storagekey = JSON.parse(res?.storagekey)


        if (obj) {

            try {
                DpzStorageConf(storagekey?.accessKey,storagekey?.secretKey)
                .then(storage =>{
                    storage.presignedGetObject(curent_bucketName, obj, 24 * 60 * 60, function (err, presignedUrl) {
                        if (err) return console.log(err)
                        console.log(presignedUrl)
                        window.location.href = presignedUrl
    
                    })
                })
            } catch (e) {
                console.log(e)
            }

        }

    }



    const navigate = useNavigate()

    const onClickHandler = () => navigate('/objectstore/uploadmultifile');




    return (
        <div><strong>Danh sách thư mục : </strong>
            <Select id="listbucket"
                name='listbucket'
                value={bucketname}
                // defaultValue={ownbucket[0]?.name}
                onChange={onInputChanged}
                size="small"
            >

                {ownbucket.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.name}
                    >
                        {item.name}
                    </MenuItem>
                ))}

            </Select>
            <Button onClick={onClickHandler} > {<AddIcon />} Tải lên</Button>
            {/* <Button   > {<ModeEditIcon/>} Tải xuống</Button>
                <Button   > {<ModeEditIcon/>} Xoá</Button> */}
            <MUIDataTable
                title={"Danh sách tệp tin"}
                data={rows}
                columns={columns}
                options={options}
            />

        </div>

    )

}



