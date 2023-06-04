import React from "react";
import "./css/Table.css";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { getJobsList, deleteJob } from "../utils/handleApi";
import { Tooltip } from 'react-tooltip';

const Table = ({ jobsList, setJobsList, handleEditRow }) => {
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            {jobsList.length > 0 &&
              Object.keys(jobsList[0]).map(
                (field, idx) =>
                  field[0] !== "_" && (
                    <th key={idx}>{convertToHeader(field)}</th>
                  )
              )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobsList.map((job) => {
            const rowId = job._id;
            // console.log({ rowId });
            return (
              <tr key={rowId}>
                {Object.keys(job).map((field, fieldIdx) => {
                  return (
                    field[0] !== "_" && <td key={fieldIdx}>{job[field]}</td>
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
