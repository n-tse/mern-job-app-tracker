import React, { useState } from "react";
import "./css/Table.css";
import { BsPencilSquare, BsFillTrashFill, BsArrowDownUp } from "react-icons/bs";
import { getJobsList, deleteJob } from "../utils/handleApi";
import { Tooltip } from "react-tooltip";

const Table = ({ jobsList, setJobsList, handleEditRow }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const convertToHeader = (string) => {
    let res = string[0].toUpperCase();
    for (let i = 1; i < string.length; i++) {
      if (string[i] === string[i].toUpperCase()) {
        res += " " + string[i];
      } else {
        res += string[i];
      }
    }
    return res;
  };

  const handleCellClick = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };

  const handleDeleteRow = async (id) => {
    const confirmation = confirm("Are you sure you want to delete this row?");
    if (confirmation) {
      try {
        await deleteJob(id);
        const jobsData = await getJobsList();
        setJobsList(jobsData);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const handleSubmissionDateClick = () => {
    const reversedEntries = [...jobsList].reverse();
    setJobsList(reversedEntries);
  };

  const handleJobTitleClick = () => {
    const sortedEntries = [...jobsList].sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    const sortedEntriesReversed = sortedEntries.slice().reverse();
    const isSortedAscending = JSON.stringify(sortedEntries) === JSON.stringify(jobsList);
    const newSortedEntries = isSortedAscending ? sortedEntriesReversed : sortedEntries;

    setJobsList(newSortedEntries);
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {jobsList.length > 0 &&
              Object.keys(jobsList[0]).map((field, idx) => {
                const isTitle = field === "title";
                const isSubmissionDate = field === "submissionDate";
                return (
                  field[0] !== "_" && (
                    <th
                      key={idx}
                      onClick={isTitle ? handleJobTitleClick : isSubmissionDate ? handleSubmissionDateClick : null}
                      style={isSubmissionDate ? { cursor: "pointer" } : {}}
                    >
                      {convertToHeader(field)}
                      {isSubmissionDate && (
                        <BsArrowDownUp
                          style={{ margin: "0 2px", fontSize: 12 }}
                        />
                      )}
                    </th>
                  )
                );
              })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {jobsList.map((job) => {
            const rowId = job._id;
            // console.log({ rowId });
            const isExpanded = expandedRow === rowId;
            return (
              <tr
                key={rowId}
                className={`job-row ${isExpanded ? "expanded" : ""}`}
              >
                {Object.keys(job).map((field, fieldIdx) => {
                  return (
                    field[0] !== "_" && (
                      <td key={fieldIdx} onClick={() => handleCellClick(rowId)}>
                        <div className="cell-content">
                          <div
                            className={`text-content ${
                              isExpanded ? "expanded" : ""
                            }`}
                          >
                            {job[field]}
                          </div>
                        </div>
                      </td>
                    )
                  );
                })}
                <td>
                  <span className="actions">
                    <BsPencilSquare
                      id="edit-icon"
                      onClick={() => handleEditRow(rowId)}
                      data-tooltip-content="Edit"
                      data-tooltip-id={`edit-tooltip-${rowId}`}
                    />
                    <BsFillTrashFill
                      id="delete-icon"
                      onClick={() => handleDeleteRow(rowId)}
                      data-tooltip-content="Delete"
                      data-tooltip-id={`delete-tooltip-${rowId}`}
                    />
                    <Tooltip
                      id={`edit-tooltip-${rowId}`}
                      place="bottom"
                      effect="solid"
                      className="customized-tooltip"
                    />
                    <Tooltip
                      id={`delete-tooltip-${rowId}`}
                      place="bottom"
                      effect="solid"
                      className="customized-tooltip"
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
