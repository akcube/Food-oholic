// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../../components/Page';

const VendorDashboard = () => {
    return (
        <Page title="Dashboard | Food'oholic">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                <Typography variant="h4">{"Hi, Welcome back!"}</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                    </Grid>
                    <Grid item xs={12} sm={6} md={1}>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <h1> Orders </h1>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default VendorDashboard;