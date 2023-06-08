import React from "react";
import './css/PaginationBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const PaginationBar = ({ currentPage, setCurrentPage, lastPage }) => {
  const handlePagination = (operation) => {
    if (operation === "previous") {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    <div className="pagination-bar-container">
      <button className="pagination-bar-btn" onClick={() => handlePagination("previous")} disabled={currentPage === 0}><FontAwesomeIcon icon={faChevronLeft} style={{margin:"0 5px 0 0"}}/>previous</button>
      <span className="page-indicator">Page {currentPage + 1} of {lastPage + 1}</span>
      <button className="pagination-bar-btn" onClick={() => handlePagination("next")} disabled={currentPage === lastPage}>next<FontAwesomeIcon icon={faChevronRight} style={{margin:"0 0 0 5px"}}/></button>
    </div>
  );
};

export default PaginationBar;
