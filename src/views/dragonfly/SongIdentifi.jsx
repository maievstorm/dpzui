import * as React from "react";
import useRecorder from "./useRecorder";
import axios from "axios";
import { useState } from 'react'
import { Input, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


function SongIdentifi() {
  const [loading, setLoading] = React.useState(false);
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [file, setFile] = useState();
 // const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  //const [columns, setColumns] = useState([]);

  const options = {
    filterType: 'checkbox',
  };
  const timerRef = React.useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#f4f5f7",
        color: "#707275",
        fontWeight: 600,
        fontSize: ".875rem",
        textAlign: "left"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 10,
    },
}));

  const submit = () => {
    setLoading(true)

    const routeUpload = 'https://musicrec.apps.xplat.fis.com.vn/upload_image/?is_save=1'
    var formFile = new FormData();
    formFile.append("file", file[0]);
    axios.post(routeUpload, formFile,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
       // let results = res.data.results
        setData2(res.data.results)
        // let listKey = []
        // let listData = results.map((item, index) => {
        //   let tmp = []
        //   for (var key in item) {
        //     if (index == 0) {
        //       listKey.push(key)
        //     }
        //     tmp.push(item[key])
        //   }
        //   return tmp
        // })

        // console.log(listData)
        // setData(listData)
        // setColumns(listKey)
        // console.log(data2)
         setLoading(false)


        // console.log(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      })






  }


  return (
    <div >
      {/* <audio src={audioURL} controls />
      <br></br>
      <Button onClick={startRecording} disabled={isRecording}>
        start recording
      </Button>
      <Button onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </Button>
      <br></br> */}

      <Input type="file" id="formFile" name="formFile" onChange={(e) => setFile(e.target.files)} />

      <Button onClick={submit}>
        Kiểm tra
      </Button>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box >
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
              width: '50px',
              height: '50px',
              color: 'red'
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>

        </Box>
        {/* <Button onClick={handleClickLoading} sx={{ m: 2 }}>
          {loading ? 'Stop loading' : 'Loading'}
        </Button> */}
      </Box>


      {/* <MUIDataTable
        title={"Danh sách"}
        data={data}
        columns={columns}
        options={options}
      /> */}


      <TableContainer component={Paper} elevation={0} sx={{ borderColor: "#d5d6d7" }} variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ textTransform: "uppercase" }}>
            <StyledTableCell>stt</StyledTableCell>
              <StyledTableCell>ID Gốc</StyledTableCell>
              <StyledTableCell align="right">Bài kiểm tra</StyledTableCell>
              <StyledTableCell align="right">Bài hát gốc</StyledTableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography sx={{ color: "#707275" }}>
                    {index}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography sx={{ color: "#707275" }}>
                    {row.song_id}
                  </Typography>
                </TableCell>
                <TableCell align="left">{row.check_song_name}</TableCell>
                <TableCell align="left">{row.song_name}</TableCell>
                
              </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>





    </div>
  );
}

export default SongIdentifi;

