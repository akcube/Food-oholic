import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent, Stack, Chip, Button, IconButton } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DeleteIcon from '@mui/icons-material/Delete';
import { PickupOrder } from '../../../services/order.service';
import { useContext } from 'react';
import { AuthContext } from '../../../services/authContext';
import { message } from 'antd'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function OrderItem({ item, FOODLIST, setRefState, refstate}) {
  const { createdAt, status, food, quantity, addons, cost, customer } = item;
  const context = useContext(AuthContext);

  const getFood = id => {
    for(var v in FOODLIST)
      if(FOODLIST[v]._id == id) return FOODLIST[v];
    return {name: "Doesn't exist", addons: [], price: 0, tags: []};
  }

  return (
    <TimelineItem key={uuid()}>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (status === 'Completed' && 'primary.main') ||
              (status === 'Rejected' && 'error.main') ||
              'error.main'
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1">{getFood(food).name + " - " + fCurrency(cost)}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
          {fDateTime(createdAt)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function CustomerHistoryTimeline({ORDERSLIST, FOODLIST, setRefState, refstate}) {

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Orders in the kitchen" />
      <CardContent>
        <Timeline>
          {ORDERSLIST.map(order => (
            <OrderItem key={uuid()} item={order} FOODLIST={FOODLIST} setRefState={setRefState} refstate={refstate}/>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
