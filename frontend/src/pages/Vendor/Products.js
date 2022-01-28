import { useContext, useEffect, useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components               
import Page from '../../components/Page';
import VendorProductCard from '../../components/_dashboard/products/VendorProductCard';
import { Grid, Box, Button } from '@mui/material';
import { Form, Input, message, Checkbox, Space, Upload} from 'antd';
import { ModalStyle } from '../../components/styles/ModalStyle';
//
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { AuthContext, useAuth } from '../..//services/authContext';
import { AddProduct, GetProductsByVendor } from '../../services/food.service';
import useAsyncEffect from "use-async-effect"

const { Dragger } = Upload;

// ----------------------------------------------------------------------

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const VendorProducts = () => {

  const [form] = Form.useForm()
  const [open, setOpen] = useState(false);
  const [imagedata, setImageData] = useState('no-image');
  const [typeid] = useState(useAuth().data.user.type_id);
  const [PRODUCTS, setProducts] = useState([]);
  const context = useContext(AuthContext);
  
  useAsyncEffect(async () => {
    let res = await GetProductsByVendor(context, context.data.user.type_id);
    console.log(res);
    for (var p of res){
      p.price = p.price.toString();
      for (var a of p.addons){
        a.price = a.price.toString();
      }
    }
    setProducts(res);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    form.resetFields();
    setImageData('no-image');
    setOpen(false);
  };
  
  const ProductList = ({ products, ...other }) => {
    return (
      <Grid container spacing={3} {...other}>
        {products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={3}>
            <VendorProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }

  const forceUpdate = useForceUpdate();

  const onFinish = async (values) => {
    values.image = imagedata;
    values.vendor = typeid;
    let res = await AddProduct(context, values);
    if(res.success) message.success("Product added successfully");
    else message.error("Something went wrong. Try again.")
    window.location.reload();
    forceUpdate();
    handleClose();
  }

  const AddModal = () => {
    return (
    <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...ModalStyle, width: 1000 }}>
          <h1 style={{marginTop: 30, marginBottom: 30}} id="child-modal-title">Add product</h1>
          <Form form={form} name="product-data" onFinish={onFinish}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
            }}>
            <Form.Item style={{width: '100%', marginRight: 10}} name='name'
              rules={[
                {
                  required: true,
                  message: 'Please enter a name'
                },
              ]}
            >
              <Input placeholder="Name of product" prefix={<EmojiFoodBeverageIcon style={{marginRight: 8, height: 45}} className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item style={{width: '100%', marginLeft: 10}} name='price'
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
            <Form.Item name='isVeg' valuePropName="checked" initialValue={false}>
              <Checkbox style={{fontSize: 17, color: '#00AB55', marginLeft: 5}} size='large'> Vegetarian </Checkbox>
            </Form.Item>
            <Form.List name="addons">
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
            <Form.List name="tags">
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
            <Form.Item>
              <Button variant='contained' onClick={()=>{form.submit()}}> Add Item to Shop </Button>
            </Form.Item>
          </Form>
        </Box>
      </Modal>
    );
  }

  return (
    <>
    <AddModal/>
    <Page title="Dashboard: Food items">
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          My items
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Fab color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon />
            </Fab>
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
    </>
  );
}

export default VendorProducts;