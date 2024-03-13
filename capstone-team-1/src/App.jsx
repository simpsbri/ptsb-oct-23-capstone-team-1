import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import JobList from './components/ProjectList/ProjectList'
// import data_jobs from './data/joblist.json'
import BusinessList from "./components/BusinessList/BusinessList";
import businessList from "./data/businessList.json";
import UserList from "./components/User/UserList";
import userList from "./data/userList.json";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState([]);

  // Load business data
  useEffect(() => {
    setBusinesses(businessList);
  }, []); // Don't forget the dependency array to prevent infinite loops

  // Load user data
  useEffect(() => {
    setUsers(userList);
  }, []);

  // Filter function for businesses and users (update as needed for each dataset)
  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level]; // Adjust these as needed for your filter tags

    return tags.some((tag) => filters.includes(tag));
  };

  const filteredBusinesses = businesses.filter(filterFunc);
  const filteredUsers = users.filter(filterFunc); // You might need a different filter function for users

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto">
        {/* Here you can implement a tab or button system to toggle between showing businesses and users */}
      </div>

      {/* Optionally render BusinessList or UserList based on some condition or user interaction */}
      {/* <BusinessList filteredBusinesses={filteredBusinesses} /> */}
      <UserList filteredUsers={filteredUsers} />

      {/* Here you can uncomment and use the JobList when you have that data ready */}
      {/* <JobList filteredJobs={filteredJobs} /> */}

      <Footer />
    </div>
  );
}

export default App;
