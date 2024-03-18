import React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  return (
    <section className="p-10 bg-primary_dark_cyan flex flex-row">
      <div className="p-10 flex flex-col  h-screen">
        <h1 className="text-xl font-bold mb-4">Get in touch.</h1>
        {/* <div className="flex items-center justify-center w-1/2"> */}
        <p className="px-4">
          Are you interested in learning more about our capstone project
          process? Simply send us a message and our program manager will reach
          out.
        </p>
        {/* </div> */}
      </div>

      <div className="flex flex-col items-end px-4">
        <h1 className="text-xl font-bold mb-4 pr-4">Register</h1>
        <form>
          <Box className="p-6">
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Name"
            />
          </Box>
          {/* <label htmlFor="name" className="block mb-2">
            Name:
          </label> */}
          {/* <div className="flex items-center justify-end">
            <input
              className="p-2 border rounded-md"
              type="text"
              id="name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
          </div> */}

          {/* <label htmlFor="email" className="block mb-2">
            Email:
            {/* <span
            className={`ml-2 ${
              validName && user ? 'text-green-500' : 'hidden'
            }`}
          >
            <FontAwesomeIcon icon={faCheck} />
          </span> */}
          {/* <span
            className={`ml-2 ${
              (validName && user) || !user ? 'hidden' : 'text-red-500'
            }`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span> */}
          {/* </label> */}
          <Box className="p-6">
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Email"
            />
          </Box>
          <div className="flex items-center justify-center">
            <input
              className="p-2 border rounded-md"
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              // aria-invalid={validName ? 'false' : 'true'}
              // aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              // className="block p-2 border rounded mb-3"
            />
          </div>
          <label htmlFor="phone" className="block mb-2">
            Phone:
          </label>
          <div className="flex items-center justify-center ">
            <input
              className="p-2 border rounded-md"
              type="text"
              id="phone"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
          </div>
          {/* <p
          id="uidnote"
          className={
            userFocus && user && !validName ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p> */}

          <label htmlFor="password">
            Password:
            {/* <span className={validPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span> */}
          </label>
          <div className="flex items-center justify-center ">
            <input
              className="p-2 border rounded-md"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </div>
          {/* <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{' '}
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>{' '}
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p> */}

          <label htmlFor="confirm_pwd">
            Confirm Password:
            {/* <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span> */}
          </label>
          <div className="flex items-center justify-center ">
            <input
              className="p-2 border"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
          </div>
          {/* <p
          id="confirmnote"
          className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p> */}
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Project Details"
              variant="standard"
            />
          </Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                defaultValue="Hello World"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                id="outlined-read-only-input"
                label="Read Only"
                defaultValue="Hello World"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-search"
                label="Search field"
                type="search"
              />
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
              />
            </div>
          </Box>
        </form>
      </div>
    </section>
  );
};

export default Register;
