import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5001/jobs/");
        setJobsList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData();
  }, []);

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
    <div className="app-container">
      <table>
        <thead>
          <tr>
            {console.log(jobsList)}
            {jobsList.length > 0 && Object.keys(jobsList[0]).map((field, idx) => field[0] !== "_" && <th key={idx}>{convertToHeader(field)}</th>)}
          </tr>
        </thead>
        <tbody>
          {jobsList.map((job) => {
            const rowId = job._id;
            console.log({rowId})
            return (
              <tr key={rowId}>
                {Object.keys(job).map((field, fieldIdx) => {
                  return (
                    field[0] !== "_" && <td key={fieldIdx}>{job[field]}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
