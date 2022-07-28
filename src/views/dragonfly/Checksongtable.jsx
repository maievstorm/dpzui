import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import UserService from "services/UserService";



export default function ChecksongDataTable() {


  const [data, setData] = useState([]);

  const columns = [
    {
      name: "id",
      options: {
        filter: true
      },
      label: 'ID'
    },
    {
      name: "check_song_name",
      options: {
        filter: true
      },
      label: 'Tên bài hát',
    }
    ,
    {
      name: "src_url",
      options: {
        filter: false
      },
      label: 'Link'
    }
    ,
    {
      name: "src_song_duration",
      options: {
        filter: false
      },
      label: 'Độ dài (s)'
    }
    ,
    {
      name: "src_view_count",
      options: {
        filter: false
      },
      label: 'Số views'
    }
    ,
    {
      name: "original_song_name",
      options: {
        filter: false
      },
      label: 'Bài hát gốc'
    }
    ,
    {
      name: "time_similar",
      options: {
        filter: false
      },
      label: 'Số s giống nhau'
    }
    ,
    {
      name: "start_match_target",
      options: {
        filter: false
      },
      label: 'start_match_target'
    }
    ,
    {
      name: "start_match_source",
      options: {
        filter: false
      },
      label: 'start_match_source'
    }

  ];

  const options = {
    filter: false,
    print: false,
    selectableRows: "single",
    responsive: "standard",
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: "https://dpaapigw.apps.xplat.fis.com.vn/dpzapipub/api/v1/checksong",
      headers: { "Authorization": `Bearer ${UserService.getToken()}` }

    }).then(res => {
      setData(res.data.data);
    })
  }, []);
  return (
    <>
      <MUIDataTable
        title={"Danh sách bài hát"}
        data={data}
        columns={columns}
        options={options}
      />

    </>

  );
} 