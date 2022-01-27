import PropTypes from 'prop-types';
// material
import { Box, Card, Link, Typography, Stack, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import ColorPreview from "../../ColorPreview"
import { useContext, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { AuthContext, useAuth } from '../../../services/authContext';
import Dragger from 'antd/lib/upload/Dragger';
import { Button } from '@mui/material';
import { Form, Input, message, Checkbox, Space} from 'antd';
import { ModalStyle } from '../../styles/ModalStyle';
import { DeleteProduct, UpdateProduct } from '../../../services/food.service';
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NumbersIcon from '@mui/icons-material/Numbers';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const FABstyle = {
  marginLeft: 210,
  marginTop: 65,
  bottom: 'auto',
  right: 'auto',
  position: 'fixed',
};


// ----------------------------------------------------------------------

CustomerProductCard.propTypes = {
  product: PropTypes.object
};

export default function CustomerProductCard({ product, vendors }) {
  const {name, price, isVeg, image, addons, tags, rating} = product;
  const vendor_id = product.vendor;
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false);
  const [imagedata, setImageData] = useState(product.image);
  const [typeid] = useState(useAuth().data.user.type_id);
  const [vendor, setVendor] = useState({});
  const context = useContext(AuthContext);
  const [ratingValue, setRatingValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRating = () => {
    if(rating.sum_rating == 0) setRatingValue(0);
    else setRatingValue(rating.sum_rating/rating.num_rating);
  }

  const getVendor = id => {
    for(var v in vendors){
      if(vendors[v]._id == id){
        setVendor(vendors[v]);
        break;
      }
    }
  }

  useEffect(() => {
    getVendor(vendor_id);
    getRating();
  }, []);

  const onFinish = async (values) => {
    
    handleClose();
  }

  const orderItem = () => {
    handleOpen();
  }

  const onFormDataChange = (changedFields, allFields) => {
    console.log(changedFields);
    console.log("All now");
    console.log(allFields);
  }

  return (

    <>
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...ModalStyle, width: 1000 }}>
        <h1 style={{marginTop: 30, marginBottom: 30}} id="child-modal-title">Order item: {name}</h1>
        <Form form={form} name="product-data" onFinish={onFinish} onFieldsChange={onFormDataChange}>
          <Typography variant='h4'>Quantity</Typography>
          <Form.Item name='quantity' style={{marginTop: 15}}
            rules={[
              {
                required: true,
                pattern: '^[0-9]+$',
                message: 'Please enter a positive integer'
              },
            ]}>
              <Input placeholder="Quantity" prefix={<NumbersIcon style={{marginRight: 8, height: 45}} className="site-form-item-icon" />} />
          </Form.Item>
          <Typography variant='h4'>Addons</Typography>
          <Form.Item name='addons'>
              {
                addons.map(({addon, price}) => {
                  return(
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        marginTop: 1,
                        flexDirection: 'row',
                    }}>
                      <Checkbox key={addon} style={{marginTop: 3}} size='large'> </Checkbox>
                      <Typography variant='h6' sx={{marginRight: 5}}>{addon}</Typography>
                      <Typography variant='subtitle2'>{fCurrency(price)}</Typography>
                    </Box>
                  );
                })  
              }
          </Form.Item>
            <Form.Item>
              <Button variant='contained' sx={{mr:1}} onClick={()=>{form.submit()}}> Update Item </Button>
            </Form.Item>
        </Form>
      </Box>
    </Modal>
    <Link onClick={orderItem}>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ProductImgStyle src={image} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}
        >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography noWrap variant="h6">
                {name}
            </Typography>
            <Rating readOnly name="half-rating" value={ratingValue} precision={0.5}/>
        </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={[(isVeg ? "#237d3b" : "#7d1919")]} />
            <Typography variant="subtitle1">
              {vendor.shop_name}
            </Typography>
            <Typography variant="h6">
              {fCurrency(price)}
            </Typography>
            <Fab color='secondary' style={FABstyle}>
              <ShoppingCartIcon/>
            </Fab>
          </Stack>
        </Stack>
      </Card>
    </Link>
    </>
  );
}
