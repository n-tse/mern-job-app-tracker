import React from 'react';
import './css/SearchBar.css'

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
      <input type="text" placeholder='Search...' onChange={handleChange}></input>
    </div>
  )
}

export default SearchBar;
