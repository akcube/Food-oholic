// material
import { Box, Grid, Container, Typography, Button, Stack } from '@mui/material';
import { useState, useContext } from 'react';
// components
import Page from '../../components/Page';
import CustomerProductCard from '../../components/_dashboard/products/CustomerProductCard';
import { GetAllProducts } from '../../services/food.service';
import { AuthContext } from '../../services/authContext';
import useAsyncEffect from "use-async-effect";
import { GetAllVendors } from '../../services/vendor.service';


const CustomerProducts = () => {

    const [PRODUCTS, setProducts] = useState([]);
    const [VENDORS, setVendors] = useState([]);
    const context = useContext(AuthContext);

    useAsyncEffect(async () => {
        let res = await GetAllProducts(context);
        for (var p of res){
          p.price = p.price.toString();
          for (var a of p.addons){
            a.price = a.price.toString();
          }
        }
        let vendorsList = await GetAllVendors(context);
        console.log(vendorsList);
        setVendors(vendorsList);
        setProducts(res);
      }, []);

    const ProductList = ({ products, ...other }) => {
    return (
        <Grid container spacing={3} {...other}>
        {products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={3}>
            <CustomerProductCard product={product} vendors={VENDORS}/>
            </Grid>
        ))}
        </Grid>
        );
    }

    return (
        <>
        <Page title="Dashboard: Food items">
          <Container>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Available items
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                
              </Stack>
            </Stack>
    
            <ProductList products={PRODUCTS} />
          </Container>
        </Page>
        </>
      );
}

export default CustomerProducts;