import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { getJobsList } from './utils/handleApi';

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobsList();
        setJobsList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app-container">
      {!showModal && <Table jobsList={jobsList} setShowModal={setShowModal} />}
      {showModal && <Modal closeModal={closeModal} setJobsList={setJobsList} />}
    </div>
  );
}

export default App;
