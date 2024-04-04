import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './HorizontalNav.css';
import { AuthContext } from '../../../server/middleware/setAuth';
import { Badge } from '@mui/material';

function HorizontalNav() {
  const [showBadge, setShowBadge] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [oldBusinessesCount, setOldBusinessesCount] = useState(0);
  const { auth } = useContext(AuthContext);
  const businessId = auth?.user?.businessId || null;
  const userId = auth?.user?._id || null;
  console.log(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/businesses');
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
            <Link to="/" className="navlink">
              Home
            </Link>
          </li>
          <li>
            <Badge badgeContent={oldBusinessesCount} color="warning">
              <Link to="/admin/businesses" className="navlink">
                Businesses
              </Link>
            </Badge>
          </li>
          <li>
            <Link to="/admin/users" className="navlink">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/projects" className="navlink">
              Projects
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
            <Link to="/" className="navlink">
              Home
            </Link>
          </li>
          <li>
            <Link to={`/business/businesses/${businessId}`} className="navlink">
              My Business
            </Link>
          </li>
          <li>
            <Link to={`/business/users/${userId}`} className="navlink">
              My Profile
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
            <Link to="/" className="navlink">
              Home
            </Link>
          </li>
          <li>
            <Link to={`/capstone/users/${userId}`} className="navlink">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="capstone/projects" className="navlink">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default HorizontalNav;
