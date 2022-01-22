import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, Input, Button as AntButton, Checkbox as AntCheckbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const theme = createTheme();

export default class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.Copyright = this.Copyright.bind(this);
  }

  Copyright(args) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...args}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Food'oholic
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  render(){
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 12,
                mx: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ height: 65, width: 65, m: 3, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon sx={{ height: 35, width: 35 }} />
              </Avatar>
              <Typography component="h1" variant="h4">
                Sign in
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email", 
                        message: 'Please input a valid email',
                      },
                    ]}
                  >
                    <Input style={{ height: 55 }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password correctly',
                      },
                    ]}
                  >
                    <Input
                      style={{ height: 55 }}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <AntCheckbox>Remember me</AntCheckbox>
                    </Form.Item>
                  </Form.Item>

                  <Form.Item>
                    <AntButton style={{ width: 350, height: 50 }} type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </AntButton>
                  </Form.Item>
                </Form>
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <this.Copyright sx={{ mt: 5 }} />s
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}