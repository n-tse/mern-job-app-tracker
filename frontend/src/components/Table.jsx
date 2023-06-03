import React from "react";
import './css/Table.css';

const Table = ({ jobsList, setShowModal }) => {

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
  }

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
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => setShowModal(true)}>Add Job</button>
    </div>
  );
};

export default Table;
