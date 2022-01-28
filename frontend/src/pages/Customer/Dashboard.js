// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import useAsyncEffect from "use-async-effect";
// components
import Page from '../../components/Page';
import Wallet from '../../components/_dashboard/app/Wallet';
import { AuthContext, useAuth } from '../../services/authContext';
import { useContext, useState } from 'react';
import { GetOrders } from '../../services/order.service';
import CustomerOrdersTimeline from '../../components/_dashboard/app/CustomerOrdersTimeline';
import { GetAllProducts } from '../../services/food.service';
import CustomerHistoryTimeline from '../../components/_dashboard/app/CustomerHistoryTimeline';

const CustomerDashboard = () => {

    const context = useContext(AuthContext);
    const [ORDERSLIST, setOrders] = useState([]);
    const [PRODUCTS, setProducts] = useState([]);
    const [refstate, setRefState] = useState(0);

    useAsyncEffect(async () => {
        let res = await GetAllProducts(context);
        console.log(res);
        setProducts(res);
        let o = await GetOrders(context, {customer: context.data.user.type_id});
        setOrders(o.data);
    }, [refstate]);

    const OngoingOrderStates = ['Placed', 'Accepted', 'Cooking', 'Ready for pickup']
    const FinishedOrderStates = ['Completed', 'Rejected']

    return (
        <Page title="Dashboard | Food'oholic">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                <Typography variant="h4">{"Hi, Welcome back!"}</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Wallet/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={1}>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CustomerOrdersTimeline ORDERSLIST={ORDERSLIST.filter((order) => {
                            return OngoingOrderStates.includes(order.status);
                        })} 
                        FOODLIST={PRODUCTS} setRefState={setRefState} refstate={refstate}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CustomerHistoryTimeline ORDERSLIST={ORDERSLIST.filter((order) => {
                            return FinishedOrderStates.includes(order.status);
                        })} 
                        FOODLIST={PRODUCTS} setRefState={setRefState} refstate={refstate}/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default CustomerDashboard;