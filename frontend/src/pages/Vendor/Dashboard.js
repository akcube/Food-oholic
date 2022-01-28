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
import { GetCustomer } from '../../services/customer.service';
import PieChart from '../../components/_dashboard/app/PieChartBatch';
import { Column } from '@ant-design/plots';
import AgeBarGraph from '../../components/_dashboard/app/AgeBarGraph';

const VendorDashboard = () => {

    const context = useContext(AuthContext);
    const [ORDERS, setOrders] = useState([]);
    const [PRODUCTS, setProducts] = useState([]);
    const [refstate, setRefState] = useState(0);
    const [realBatchData, setRealBatchData] = useState([0, 0, 0, 0, 0]);
    const [ageData, setAgeData] = useState([]);
    const batch_labels = ['UG1', 'UG2', 'UG3', 'UG4', 'UG5'];

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
        var CUSTOMERS = [];
        for(var o in orders){
            if(orders[o].status !== 'Completed') continue;
            let realcust = await GetCustomer(context, orders[o].customer);
            CUSTOMERS.push(realcust.data);
        }
        var newBatchData = {
            'UG1': 0,
            'UG2': 0,
            'UG3': 0,
            'UG4': 0,
            'UG5': 0
        };
        for(var c in CUSTOMERS)
            newBatchData[CUSTOMERS[c].batch_name]++;
        let arr = [0, 0, 0, 0, 0];
        arr[0] = newBatchData['UG1'];
        arr[1] = newBatchData['UG2'];
        arr[2] = newBatchData['UG3'];
        arr[3] = newBatchData['UG4'];
        arr[4] = newBatchData['UG5'];
        setRealBatchData(arr);

        var newAgeData = {};
        for(var c in CUSTOMERS){
            if(newAgeData[CUSTOMERS[c].age] === undefined) newAgeData[CUSTOMERS[c].age] = 1;
            else newAgeData[CUSTOMERS[c].age]++;
        }
        var keys = Object.keys(newAgeData);
        var vals = Object.values(newAgeData);
        let dataData = [];
        for(let i=0; i < keys.length; i++){
            dataData.push({
                age: Number(keys[i]),
                orders: Number(vals[i])
            });
        }
        setAgeData(dataData);
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
                        <AgeBarGraph data={ageData}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <PieChart CHART_DATA={realBatchData} LABELS={batch_labels}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt:2}}>
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