import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
import { Column } from '@ant-design/plots';

// ----------------------------------------------------------------------


export default function AgeBarGraph({data}) {

  const config = {
    data,
    xField: 'age',
    yField: 'orders',
    label: {
      position: 'Top',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },  
  };

  return (
    <Card>
      <CardHeader title="Completed orders by age" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr" >
        <Column {...config} />
      </Box>
    </Card>
  );
}
