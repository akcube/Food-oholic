// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import AppItemOrders from '../../components/_dashboard/app/AppItemOrders';
import useAsyncEffect from "use-async-effect";
import { GetOrders } from '../../services/order.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../../services/authContext';
import { GetProductsByVendor } from '../../services/food.service';
import CurrentOrdersTimeline from '../../components/_dashboard/app/CurrentOrdersTimeline';
import PickupOrdersTimeline from '../../components/_dashboard/app/PickupOrdersTimeline';
import FinishedOrdersTimeline from '../../components/_dashboard/app/FinishedOrdersTimeline';

const VendorDashboard = () => {

    const context = useContext(AuthContext);
    const [ORDERS, setOrders] = useState([]);
    const [PRODUCTS, setProducts] = useState([]);
    const [refstate, setRefState] = useState(0);

    useAsyncEffect(async () => {
        let res = await GetProductsByVendor(context, context.data.user.type_id);
        setProducts(res);

        let Items = await GetProductsByVendor(context, context.data.user.type_id);
        var orders = [];
        for(var i in Items){
            let o = await GetOrders(context, {food: Items[i]._id})
            orders = orders.concat(o.data);
        }
        setOrders(orders);
    }, [refstate]);

    const MainOrderTypes = ['Placed', 'Accepted', 'Cooking'];
    const FinishedOrderTypes = ['Completed', 'Rejected'];

    return (
        <Page title="Dashboard | Food'oholic">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                <Typography variant="h4">{"Hi, Welcome back!"}</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppItemOrders TOTAL={ORDERS.length}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CurrentOrdersTimeline ORDERSLIST={ORDERS.filter(order => {
                            return MainOrderTypes.includes(order.status)
                        })} 
                            FOODLIST={PRODUCTS} setRefState={setRefState} refstate={refstate}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <PickupOrdersTimeline ORDERSLIST={ORDERS.filter(order => {
                            return order.status === 'Ready for pickup'
                        })} 
                            FOODLIST={PRODUCTS} setRefState={setRefState} refstate={refstate}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FinishedOrdersTimeline ORDERSLIST={ORDERS.filter(order => {
                            return FinishedOrderTypes.includes(order.status);
                        })} 
                            FOODLIST={PRODUCTS} setRefState={setRefState} refstate={refstate}/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default VendorDashboard;