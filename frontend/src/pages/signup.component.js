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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, Input, TimePicker, Button } from 'antd';
import { PhoneOutlined , UserOutlined, LockOutlined, ShopOutlined } from '@ant-design/icons';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Select } from 'antd';
import Paper from '@mui/material/Paper';
import { registerUser } from '../services/user.service';
import { AuthContext } from '../services/authContext';
import { useNavigate } from 'react-router';

const theme = createTheme();

class SignUpPage extends React.Component {

  constructor(props){
    super(props);
    this.Copyright = this.Copyright.bind(this);
    this.TabPanel = this.TabPanel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.state = { user_type : 0 };
  }

  Copyright(args) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...args}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Food'oholic
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  handleChange = (event, newValue) => {
    this.setState({ user_type : 1-this.state.user_type });
  };

  static contextType = AuthContext;
  onFinish = async (user) => {
    let payload = {...user, user_type: this.state.user_type};
    console.log(payload);
    await registerUser({...user, user_type: this.state.user_type}, this.context);
    if(this.context.isAuthenticated()) this.props.navigate("/");
    else alert("Registration failed");
  }

  TabPanel = () => {

    return (
      (this.state.user_type === 0) 
      ? 
      <Box sx={{mt : 3, display: 'flex', flexDirection: 'row', height: 55}}>
        <Form.Item style={{width: '100%', marginRight: 10}} name='age'
          rules={[
            {
              required: true,
              pattern: '^[0-9]+$',
              message: 'Please enter a valid age'
            },
          ]}
        >
          <Input size='large' placeholder="Age" prefix={<UserOutlined style={{marginRight: 8}} className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item style={{width: '100%', height: 55, marginLeft: 10}} name='batch_name'
          rules={[
            {
              required: true,
              message: 'Please select your batch',
            }
          ]}
        >
          <Select style={{width: '100%', height: '100%'}} size='large' placeholder="Please select your batch">
            <Select.Option value="UG1">UG1</Select.Option>
            <Select.Option value="UG2">UG2</Select.Option>
            <Select.Option value="UG3">UG3</Select.Option>
            <Select.Option value="UG4">UG4</Select.Option>
            <Select.Option value="UG5">UG5</Select.Option>
          </Select>
        </Form.Item>
      </Box> 
      :
      <Box sx={{mt:3}}>
        <Form.Item style={{width: '100%'}} name='shop_name'
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Enter your stall / shop name'
            },
          ]}
        >
          <Input style={{height: 55}} placeholder="Stall / shop name" prefix={<ShopOutlined style={{marginRight: 8}} className="site-form-item-icon" />}/>
        </Form.Item>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <Form.Item name="open_time" style={{width: '100%', marginRight: 10}}
            rules={[
              {
                required: true,
                message: 'Enter valid shop start time',
              }
            ]}
          >
            <TimePicker style={{height:55, width: '100%'}} placeholder='Start time'/>
          </Form.Item>
          <Form.Item name="close_time" style={{width: '100%', marginLeft: 10}}
            rules={[
              {
                required: true,
                message: 'Enter valid shop close time',
              }
            ]}
          >
            <TimePicker style={{height:55, width: '100%'}} placeholder='Close time'/>
          </Form.Item>
        </Box>
      </Box>
    );
  }

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
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar style={{width: 75, height: 75, marginBottom: 15}} sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon style={{width: 45, height: 45}}/>
            </Avatar>
            <Typography component="h1" variant="h3">
              Sign up
            </Typography>
            <Box sx={{ mt: 6, alignItems: 'center'}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs style={{width: 600}} value={this.state.user_type} onChange={this.handleChange}>
                  <Tab label="Student / Customer" id={"0"}/>
                  <Tab label="Vendor"id={"1"}/>
                </Tabs>
              </Box>
              <Box sx={{mt : 3}}>
                <Form name="user-data" onFinish={this.onFinish}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                  }}>
                    <Form.Item style={{width: '100%', marginRight: 10}} name='first_name'
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please enter your first name'
                        },
                      ]}
                    >
                      <Input style={{height: 55}} placeholder="First Name" prefix={<UserOutlined style={{marginRight: 8}} className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item style={{width: '100%', marginLeft: 10}} name='last_name'
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please enter your last name'
                        },
                      ]}
                    >
                      <Input style={{height: 55}} placeholder="Last Name" prefix={<UserOutlined style={{marginRight: 8}} className="site-form-item-icon" />}/>
                    </Form.Item>
                  </Box>
                    <Form.Item style={{width: '100%'}} name='contact'
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          pattern: '^[0-9]+$',
                          message: 'Please enter your contact number'
                        },
                      ]}
                    >
                      <Input style={{height: 55}} placeholder="Phone number" prefix={<PhoneOutlined style={{marginRight: 8}} className="site-form-item-icon" />}/>
                    </Form.Item>
                    <Form.Item style={{width: '100%'}} name='email'
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          type: 'email',
                          message: 'Please enter a valid email address'
                        },
                      ]}
                    >
                      <Input style={{height: 55}} placeholder="Email" prefix={<EmailOutlinedIcon sx={{padding: 0.3, mr: 1}} className="site-form-item-icon" />}/>
                    </Form.Item>
                    <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                      <Form.Item style={{width: '100%', marginRight: 10}} name='password'
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your password carefully'
                          },
                        ]}
                      >
                      <Input style={{height: 55}} placeholder="Password" type="password" prefix={<LockOutlined style={{marginRight: 8}} className="site-form-item-icon" />}/>
                      </Form.Item>
                  </Box>
                  <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
                    <this.TabPanel/>
                  </Box>
                  <Form.Item>
                    <Button style={{ width: '100%', height: 50 }} type="primary" htmlType="submit" className="login-form-button">
                      Register
                    </Button>
                  </Form.Item>
                </Form>
              </Box>
              <Grid container sx={{mt: 1}}>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default function(props) {
  const navigation = useNavigate();
  return <SignUpPage {...props} navigate={navigation} />;
}