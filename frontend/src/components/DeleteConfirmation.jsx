import React from "react";
import "./css/DeleteConfirmation.css";
import { getJobsList, deleteJob } from "../utils/handleApi";
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

const DeleteConfirmation = ({ rowToDeleteId, setShowDeleteConfirmation, handleJobsListUpdate }) => {
  const handleDelete = async (operation) => {
    if (operation === "delete") {
      try {
        await deleteJob(rowToDeleteId);
        const jobsData = await getJobsList();
        handleJobsListUpdate(jobsData);
      } catch (error) {
        console.log(error);
      }
    }
    setShowDeleteConfirmation(false);
  };

  return (
    <div
      className="delete-confirmation-container"
      onClick={(e) =>
        e.target.className === "delete-confirmation-container" &&
        setShowDeleteConfirmation(false)
      }
    >
      <div className="delete-confirmation-modal">
        <h1 className="delete-confirmation-header"><BsFillExclamationTriangleFill id="warning-icon"/> Delete Confirmation</h1>
        <p>Are you sure you want to delete this row?</p>
        <div className="delete-button-container">
          <button
            className="delete-confirmation-btn delete-confirmation-btn-cancel"
            onClick={() => handleDelete("cancel")}
          >
            Cancel
          </button>
          <button
            className="delete-confirmation-btn delete-confirmation-btn-delete"
            onClick={() => handleDelete("delete")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
