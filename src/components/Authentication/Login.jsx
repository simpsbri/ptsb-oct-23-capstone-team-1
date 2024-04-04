import React from 'react';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../server/middleware/setAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const { login } = useContext(AuthContext); // Destructure login from context
  const { login } = useContext(AuthContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      console.error('Please fill in all fields');
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/user/login',
        { email, password },
        config
      );
      login(data.token, data.role, data); // Pass the user's role as the second argument
      console.log(data); // Log the response data to the console

      // login(data.token, data.user.role, data.user); // Update context with the user's information

      localStorage.setItem('userInfo', JSON.stringify(data));
      // Handle the response here
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-10 bg-primary_dark_cyan flex w-full flex-row ">
      <div>
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={submitHandler}>
          <Box>
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box>
            <div
              style={
                {
                  // display: 'flex',
                  // justifyContent: 'center',
                  // padding: '4rem 0',
                }
              }
            >
              <PasswordInput
                // password={password}
                // setPassword={setPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Box>

          <Box
            component="div"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            className="p-2"
          >
            <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
      </div>
    </section>
  );
};

export default Login;
