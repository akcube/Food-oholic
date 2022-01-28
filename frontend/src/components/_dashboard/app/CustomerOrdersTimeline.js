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

  const pickup = async () => {
    let res = await PickupOrder(context, item);
    if(res.success) message.success("Order picked up successfully");
    else message.error("Server error");
    setRefState(refstate^1);
  }

  const ProgressOrderStack = () => {
    return (
      <Stack direction="row">
        {
          (status === 'Ready for pickup')
          ? <Button disableRipple onClick={pickup} endIcon={<NavigateNextIcon/>}>
              Pickup Order
            </Button>
          : <></>
        }
      </Stack>
    );
  }

  return (
    <TimelineItem key={uuid()}>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (status === 'Placed' && 'info.main') ||
              (status === 'Accepted' && 'primary.main') ||
              (status === 'Cooking' && 'warning.main') ||
              (status === 'Ready for pickup' && 'success.main') ||
              'error.main'
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1">{getFood(food).name + " - " + fCurrency(cost)}</Typography>
        <Stack direction="row">
            {
              getFood(food).addons.map(addon => {
                return <Chip sx={{mt: 1, mr: 1}} label={addon.addon} size="small" variant="outlined" />
              })
            }
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
          {fDateTime(createdAt)}
        </Typography>
        <ProgressOrderStack></ProgressOrderStack>
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

export default function CustomerOrdersTimeline({ORDERSLIST, FOODLIST, setRefState, refstate}) {

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
