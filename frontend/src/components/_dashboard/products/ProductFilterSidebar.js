import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import { fCurrency } from '../../../utils/formatNumber';
// material
import {
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
//
import Scrollbar from '../../Scrollbar';
import ColorManyPicker from '../../ColorManyPicker';
import { Form, Input, message, Checkbox, Slider, Select} from 'antd';
import { useState } from 'react';

// ----------------------------------------------------------------------

export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' }
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];
const { Option } = Select;
// ----------------------------------------------------------------------

export default function ShopFilterSidebar({
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,  
  form,
  filtersSet,
  VENDORS,
  TAGS
}) {

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500);

  const vendorsCBox = VENDORS.map((vendor) => {
    return ({
      label: vendor.shop_name,
      value: vendor.shop_name
    })
  });

  const tagsSBox = TAGS.map(tag => {
    return ({
      label: tag,
      value: tag
    })
  });

  const ftypeCBox = [
    {label: 'Vegetarian', value: 'Vegetarian'},
    {label: 'Non-Vegetarian', value: 'Non-Vegetarian'}
  ]

  const rangeUpdate = (value) => {
    setMax(value[1]);
    setMin(value[0]);
  }

  return (
    <>
      <Button
        disableRipple
        color="primary"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="h6" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>
            <Divider />

            <Form form={form} name="filter-data" onFinish={filtersSet}>

              <Typography style={{marginLeft: 20, marginTop: 20}} variant='h5'>Vendors</Typography>
              <Form.Item name='allowed_vendors' style={{marginBottom: 10}}>
                <Checkbox.Group options={vendorsCBox} style={{marginLeft: 15, marginRight: 20, padding: 5, fontSize: 20}}/>
              </Form.Item>
              <Typography style={{marginLeft: 20, marginTop: 0}} variant='h5'>Food type</Typography>
              <Form.Item name='food_type' style={{marginBottom: 10}}>
                <Checkbox.Group options={ftypeCBox} style={{marginLeft: 15, marginRight: 20, padding: 5, fontSize: 20}}/>
              </Form.Item>
              <Typography style={{marginLeft: 20, marginTop: 0}} variant='h5'>Price</Typography>
              <Form.Item initialValue={[0, 500]} name='price_range' style={{marginBottom: 5}}>
                <Slider style={{marginRight: 20, marginLeft: 25, marginTop: 20}} min={0} max={500} range step={1} onChange={rangeUpdate} tooltipVisible/>
              </Form.Item>
              <Typography style={{marginLeft: 20}} variant='subtitle2'>{ fCurrency(min) + "  -  " + fCurrency(max) }</Typography>
              <Typography style={{marginLeft: 20, marginTop: 20}} variant='h5'>Tags</Typography>
              <Form.Item name='food_tags' style={{marginBottom: 10, marginRight: 40}}>
                <Checkbox.Group style={{marginLeft: 15, marginRight: 20, padding: 5, fontSize: 20}} options={tagsSBox}
                />
              </Form.Item>
              <Form.Item>
                <Button variant='contained' style={{marginLeft: 20}} onClick={() => {form.submit()}}>Apply Filters</Button>
              </Form.Item>
            </Form>

          </Drawer>
    </>
  );
}
