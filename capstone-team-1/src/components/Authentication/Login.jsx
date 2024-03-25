import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <section className="p-10 bg-primary_dark_cyan flex w-full flex-row ">
      <div>
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 0.5, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            className="p-2"
          >
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Email"
            />
          </Box>

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            className="p-2"
          >
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Password"
            />
          </Box>

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            className="p-2"
          >
            <Stack spacing={2} direction="row">
              <Button variant="contained">Submit</Button>
            </Stack>
          </Box>
        </form>
      </div>
    </section>
  );
};

export default Login;
