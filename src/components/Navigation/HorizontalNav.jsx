import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './HorizontalNav.css';
import { AuthContext } from '../../../server/middleware/setAuth';
import { Badge } from '@mui/material';
const viteUrl = import.meta.env.VITE_WEB_ADDRESS;

function HorizontalNav() {
  const [showBadge, setShowBadge] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [oldBusinessesCount, setOldBusinessesCount] = useState(0);
  const { auth, logout } = useContext(AuthContext); // Get both auth and logout from AuthContext
  const businessId = auth?.user?.businessId || null;
  const userId = auth?.user?._id || null;

  // console.log(auth)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${viteUrl}businesses`);
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const oldBusinesses = businesses.filter((business) => {
        if (business.lastContactedDate === null) {
          return true;
        }
        const lastContactedDate = new Date(business.lastContactedDate);
        const thirtyDaysAgo = new Date();

        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastContactedDate < thirtyDaysAgo;
      });
      setOldBusinessesCount(oldBusinesses.length);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [businesses]);

  if (auth.user.isAdmin === 'Admin') {
    return (
      <nav style={{ width: '100%' }} className="mb-12">
        <ul style={{ display: 'flex' }}>
          <li>
            <Link to="/" className="navlink myClass">
              Home
            </Link>
          </li>
          <li>
            <Badge badgeContent={oldBusinessesCount} color="warning">
              <Link to="/admin/businesses" className="navlink myClass">
                Businesses
              </Link>
            </Badge>
          </li>
          <li>
            <Link to="/admin/users" className="navlink myClass">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/projects" className="navlink myClass">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout} className="navlink myClass">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  if (auth.user.isAdmin === 'Business') {
    return (
      <nav style={{ width: '100%' }} className="mb-12">
        <ul style={{ display: 'flex' }}>
          <li>
            <Link to="/" className="navlink myClass">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={`/business/businesses/${businessId}`}
              className="navlink myClass"
            >
              My Business
            </Link>
          </li>
          <li>
            <Link to={`/business/users/${userId}`} className="navlink myClass">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout} className="navlink myClass">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  if (auth.user.isAdmin === 'Capstone') {
    return (
      <nav style={{ width: '100%' }} className="mb-12">
        <ul style={{ display: 'flex' }}>
          <li>
            <Link to="/" className="navlink myClass">
              Home
            </Link>
          </li>
          <li>
            <Link to={`/capstone/users/${userId}`} className="navlink myClass">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="capstone/projects" className="navlink myClass">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout} className="navlink myClass">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default HorizontalNav;
