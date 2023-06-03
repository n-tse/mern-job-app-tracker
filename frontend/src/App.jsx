import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import Table from './components/Table';
import Modal from "./components/Modal";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="app-container">
      {/* <Table jobsList={jobsList} /> */}
      {!showModal && <Modal />}
    </div>
  );
}

export default App;
