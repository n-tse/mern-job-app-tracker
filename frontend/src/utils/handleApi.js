import axios from "axios";

export const getJobsList = async () => {
  try {
    const response = await axios.get("http://localhost:5001/jobs/");
    return response.data;
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
