import React, { useState } from "react";
import "./css/Modal.css";
import { getJobsList, postJob } from '../utils/handleApi';

const Modal = ({ closeModal, setJobsList, rowValues }) => {
  const emptyFormValues = {
    title: "",
    company: "",
    url: "",
    submissionDate: getTodaysDate(),
    applicationStatus: "",
    response: "",
    notes: "",
  };
  
  const [formData, setFormData] = useState(rowValues || emptyFormValues);

  function getTodaysDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  }

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postJob(formData);
      setFormData(emptyFormValues);
  
      const jobsData = await getJobsList();
      setJobsList(jobsData);
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          ></input>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
          ></input>
          <label htmlFor="submissionDate">Submission Date</label>
          <input
            type="text"
            name="submissionDate"
            value={formData.submissionDate}
            onChange={handleChange}
          ></input>
          <label htmlFor="applicationStatus">Application Status</label>
          <input
            type="text"
            name="applicationStatus"
            value={formData.applicationStatus}
            onChange={handleChange}
          ></input>
          <label htmlFor="response">Response</label>
          <input
            type="text"
            name="response"
            value={formData.response}
            onChange={handleChange}
          ></input>
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></input>
          <button type="submit">Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
