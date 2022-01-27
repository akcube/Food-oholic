import { Icon } from '@iconify/react';
import walletIcon from '@iconify/icons-fa-solid/wallet';
// material
import { alpha, styled } from '@mui/material/styles';
import { Button, Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import useAsyncEffect from "use-async-effect"
import { addToWallet } from '../../../services/user.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../services/authContext';
import { Form, Input, message } from 'antd';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { ModalStyle } from '../../styles/ModalStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function Wallet() {

  const [form] = Form.useForm()

  const [wallet, setWallet] = useState(0);
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useAsyncEffect(async () => {
    let res = await addToWallet(authContext, 0);
    setWallet(res.amount);
  }, []);

  const addMoney = async (amount) => {
    let res = await addToWallet(authContext, Number(amount));
    if(res.success){
      message.success("Sucessfully updated wallet")
      setWallet(res.amount);
    }
    else message.error(res.message);
  }

  const onFinish = (res) => {
    handleClose();
    addMoney(res.amount);
  }

  return (
    <>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        // sx = {{width: 400}}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...ModalStyle, width: 400 }}>
          <h2 id="child-modal-title">Enter amount to add</h2>
          <Form form={form} name="wallet-data" onFinish={onFinish}>
            <Form.Item style={{width: '100%', marginRight: 10}} name='amount'
              rules={[
                {
                  required: true,
                  pattern: '^[0-9]+$',
                  message: 'Please enter a valid amount in rupees'
                },
              ]}
            >
              <Input placeholder="Amount in rupees" prefix={<CurrencyRupeeIcon style={{marginRight: 8, height: 45}} className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item>
              <Button onClick={()=>{form.submit()}}> Add money </Button>
            </Form.Item>
          </Form>
        </Box>
      </Modal>
      <RootStyle>
        <IconWrapperStyle>
          <Icon icon={walletIcon} width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">{"Rs. " + fShortenNumber(wallet)}</Typography>
        <Button variant='outlined' color='secondary' startIcon={<AttachMoneyIcon/>} sx={{marginTop: 2}} onClick={handleOpen}>
          Add cash
        </Button>
      </RootStyle>
    </>
  );
}
