import React from "react";
//import { useState, useEffect } from 'react'
import ActionButtons from "./ActionButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


export const Review = (props) => {
  const conf = props.conf
 
  const divStyle = {
    margin: '5px',
  };

  const validate = () => {
    props.lastStep();
    props.userCallback();
  }
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Thông số chi tiết tiến trình</h3>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">

        <TextField
          id="DagId"
          label="Tên tiến trình"
          value={conf?.DagId}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
          variant="standard"

          focused
          size="small"

        />

        <TextField
          label="Tần suất chạy"
          id="Schedule"
          name="Schedule"
          size="small"

          value={conf?.Schedule}
          // onChange={onInputChanged}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
          focused
          variant="standard"

        />

        <TextField
          label="Owner"
          id="Owner"
          name="Owner"
          size="small"

          value={conf?.owner}
          // onChange={onInputChanged}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
          focused
          variant="standard"

        />

        <TextField
          label="Tags"
          id="tags_name"
          name="tags_name"

          focused
          variant="standard"

          value={conf?.tags}
          // onChange={onInputChanged}
          size="small"
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}

        />
        <TextField
          label="Subscription_id"
          id="subscription_id"
          name="subscription_id"

          focused
          variant="standard"

          value={conf?.subscription_id}
          // onChange={onInputChanged}
          size="small"
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}

        />

      </Box>
      {
        //source
      }
      {
        conf?.source?.map((form, index) => (
          <Box component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">

            <h3><strong>Nguồn dữ liệu {index + 1} </strong></h3>
            <TextField
              label='Source Type'
              name='sourcetype'
              value={form?.sourcetype}
              size="small"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />
            <TextField
              label='Đường dẫn kết nối'
              name='connectstring'
              value={form?.connectstring}
              size="small"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />
            <TextField
              name='databasename'
              size="small"
              label='Tên cơ sở dữ liệu'
              value={form.databasename}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />
            <br></br>
            <TextField
              name='srcusername'
              size="small"
              label='Tài khoản đăng nhập'
              value={form.srcusername}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />
            <TextField
              name='srcpassword'
              size="small"
              label='Mật khẩu'
              value={form.srcpassword}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
              />

            <TextField
              name='tablename'
              size="small"
              multiline
              fullWidth
              label='Tên bảng/Truy vấn/Tên file'
              value={form.tablename}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
              />
            <TextField
              name='alias'
              size="small"
              label='Tên bảng cho tiến trình'
              value={form.alias}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
              />
          </Box>
        ))
      }
      {
        //query
      }

      {
        conf?.query?.map((formquery, index) => (
          <Box 
          // component="form"
          //   sx={{
          //     '& .MuiTextField-root': { m: 1, width: '25ch' },
          //   }}
          //   noValidate
          //   autoComplete="off"
            >
            <h3><strong>Tổng hợp {index + 1} </strong></h3>
       
            <TextField
              label="Tên job tổng hợp"
              id="queryname"
              name="queryname"
              value={formquery?.queryname}
              size="small"
              style={divStyle}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />
            <TextField
              label="Bảng cần tổng hợp"
              value={formquery?.listsourcetable}
              size="small"
              style={divStyle}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />
            <br></br>

            <TextField
              label="Query Detail"
              id="querydetail"
              name="querydetail"
              multiline
              size="small"
              fullWidth
              value={formquery?.querydetail}
              style={divStyle}
              InputProps={{
                readOnly: true,
              }}
              focused
              
            />
            <br></br>


            <TextField
              label="Target table"
              size="small"
              value={formquery?.targettable}
              style={divStyle}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />
            <TextField
              label="Write mode"
              size="small"
              value={formquery?.writemode}
              style={divStyle}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              focused
              variant="standard"
            />


          </Box>

        ))
      }


      {/* <div><pre>{JSON.stringify(conf, null, 2)}</pre></div> */}


      <ActionButtons {...props} lastStep={validate} />

    </div>
  )
};
