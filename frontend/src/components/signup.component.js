import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default class SignUpPage extends React.Component {

  constructor(props){
    super(props);
    this.Copyright = this.Copyright.bind(this);
  }

  Copyright(args) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...args}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar style={{width: 75, height: 75, marginBottom: 30}} sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon style={{width: 45, height: 45}}/>
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign up
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs style={{width: 1000}}value={0}>
                  <Tab label="Item One" value={0}/>
                  <Tab label="Item Two"value={1}/>
                </Tabs>
              </Box>
            </Box>
          </Box>
          <this.Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}