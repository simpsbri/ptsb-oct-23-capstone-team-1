import React from 'react'
import { Container } from '@mui/material'
import Registration from './Register'
import Login from './Login'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'

const Homepage = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          backgroundColor: 'white',
          width: '100%',
          margin: '0px 0 15px 0',
          borderRadius: 1,
          borderWidth: '1px',
        }}
      >
        <h1 className='text-xxl font-bold p-10'>Get in touch.</h1>
        <p>
          Are you interested in learning more about our capstone project
          process? Simply send us a message and our program manager will reach
          out.
        </p>
      </Box>
      <Box
        sx={{
          width: '100%', // adjust as needed
          height: '100%', // adjust as needed
          backgroundColor: 'lightblue', // adjust as needed
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label='lab API tabs example'
              sx={{ justifyContent: 'center' }}
            >
              <Tab
                label='Contact Us'
                value='1'
                sx={{
                  width: '100%',
                  margin: 'auto',
                  '@media (min-width: 600px)': {
                    width: '50%',
                  },
                }}
              />
              <Tab
                label='Login'
                value='2'
                sx={{
                  width: '100%',
                  margin: 'auto',
                  '@media (min-width: 600px)': {
                    width: '50%',
                  },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Registration />{' '}
          </TabPanel>
          <TabPanel value='2'>
            <Login />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}

export default Homepage
