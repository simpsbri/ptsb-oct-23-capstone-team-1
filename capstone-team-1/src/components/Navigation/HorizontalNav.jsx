import { Link } from 'react-router-dom'
import './HorizontalNav.css'

function HorizontalNav() {
  return (
    <nav style={{ width: '100%' }} className='mb-12'>
      <ul style={{ display: 'flex' }}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/businesses'>Businesses</Link>
        </li>
        <li>
          <Link to='/users'>All Users</Link>
        </li>
        <li>
          <Link to='/projects'>Projects</Link>
        </li>
      </ul>
    </nav>
  )
}

export default HorizontalNav
