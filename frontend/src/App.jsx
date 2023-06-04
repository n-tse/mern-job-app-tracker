import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { getJobsList } from "./utils/handleApi";
import { BsPlusLg } from "react-icons/bs";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState({});

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

  const handleEditRow = (id) => {
    const data = jobsList.filter(row => row._id === id && row);
    // console.log(data[0]);
    setRowDataToEdit(data[0]);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setRowDataToEdit({})
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
          <Table jobsList={jobsList} handleEditRow={handleEditRow} />
        </div>
      )}
      {showModal && <Modal closeModal={closeModal} setJobsList={setJobsList} rowValues={Object.keys(rowDataToEdit).length && rowDataToEdit} />}
    </div>
  );
}

export default App;
