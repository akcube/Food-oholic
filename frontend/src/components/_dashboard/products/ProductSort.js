import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Button, MenuItem, Typography } from '@mui/material';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'ratingDSC', label: 'Rating: High-Low' },
  { value: 'ratingASC', label: 'Rating: Low-High' },
  { value: 'priceDSC', label: 'Price: High-Low' },
  { value: 'priceASC', label: 'Price: Low-High' }
];

export default function ShopProductSort({sortingOption, setSortingOption}) {
  const [open, setOpen] = useState(null);

  const menuClicked = (item) => {
    setSortingOption(item.key);
  }

  const getLabel = value => {
    for(var v in SORT_BY_OPTIONS){
      if(SORT_BY_OPTIONS[v].value == value) return SORT_BY_OPTIONS[v].label;
    }
  }

  const menu = (
    <Menu selectedKeys={[getLabel(sortingOption)]} onClick={menuClicked}>
        {SORT_BY_OPTIONS.map((option) => (
          <Menu.Item size='large' key={getLabel(option.value)}>
            {option.label}
          </Menu.Item>
        ))}
      </Menu>
  );

  return (
    <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <Typography component="span" variant="subtitle2" sx={{ color: '#00AB55' }}>
            {getLabel(sortingOption)}
          </Typography> <DownOutlined />
          </a>
        </Dropdown>      
    </>
  );
}
