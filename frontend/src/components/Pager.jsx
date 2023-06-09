import React from "react";
import "./css/Pager.css";

const Pager = ({ setJobsPerPage }) => {
  const handleChange = (e) => {
    const num = parseInt(e.target.value);
    setJobsPerPage(num)
  }

  return (
    <div className="pager-container">
      <label htmlFor="entries-per-page"></label>
      Show{" "}
      <select
        id="entries-per-page"
        onChange={handleChange}
        style={{
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 2,
          position: "relative",
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>{" "}
      entries per page
    </div>
  );
};

export default Pager;
