import React, { useState } from "react";
//import { useState, useEffect } from 'react'
import ActionButtons from "./ActionButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import {
  Grid,
  Button

} from "@mui/material";


export const Review = (props) => {
  const conf = props.conf

  const divStyle = {
    margin: '5px',
  };

  const validate = () => {
    props.lastStep();
    props.userCallback();
  }

  const styles = {
    style: {
      marginTop: '10px'
    },
    InputProps: {
      style: { fontSize: 18 },
      readOnly: true,
      disableUnderline: true,
    },
    InputLabelProps: {
      style: {
        fontSize: 20,
      }

    }
  }

  const [lvPassword, setLvPassword] = useState([])

  const handleViewPassword = (index) => {
    let value;
    if (lvPassword[index] === undefined) {
      value = false
    }
    else {
      value = !lvPassword[index]
    }
    setLvPassword({ ...lvPassword, [index]: value })
  }


  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Thông số chi tiết tiến trình</h3>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="DagId"
              label="Tên tiến trình"
              value={conf?.DagId}
              style={styles.style}
              InputProps={styles.InputProps}
              InputLabelProps={styles.InputLabelProps}
              fullWidth
              variant="standard"

              focused
              marginTop={'20px'}
            />

            <TextField
              label="Tần suất chạy"
              id="Schedule"
              name="Schedule"
              size="small"

              value={conf?.Schedule}
              style={styles.style}
              InputProps={styles.InputProps}
              InputLabelProps={styles.InputLabelProps}
              focused
              variant="standard"
              fullWidth

            />

            <TextField
              label="Owner"
              id="Owner"
              name="Owner"
              size="small"

              value={conf?.owner}
              // onChange={onInputChanged}
              style={styles.style}
              InputProps={styles.InputProps}
              InputLabelProps={styles.InputLabelProps}
              focused
              variant="standard"
              fullWidth

            />
          </Grid>

          <Grid item xs={6}>
            <TextField

              label="Tags"
              id="tags_name"
              name="tags_name"

              focused
              variant="standard"

              value={conf?.tags}
              // onChange={onInputChanged}
              style={styles.style}
              InputProps={styles.InputProps}
              InputLabelProps={styles.InputLabelProps}

              fullWidth

            />
            <TextField

              label="Subscription_id"
              id="subscription_id"
              name="subscription_id"

              focused
              variant="standard"

              value={conf?.subscription_id}
              style={styles.style}
              InputProps={styles.InputProps}
              InputLabelProps={styles.InputLabelProps}
              fullWidth

            />
          </Grid>


        </Grid>
      </Box>

      {
        conf?.source?.map((form, index) => (
          <Box sx={{ flexGrow: 1 }}>
            <h3><strong>Nguồn dữ liệu {index + 1} </strong></h3>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label='Source Type'
                  name='sourcetype'
                  value={form?.sourcetype}
                  size="small"
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  fullWidth
                  focused
                  variant="standard"
                />
                <TextField
                  label='Đường dẫn kết nối'
                  name='connectstring'
                  value={form?.connectstring}
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  fullWidth
                  focused
                  variant="standard"
                />
                <TextField
                  name='databasename'
                  size="small"
                  label='Tên cơ sở dữ liệu'
                  value={form.databasename}
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  fullWidth
                  focused
                  variant="standard"
                />


              </Grid>

              <Grid item xs={6}>
                <TextField
                  name='srcusername'
                  size="small"
                  label='Tài khoản đăng nhập'
                  value={form.srcusername}
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  fullWidth
                  focused
                  variant="standard"
                />

                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    name='srcpassword'
                    size="small"
                    type={(lvPassword[index] === true || lvPassword[index] === undefined) ? "password" : ''}
                    label='Mật khẩu'
                    value={form.srcpassword}
                    style={styles.style}
                    InputProps={styles.InputProps}
                    InputLabelProps={styles.InputLabelProps}

                    focused
                    variant="standard"
                  />

                  <Button onClick={() => handleViewPassword(index)}>
                    <RemoveRedEyeOutlinedIcon />
                  </Button>
                </Box>

                <TextField
                  name='alias'
                  size="small"
                  label='Tên bảng cho tiến trình'
                  value={form.alias}
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  fullWidth
                  focused
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='tablename'
                  size="small"
                  multiline
                  fullWidth
                  label='Tên bảng/Truy vấn/Tên file'
                  value={form.tablename}
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  focused
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Box>


        ))
      }

      {
        conf?.query?.map((formquery, index) => (

          <Box sx={{ flexGrow: 1 }} style={{ marginBottom: '30px' }}>
            <h3><strong>Tổng hợp {index + 1} </strong></h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>

                <TextField
                  label="Tên job tổng hợp"
                  id="queryname"
                  name="queryname"
                  value={formquery?.queryname}
                  size="small"
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  focused
                  variant="standard"
                  fullWidth
                />
                <TextField
                  label="Bảng cần tổng hợp"
                  value={formquery?.listsourcetable}
                  size="small"
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  focused
                  variant="standard"
                  fullWidth
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Target table"
                  size="small"
                  value={formquery?.targettable}
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  focused
                  variant="standard"
                  fullWidth
                />
                <TextField
                  label="Write mode"
                  size="small"
                  value={formquery?.writemode}
                  style={styles.style}
                  InputProps={styles.InputProps}
                  InputLabelProps={styles.InputLabelProps}
                  focused
                  variant="standard"
                  fullWidth
                />

              </Grid>

              <TextField
                label="Query Detail"
                id="querydetail"
                name="querydetail"
                multiline
                size="small"
                fullWidth
                style={styles.style}
                value={formquery?.querydetail}
                InputProps={styles.InputProps}
                InputLabelProps={styles.InputLabelProps}
                focused

              />

            </Grid>
          </Box>
        ))
      }


      {/* <div><pre>{JSON.stringify(conf, null, 2)}</pre></div> */}


      <ActionButtons {...props} lastStep={validate} />

    </div>
  )
};
