import React from 'react';
import { TextField } from '@mui/material';

const EmailInput = ({ value, onChange }) => {
  return (
    <TextField
      size="medium"
      label="Email"
      required={true}
      fullWidth
      sx={{ padding: '5px' }}
      value={value}
      onChange={onChange}
      placeholder="Enter email"
    />
  );
};

export default EmailInput;
