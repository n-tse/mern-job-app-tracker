import axios from "axios";

// sorts response data by submissionDate from newest to oldest
export const getJobsList = async () => {
  try {
    const response = await axios.get("http://localhost:5001/jobs/");
    const data = response.data;
    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.submissionDate);
      const dateB = new Date(b.submissionDate);
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        return data.indexOf(b) - data.indexOf(a);
      }
    });
    return sortedData;
  } catch (error) {
    console.log(error);
  }
};

export const postJob = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5001/jobs/", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const updateJob = async (id, updatedEntry) => {
  try {
    const response = await axios.put(`http://localhost:5001/jobs/${id}`, updatedEntry);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5001/jobs/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
