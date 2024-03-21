import { Link } from 'react-router-dom'
import './HorizontalNav.css'

function HorizontalNav() {
  return (
    <nav style={{ width: '100%' }} className='mb-12'>
      <ul style={{ display: 'flex' }}>
        <li>
          <Link to='/' className='navlink'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/businesses' className='navlink'>
            Businesses
          </Link>
        </li>
        <li>
          <Link to='/users' className='navlink'>
            Users
          </Link>
        </li>
        <li>
          <Link to='/projects' className='navlink'>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default HorizontalNav
