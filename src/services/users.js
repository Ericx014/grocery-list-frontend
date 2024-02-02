import axios from "axios";
const baseUrl = "/api/users";

const getAllUser = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getUserByUsername = async (id) => {
  const response = await axios.get(`${baseUrl}/username/${id}`);
  return response.data;
};

export default {
  getAllUser,
  getUserById,
  getUserByUsername,
};