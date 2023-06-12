import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { getJobsList } from "./utils/handleApi";
import { BsPlusLg } from "react-icons/bs";
import PaginationBar from "./components/PaginationBar";
import SearchBar from "./components/SearchBar";
import { NavBar } from "./components/NavBar";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchableJobsList, setSearchableJobsList] = useState([]);
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const [loadingMessage, setLoadingMessage] = useState("Loading");

  const pageStart = currentPage * jobsPerPage;
  const pageEnd = pageStart + jobsPerPage;
  const lastPage = Math.ceil(jobsList.length / jobsPerPage) - 1;
  const jobsListSlice = jobsList.slice(pageStart, pageEnd);

  const handleJobsListUpdate = (data) => {
    setJobsList(data);
    setSearchableJobsList(data);
  };

  useEffect(() => {
    setTimeout(() => {
      if (loadingMessage === "Loading...") {
        setLoadingMessage("Loading");
      } else {
        setLoadingMessage((prev) => prev + ".");
      }
    }, 800);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobsList();
        handleJobsListUpdate(data);
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
    <>
      <NavBar />
      <div className="app-container">
        {isLoading ? (
          <div className="loader-container">
            <div className="loading-message">
              {loadingMessage} (this may take a moment)
            </div>
            <div className="spinner"></div>
          </div>
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
                  jobsPerPage={jobsPerPage}
                  setJobsList={setJobsList}
                  handleJobsListUpdate={handleJobsListUpdate}
                  handleEditRow={handleEditRow}
                  setJobsPerPage={setJobsPerPage}
                  setCurrentPage={setCurrentPage}
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
            handleJobsListUpdate={handleJobsListUpdate}
            rowValues={Object.keys(rowDataToEdit).length && rowDataToEdit}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}

export default App;
