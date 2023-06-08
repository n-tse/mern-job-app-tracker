import React, { useEffect, useState } from "react";
import "./css/Modal.css";
import { getJobsList, postJob, updateJob } from "../utils/handleApi";

const Modal = ({ closeModal, setJobsList, rowValues }) => {
  const emptyFormValues = {
    title: "",
    company: "",
    url: "",
    submissionDate: getTodaysDate(),
    applicationStatus: "Completed",
    response: "Pending",
    notes: "",
  };

  const [formData, setFormData] = useState(rowValues || emptyFormValues);
  const [errors, setErrors] = useState([]);

  function getTodaysDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return `${year}-${month}-${day}`;
  }

  const isMissingRequiredFields = () => {
    if (
      !formData.title ||
      !formData.company ||
      !formData.url ||
      !formData.submissionDate
    ) {
      let missingFields = [];
      for (const [key, value] of Object.entries(formData)) {
        if (key[0] !== "_" && key !== "notes" && value === "") {
          missingFields.push(key);
        }
      }
      setErrors(missingFields);
      return true;
    } else {
      setErrors([]);
      return false;
    }
  };

  const formatField = (fieldName) => {
    if (fieldName === "title") {
      return "Job Title";
    }
    let capitalizedField = fieldName[0].toUpperCase();
    for (let i = 1; i < fieldName.length; i++) {
      if (fieldName[i].toUpperCase() === fieldName[i]) {
        capitalizedField += " " + fieldName[i];
      } else {
        capitalizedField += fieldName[i];
      }
    }
    return capitalizedField;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const updateResponseField = () => {
      if (formData.applicationStatus !== "Completed") {
        setFormData({ ...formData, submissionDate: "N/A", response: "N/A" });
      } else if (formData.response === "N/A") {
        const todaysDate = getTodaysDate();
        setFormData({
          ...formData,
          submissionDate: todaysDate,
          response: "Pending",
        });
      }
    };

    updateResponseField();
  }, [formData.applicationStatus]);

  const handleAddNewJob = async (e) => {
    e.preventDefault();
    if (isMissingRequiredFields()) {
      return;
    }
    const formDataWithDateModified = { ...formData, _dateModified: new Date() };
    try {
      await postJob(formDataWithDateModified);
      setFormData(emptyFormValues);

      const jobsData = await getJobsList();
      setJobsList(jobsData);
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (isMissingRequiredFields()) {
      return;
    }
    const formDataWithDateModified = { ...formData, _dateModified: new Date() };
    try {
      await updateJob(rowValues._id, formDataWithDateModified);
      setFormData(emptyFormValues);

      const jobsData = await getJobsList();
      setJobsList(jobsData);
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => e.target.className === "modal-container" && closeModal()}
    >
      {/* {console.log("formData", formData)} */}
      <div className="modal">
        <form onSubmit={rowValues ? handleUpdateJob : handleAddNewJob}>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="url">Url</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="applicationStatus">Application Status</label>
            <select
              name="applicationStatus"
              value={formData.applicationStatus}
              onChange={handleChange}
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="submissionDate">Submission Date</label>
            <input
              type="date"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleChange}
              disabled={formData.applicationStatus !== "Completed"}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="response">Response</label>
            <select
              id="response"
              name="response"
              value={formData.response}
              onChange={handleChange}
              disabled={formData.applicationStatus !== "Completed"}
            >
              <option value="Pending">Pending</option>
              <option value="Not Selected">Not Selected</option>
              <option value="Interview">Interview</option>
              <option value="N/A" hidden>
                N/A
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              type="text"
              name="notes"
              value={formData.notes}
              rows={4}
              style={{ resize: "none" }}
              onChange={handleChange}
            ></textarea>
          </div>
          {errors.length > 0 && (
            <div className="error-message">
              Missing Fields:
              <ul>
                {errors.map((ele, idx) => (
                  <li key={idx}>{formatField(ele)}</li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit" className="submit-button">
            {rowValues ? "Update Job" : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
