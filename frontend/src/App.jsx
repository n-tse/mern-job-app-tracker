import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { getJobsList } from "./utils/handleApi";
import { BsPlusLg } from "react-icons/bs";
import PaginationBar from "./components/PaginationBar";
import SearchBar from "./components/SearchBar";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchableJobsList, setSearchableJobsList] = useState([]);
  const [jobsPerPage, setJobsPerPage] = useState(5);

  const pageStart = currentPage * jobsPerPage;
  const pageEnd = pageStart + jobsPerPage;
  const lastPage = Math.ceil(jobsList.length / jobsPerPage) - 1;
  const jobsListSlice = jobsList.slice(pageStart, pageEnd);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobsList();
        setJobsList(data);
        setSearchableJobsList(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditRow = (id) => {
    const data = jobsList.filter((row) => row._id === id && row);
    // console.log(data[0]);
    setRowDataToEdit(data[0]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRowDataToEdit({});
  };

  return (
    <div className="app-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
          <SearchBar
            searchableJobsList={searchableJobsList}
            setJobsList={setJobsList}
            setCurrentPage={setCurrentPage}
          />
          {jobsList.length > 0 ? (
            <>
              <Table
                jobsList={jobsList}
                jobsListSlice={jobsListSlice}
                pageStart={pageStart}
                setJobsList={setJobsList}
                handleEditRow={handleEditRow}
                setJobsPerPage={setJobsPerPage}
              />

              <PaginationBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                lastPage={lastPage}
              />
            </>
          ) : (
            <div className="no-results-found">No Results Found</div>
          )}
        </div>
      )}
      {showModal && (
        <Modal
          closeModal={closeModal}
          setJobsList={setJobsList}
          rowValues={Object.keys(rowDataToEdit).length && rowDataToEdit}
        />
      )}
    </div>
  );
}

export default App;
