import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { getJobsList } from "./utils/handleApi";
import { BsPlusLg } from "react-icons/bs";

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
      {!showModal && (
        <div className="content-container">
          <div className="button-container">
            <button
              className="add-job-button"
              onClick={() => setShowModal(true)}
            >
              <BsPlusLg style={{ marginRight: 6 }} />
              Add Job
            </button>
          </div>
          <Table jobsList={jobsList} setShowModal={setShowModal} />
        </div>
      )}
      {showModal && <Modal closeModal={closeModal} setJobsList={setJobsList} />}
    </div>
  );
}

export default App;
