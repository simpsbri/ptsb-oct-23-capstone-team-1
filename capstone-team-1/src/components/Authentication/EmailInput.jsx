import React from 'react';
import { TextField } from '@mui/material';

const EmailInput = () => {
  return (
    <TextField
      size="medium"
      label="Email"
      required={true}
      fullWidth
      sx={{ padding: '5px' }}
    />
  );
};

export default EmailInput;
