import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ActionButtons from "./ActionButton";
import { useState, useEffect } from "react";
import config from "../../../config";
import axios from 'axios';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import UserService from "services/UserService";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DateFNSUtils from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import { processTime } from "./constant";
export const Info = (props) => {
  const [dateValue, setDateValue] = React.useState(new Date('2014-08-18T21:11:54'));


  const divStyle = {
    margin: '5px'
  };
  const [error, setError] = useState("");

  const [daginfo, setDagInfo] = useState({})
  

  const [subscription_id, setSubscription_id] = useState([]);

  useEffect(() => {
    let router = config.rootapi + '/subscription/subbyusername/' + UserService.getUsername()
    axios({
      method: 'get',
      url: router
    })
      .then(res => {
        setSubscription_id(res.data.data)
      })
      .catch(error => console.log(error))
  }, [])
  useEffect(() => {
    let crontab_struct = processTime(dateValue, daginfo?.Schedule)
    setDagInfo({ ...daginfo, 'schedule_interval': crontab_struct });


  }, [daginfo.Schedule])



  const handleChange = (newValue) => {
    setDateValue(newValue)
    let crontab_struct = processTime(newValue, daginfo?.Schedule)
    setDagInfo({ ...daginfo, 'schedule_interval': crontab_struct });

  };


  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setDagInfo((daginfo) => ({
      ...daginfo,
      [targetName]: targetValue
    }));
  };
 

  const scheduletypes = [
    {
      key: 'None',
      name: 'None'
    },
    {
      key: '@once',
      name: 'Một lần'
    },
    {
      key: '@hourly',
      name: 'Hằng giờ'
    },
    {
      key: '@daily',
      name: 'Hằng ngày'
    },
    {
      key: '@weekly',
      name: 'Hằng tuần'
    },
    {
      key: '@monthly',
      name: 'Hằng tháng'
    }


  ]


  const validate = () => {
    const getairflowapi = config.rootapi + '/invoice/' + daginfo.DagId;
    axios.get(getairflowapi)
      .then(res => {
        setError("Đã tồn tại tên tiến trình!");

      })
      .catch(err => {
        if (!daginfo.DagId || !daginfo.Schedule || !daginfo.tags || !daginfo.subscription_id) setError("Thông tin không chính xác!");
        else {
          setError("");
          props.nextStep();
          props.userCallback(daginfo);
        }
      })

  };


  return (
    <div>
      <strong>
        Thông tin tiến trình
      </strong><br></br>
      <span style={{ color: 'red' }}>{error}</span>

      <Box >


        <TextField
          label="Tên tiến trình"
          id="DagId"
          name="DagId"
          value={daginfo.DagId}
          size="small"
          onChange={onInputChanged}
          style={divStyle}

        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tần suất chạy</InputLabel>
          <Select id="Schedule" name='Schedule' value={daginfo.Schedule} onChange={onInputChanged}
            size="small"
            style={divStyle}
            headername={'Tần suất chạy'}
            label='Tần suất chạy'
             
          >

            {scheduletypes.map((scheduletype) => (
              <MenuItem
                key={scheduletype.key}
                value={scheduletype.key}
              >
                {scheduletype.name}
              </MenuItem>
            ))}

          </Select>
          <br></br>
        </FormControl>
        <LocalizationProvider dateAdapter={DateFNSUtils}>
          <DateTimePicker
            label="Lịch chay"
            name="schedule_interval"
            value={dateValue}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br></br>
        <TextField
          label="Tags"
          id="tags"
          name="tags"
          value={daginfo.tags}
          onChange={onInputChanged}
          size="small"
          style={divStyle}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Subscription</InputLabel>

          <Select id="subscription_id" name='subscription_id' value={daginfo.subscription_id} onChange={onInputChanged}
            size="small"
            style={divStyle}
            headername={'Subscription id'}
          >

            {subscription_id.map((sub) => (
              <MenuItem
                key={sub.subscription_id}
                value={sub.subscription_id}
              >
                {sub.subscription_name}
              </MenuItem>
            ))}

          </Select>
        </FormControl>



      </Box>
      <ActionButtons {...props} nextStep={validate} />
    </div>
  );
};
