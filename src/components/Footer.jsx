import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://dpz.vn">
        DPZ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        

      }}
    >
      <CssBaseline />
      <Container component="main"  >
      <Typography variant="h2" component="h1" gutterBottom>
          Gioi thieu abc
        </Typography>

        
        <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>
        <Grid item xs={3} sm={4} md={3}>
          adadasdasd
        </Grid>
        <Grid item xs={3} sm={4} md={3}>
          adadasdasd
        </Grid>
        <Grid item xs={3} sm={4} md={3}>
          adadasdasd
        </Grid>
        <Grid item xs={3} sm={4} md={3}>
          adadasdasd
        </Grid>

      </Grid>
        
      
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container>

          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;