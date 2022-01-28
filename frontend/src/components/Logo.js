import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src="https://media.discordapp.net/attachments/293865248962772992/935521173515690054/unknown.png" sx={{ width: '100%', height: 80, ...sx }} />;
}
