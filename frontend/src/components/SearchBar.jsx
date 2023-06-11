// import React from 'react';
// import './css/SearchBar.css';
// import { BsSearch, BsXLg } from 'react-icons/bs';

// const SearchBar = ({ searchableJobsList, setJobsList, setCurrentPage }) => {
//   const handleChange = (e) => {
//     const searchTerm = e.target.value.toLowerCase();
//     const searchResults = searchableJobsList.filter((entry) => {
//       return (
//         entry.title.toLowerCase().includes(searchTerm) || entry.company.toLowerCase().includes(searchTerm) || entry.url.toLowerCase().includes(searchTerm) || entry.applicationStatus.toLowerCase().includes(searchTerm) || entry.submissionDate.toLowerCase().includes(searchTerm) || entry.response.toLowerCase().includes(searchTerm) || entry.notes.toLowerCase().includes(searchTerm)
//       )
//     });
//     setJobsList(searchResults);
//     setCurrentPage(0);
//   }

//   return (
//     <div className='search-bar-container'>
//       <BsSearch id="search-icon" />
//       <input type="text" placeholder='Search...' onChange={handleChange} />
//       <BsXLg id="clear-text-icon" />
//     </div>
//   )
// }

// export default SearchBar;

import React, { useState } from 'react';
import './css/SearchBar.css';
import { BsSearch, BsXLg } from 'react-icons/bs';

const SearchBar = ({ searchableJobsList, setJobsList, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const searchResults = searchableJobsList.filter((entry) => {
      const lowerCaseSearchTerm = newSearchTerm.toLowerCase();
      return (
        entry.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        entry.company.toLowerCase().includes(lowerCaseSearchTerm) ||
        entry.url.toLowerCase().includes(lowerCaseSearchTerm) ||
        entry.applicationStatus.toLowerCase().includes(lowerCaseSearchTerm) ||
        entry.submissionDate.toLowerCase().includes(lowerCaseSearchTerm) ||
        entry.response.toLowerCase().includes(lowerCaseSearchTerm) ||
        entry.notes.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });

    setJobsList(searchResults);
    setCurrentPage(0);
  };

  const handleClear = () => {
    setSearchTerm('');
    setJobsList(searchableJobsList);
    setCurrentPage(0);
  };

  return (
    <div className='search-bar-container'>
      <BsSearch id='search-icon' />
      <input type='text' placeholder='Search...' value={searchTerm} onChange={handleChange} />
      {searchTerm && <BsXLg id='clear-text-icon' onClick={handleClear} />}
    </div>
  );
};

export default SearchBar;
