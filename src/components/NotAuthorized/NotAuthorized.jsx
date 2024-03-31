import React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function NotAuthorized() {
  return (
    <div>
      <Typography variant='h2' align='center' gutterBottom>
        403 - Not Authorized
      </Typography>
      <Typography variant='subtitle1' align='center' gutterBottom>
        You do not have permission to view this page.
      </Typography>
      <Box display='flex' justifyContent='center' m={1} p={1}>
        <Button variant='contained' color='primary' component={Link} to='/'>
          Return to Home
        </Button>
      </Box>
    </div>
  )
}

export default NotAuthorized
