// material
import { Container, Stack, Typography, Box } from '@mui/material';
// components
import Page from '../../components/Page';
import {Form, Input, Button, TimePicker, message} from 'antd';
import { PhoneOutlined , UserOutlined, LockOutlined, ShopOutlined } from '@ant-design/icons';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useContext, useState } from 'react';
import { AuthContext } from '../../services/authContext';
import { GetUser, UpdateUser } from '../../services/user.service';
import { GetAllVendors } from '../../services/vendor.service';
import useAsyncEffect from "use-async-effect"
import moment from "moment";

export default function VendorProfile() {

    const context = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [vendor, setVendor] = useState({business_hours: {}});

    const getVendor = (vs) => {
        for(var v in vs){
            if(vs[v]._id === context.data.user.type_id) return vs[v];
        }
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useAsyncEffect(async ()=>{
        let u = await GetUser(context);
        if(u.success) setUser(u.data);
        let vs = await GetAllVendors(context);
        let v = getVendor(vs);
        console.log(v);
        setVendor(v);
    }, []);

    const onFinish = async (values) => {
        let res = await UpdateUser(context, {...values, user_type: user.user_type});
        if(res.success) message.success("Successful. Please login again.");
        else message.error("Server error");
        await(sleep(1000));
        context.logout();
    }

    const EditForm = () => {
        return(
            <Form name="user-data" onFinish={onFinish}>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <Form.Item style={{width: '100%', marginRight: 10}} name='first_name' initialValue={user.first_name}
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
                <Form.Item style={{width: '100%', marginLeft: 10}} name='last_name' initialValue={user.last_name}
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
                <Form.Item style={{width: '100%'}} name='contact' initialValue={user.contact}
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
                <Form.Item style={{width: '100%'}} name='email' initialValue={user.email}
                    rules={[
                    {
                        required: true,
                        whitespace: true,
                        type: 'email',
                        message: 'Please enter a valid email address'
                    },
                    ]}
                >
                    <Input disabled style={{height: 55}} placeholder="Email" prefix={<EmailOutlinedIcon sx={{padding: 0.3, mr: 1}} className="site-form-item-icon" />}/>
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
                    <Input style={{height: 55}} placeholder="New Password" type="password" prefix={<LockOutlined style={{marginRight: 8}} className="site-form-item-icon" />}/>
                    </Form.Item>
                </Box>
                <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{mt:3}}>
                    <Form.Item style={{width: '100%'}} name='shop_name' initialValue={vendor.shop_name}
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
                    <Form.Item name="open_time" style={{width: '100%', marginRight: 10}} initialValue={moment(vendor.business_hours.open)}
                        rules={[
                        {
                            required: true,
                            message: 'Enter valid shop start time',
                        }
                        ]}
                    >
                        <TimePicker style={{height:55, width: '100%'}} placeholder='Start time'/>
                    </Form.Item>
                    <Form.Item name="close_time" style={{width: '100%', marginLeft: 10}} initialValue={moment(vendor.business_hours.close)}
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
                </Box>
                <Form.Item>
                <Button style={{ width: '100%', height: 50 }} type="primary" htmlType="submit" className="login-form-button">
                    Save Changes
                </Button>
                </Form.Item>
            </Form>
        );
    }

    return (
      <Page title="Dashboard: Profile">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
          </Stack>

          <EditForm />

        </Container>
      </Page>
    );
  }