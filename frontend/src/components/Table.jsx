import React, { useState } from "react";
import "./css/Table.css";
import { BsPencilSquare, BsFillTrashFill, BsArrowDownUp } from "react-icons/bs";
import { getJobsList, deleteJob } from "../utils/handleApi";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const Table = ({ jobsList, setJobsList, handleEditRow, page, setPage }) => {
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

  const formatDate = (date) => {
    if (date === "N/A") return "N/A";
    const dateArr = date.split("-");
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
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
    let numberOfNAs = 0;
    for (let i = 0; i < jobsList.length; i++) {
      if (jobsList[i].submissionDate === "N/A") {
        numberOfNAs++;
      }
    }
    setJobsList((prevList) => {
      const copy = [...prevList];
      const sortOrder =
        copy.length > 0 &&
        copy[0].submissionDate <
          copy[copy.length - numberOfNAs - 1].submissionDate
          ? 1
          : -1;

      const sortedEntries = copy.sort((a, b) => {
        if (a.submissionDate === "N/A" && b.submissionDate === "N/A") {
          return 0;
        } else if (a.submissionDate === "N/A") {
          return 1;
        } else if (b.submissionDate === "N/A") {
          return -1;
        } else {
          const dateA = new Date(a.submissionDate);
          const dateB = new Date(b.submissionDate);
          if (dateA > dateB) {
            return sortOrder * -1;
          } else if (dateA < dateB) {
            return sortOrder * 1;
          } else {
            return copy.indexOf(b) - copy.indexOf(a);
          }
        }
      });

      return sortedEntries;
    });
  };

  const handleColumnHeaderClick = (columnName) => {
    const sortedEntries = [...jobsList].sort((a, b) => {
      if (a[columnName].toLowerCase() < b[columnName].toLowerCase()) {
        return -1;
      }
      if (a[columnName].toLowerCase() > b[columnName].toLowerCase()) {
        return 1;
      }
      return 0;
    });

    const sortedEntriesReversed = sortedEntries.slice().reverse();
    const isSortedAscending =
      JSON.stringify(sortedEntries) === JSON.stringify(jobsList);
    const newSortedEntries = isSortedAscending
      ? sortedEntriesReversed
      : sortedEntries;

    setJobsList(newSortedEntries);
  };

  const handlePagination = async (operation) => {
    try {
      if (operation === "previous") {
        if (page === 0) return;
        const prevPage = page - 1;
        const jobsData = await getJobsList(prevPage);
        setPage(prevPage);
        setJobsList(jobsData);
      } else {
        const nextPage = page + 1;
        const jobsData = await getJobsList(nextPage);
        if (jobsData.length === 0) return;
        setPage(nextPage);
        setJobsList(jobsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {jobsList.length > 0 &&
              Object.keys(jobsList[0]).map((field, idx) => {
                const isString =
                  field === "title" ||
                  field === "company" ||
                  field === "url" ||
                  field === "applicationStatus" ||
                  field === "response";
                const isSubmissionDate = field === "submissionDate";
                return (
                  field[0] !== "_" && (
                    <th
                      key={idx}
                      onClick={
                        isString
                          ? () => handleColumnHeaderClick(field)
                          : isSubmissionDate
                          ? handleSubmissionDateClick
                          : null
                      }
                      style={
                        isString || isSubmissionDate
                          ? { cursor: "pointer" }
                          : {}
                      }
                    >
                      {convertToHeader(field)}
                      {(isString || isSubmissionDate) && (
                        <FontAwesomeIcon
                          icon={faSort}
                          style={{ margin: "0 0 0 3px", fontSize: 13 }}
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
                            {field === "url" ? (
                              <a href={`http://${job[field]}`} target="_blank">
                                {job[field]}
                              </a>
                            ) : field === "submissionDate" ? (
                              formatDate(job[field])
                            ) : (
                              job[field]
                            )}
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
      <button onClick={() => handlePagination("previous")}>previous</button>
      <button onClick={() => handlePagination("next")}>next</button>
    </div>
  );
};

export default Table;
