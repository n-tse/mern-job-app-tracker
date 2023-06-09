import React from 'react';
import './css/SearchBar.css';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ searchableJobsList, setJobsList, setCurrentPage }) => {
  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchResults = searchableJobsList.filter((entry) => {
      return (
        entry.title.toLowerCase().includes(searchTerm) || entry.company.toLowerCase().includes(searchTerm) || entry.url.toLowerCase().includes(searchTerm) || entry.applicationStatus.toLowerCase().includes(searchTerm) || entry.submissionDate.toLowerCase().includes(searchTerm) || entry.response.toLowerCase().includes(searchTerm)
      )
    });
    setJobsList(searchResults);
    setCurrentPage(0);
  }

  return (
    <div className='search-bar-container'>
      <BsSearch id="search-icon"/>
      <input type="text" placeholder='Search...' onChange={handleChange} />
    </div>
  )
}

export default SearchBar;
