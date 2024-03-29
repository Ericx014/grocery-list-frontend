import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getUserByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/username/${username}`);
  return response.data;
};

const addUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
	return response.data;
};

export default {
  getAll,
  getUserById,
  getUserByUsername,
	addUser
};