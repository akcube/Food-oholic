import PropTypes from 'prop-types';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import ColorPreview from "../../ColorPreview"
import { useContext, useState } from 'react';
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
import { Rating } from '@mui/material';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

VendorProductCard.propTypes = {
  product: PropTypes.object
};

export default function VendorProductCard({ product }) {
  const {name, price, isVeg, image, addons, tags, vendor, rating} = product;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [imagedata, setImageData] = useState(product.image);
  const [typeid] = useState(useAuth().data.user.type_id);
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

  const deleteItem = async () => {
    await DeleteProduct(context, {vendor: vendor, name: name});
    window.location.reload();
  }

  const onFinish = async (values) => {
    values.image = imagedata;
    values.vendor = typeid;
    let res = await UpdateProduct(context, values);
    if(res.success) message.success("Product updated successfully");
    else message.error("Something went wrong. Try again.")
    window.location.reload();
    handleClose();
  }

  const editItem = () => {
    handleOpen();
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
        <h1 style={{marginTop: 30, marginBottom: 30}} id="child-modal-title">Edit item: {name}</h1>
        <Form form={form} name="product-data" onFinish={onFinish}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
          }}>
          <Form.Item initialValue={name} style={{width: '100%', marginRight: 10}} name='name'
            rules={[
              {
                required: true,
                message: 'Please enter a name'
              },
            ]}
          >
            <Input placeholder="Name of product" prefix={<EmojiFoodBeverageIcon style={{marginRight: 8, height: 45}} className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item initialValue={price} style={{width: '100%', marginLeft: 10}} name='price'
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
          </Box>
          <Form.Item name='isVeg' valuePropName="checked" initialValue={isVeg}>
            <Checkbox style={{fontSize: 17, color: '#00AB55', marginLeft: 5}} size='large'> Vegetarian </Checkbox>
          </Form.Item>
          <Form.List name="addons" initialValue={addons}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 1 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'addon']}
                      rules={[{ required: true, message: 'Enter name of addon' }]}
                    >
                      <Input size='large' placeholder="Addon name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      rules={[{ required: true, pattern: '^[0-9]+$', message: 'Enter valid price' }]}
                    >
                      <Input size='large' placeholder="Addon price in rupees" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} startIcon={<PlusOutlined/>}>
                    Add Addon
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="tags" initialValue={tags}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 1 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'tag']}
                      rules={[{ required: true, message: 'Enter tag name' }]}
                    >
                      <Input size='large' placeholder="Tag" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} startIcon={<PlusOutlined/>}>
                    Add Tag
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          
          <Dragger style={{marginBottom: 20}} maxCount={1} accept='.jpg, .jpeg, .png, .jfif, .pjp, .pjpeg'
            showUploadList
            beforeUpload={file => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = e => {
                  setImageData(e.originalTarget.result);
              };
              return false;
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{color: '#00AB55'}}/>
            </p>
            <p className="ant-upload-text">Add an image to attract more attention!</p>
            <p className="ant-upload-hint">Click or drag file to this area to upload</p>
          </Dragger>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
          }}>
            <Form.Item>
              <Button variant='contained' sx={{mr:1}} onClick={()=>{form.submit()}}> Update Item </Button>
            </Form.Item>
            <Form.Item>
              <Button variant='contained' sx={{ml:1}} color='error' onClick={deleteItem}> Delete Item </Button>
            </Form.Item>
          </Box>
        </Form>
      </Box>
    </Modal>
    <Link onClick={editItem}>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ProductImgStyle src={image} />
        </Box>

        <Stack spacing={2} sx={{ p: 2 }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography variant="h5" noWrap>
                {name}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={[(isVeg ? "#237d3b" : "#7d1919")]} />
            <Rating disabled name="half-rating" defaultValue={ratingValue} precision={0.5}/>
            <Typography variant="h6">
              {fCurrency(price)}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Link>
    </>
  );
}
