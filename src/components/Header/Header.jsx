import Background from './Background'
import './Header.css'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  return (
    <header className='h-28 w-full bg-primary_dark_cyan display-flex align-items-center'>
      <Background />
      {location.pathname === '/' && (
        <div className='header-links'>
          <a
            href='https://workgapsolution.com/faqs'
            target='_blank'
            className='header-link'
          >
            FAQs
          </a>
          <a href='#link2' className='header-link'>
            SmartGig Series
          </a>
          <a href='#link3' className='header-link'>
            Sign In
          </a>
          <a
            href='https://calendly.com/workgapsolution/30min'
            target='_blank'
            className='form-button'
          >
            <button className='book-a-call-button'>Book a Call</button>
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
