import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import ColorPreview from "../../ColorPreview"
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, isVeg } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}
      >
        
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ColorPreview colors={[(isVeg ? "#237d3b" : "#7d1919")]} />
        <Typography variant="subtitle2">
            &nbsp;
            {"BBC"}
          </Typography>
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
