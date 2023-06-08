import React from "react";
import "./css/PaginationBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationBar = ({ currentPage, setCurrentPage, lastPage }) => {
  const handlePagination = (operation) => {
    if (operation === "previous") {
      setCurrentPage((prev) => prev - 1);
    } else if (operation === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (operation === "first") {
      setCurrentPage(0);
    } else {
      setCurrentPage(lastPage);
    }
  };

  return (
    <div className="pagination-bar-container">
      <div className="pagination-bar-btn-group">
        <button
          className="pagination-bar-btn"
          onClick={() => handlePagination("first")}
          disabled={currentPage === 0}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button
          className="pagination-bar-btn"
          onClick={() => handlePagination("previous")}
          disabled={currentPage === 0}
        >
          <FontAwesomeIcon icon={faAngleLeft} style={{ margin: "0 5px" }} />
        </button>
      </div>

      <span className="page-indicator">
        Page {currentPage + 1} of {lastPage + 1}
      </span>
      <div className="pagination-bar-btn-group">
        <button
          className="pagination-bar-btn"
          onClick={() => handlePagination("next")}
          disabled={currentPage === lastPage}
        >
          <FontAwesomeIcon icon={faAngleRight} style={{ margin: "0 5px" }} />
        </button>
        <button
          className="pagination-bar-btn"
          onClick={() => handlePagination("last")}
          disabled={currentPage === lastPage}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
