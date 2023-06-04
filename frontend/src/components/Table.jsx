import React from "react";
import "./css/Table.css";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

const Table = ({ jobsList, handleEditRow }) => {
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
                    <BsPencilSquare id="edit-icon" onClick={() => handleEditRow(rowId)}/>
                    <BsFillTrashFill id="delete-icon"/>
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
