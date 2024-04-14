import React, { useEffect, useState, useContext } from "react";
import BusinessCard from "./BusinessCard";
import axios from "axios";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

const BusinessList = ({ handleTagClick, latestMessage, backgroundColor }) => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [businessStatus, setBusinessStatus] = useState("");
  const [businessStatuses, setBusinessStatuses] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const viteUrl = import.meta.env.VITE_WEB_ADDRESS;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${viteUrl}businesses?page=${page}`);
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(businesses)) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);
  useEffect(() => {
    setPage(1);
  }, [businessStatus]);

  return (
    <>
      <div className="flex flex-col items-center mx-auto h-96 w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="text-center mx-auto" style={{ fontSize: "1.5rem" }}>
            Businesses
          </div>
        </div>
        <div className="flex justify-between w-full mb-4">
          <div className="flex ml-5">
            <button
              variant="contained"
              // color='inherit'
              className="bg-green-500 text-white addNewButton"
              onClick={() => navigate("createNewBusiness")}
            >
              <AddIcon />
            </button>
          </div>
          <div className="flex items-center mx-auto">
            <label
              htmlFor="statusFilter"
              className="block text-sm font-medium text-gray-700 pr-6 mr-4"
            >
              Last Contact Date:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-md shadow-sm text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="No Messages Yet">No Messages Yet</option>
              <option value="Active">Active</option>
              <option value="No Messages in 30 days">30 days old</option>
              <option value="No Messages in 60 days">60 days old</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="businessStatus"
              className="block text-sm font-medium text-gray-700 pr-6 mr-4"
            >
              Business Status:
            </label>
            <select
              id="businessStatus"
              value={businessStatus}
              onChange={(e) => setBusinessStatus(e.target.value)}
              className="p-2 border rounded-md shadow-sm w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mr-4"
              style={{ width: "50%" }}
            >
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Active">Active</option>
              <option value="UnderReview">UnderReview</option>
              <option value="Inactive">Inactive</option>
              <option value="Denied">Denied</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md shadow-sm w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mr-4"
            />
          </div>
          <div className="flex items-center mx-auto">
            <label
              htmlFor="perPage"
              className="block text-sm font-medium text-gray-700 pr-6 mr-4"
            >
              Show:
            </label>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={perPage}
                onChange={(event) => setPerPage(event.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex flex-col w-full px-4">
          {businesses
            .filter(
              (business) =>
                business.company_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) &&
                (statusFilter === "all" ||
                  businessStatuses[business._id] === statusFilter) &&
                (businessStatus === "" ||
                  business.businessStatus === businessStatus)
            )
            .sort((a, b) => a.company_name.localeCompare(b.company_name))
            .slice((page - 1) * perPage, page * perPage)
            .map((business) => (
              <BusinessCard
                key={business._id}
                business={business}
                updateStatus={(status) =>
                  setBusinessStatuses((prev) => ({
                    ...prev,
                    [business._id]: status,
                  }))
                }
              />
            ))}

          <Pagination
            count={Math.ceil(businesses.length / perPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{
              ".MuiPaginationItem-page": {
                color: "white",
              },
              ".MuiPaginationItem-previous": {
                color: "white",
              },
              ".MuiPaginationItem-next": {
                color: "white",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BusinessList;
