import React from "react";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from "react";


export const Finish = (props) => {
  const loading = props.loading
  //console.log(props.loading)
  const timerRef = React.useRef();

  useEffect(() => () => {
    clearTimeout(timerRef.current);
  },
    []);

  // const handleClickLoading = () => {
  //   props.setLoading((prevLoading) => !prevLoading);
  // };


  return (
    <div style={{ marginTop: "1rem" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
        <Box sx={{ height: 80 }}>
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
      {/* <ActionButtons {...props} /> */}
    </div>
  );
};
