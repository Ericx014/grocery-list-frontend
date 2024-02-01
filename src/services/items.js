import axios from "axios"
const baseUrl = "/api/items"

let token = null;

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createItem = async (newItem) => {
  const config = {
    headers: {Authorization: token},
  };

  console.log(token);
  console.log(config);

  const response = await axios.post(baseUrl, newItem, config);
  return response.data;
};

const deleteItem = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`)
	return response.data;
}

const updateItem = async (id, updatedItem) => {
	const response = await axios.put(`${baseUrl}/${id}`, updatedItem);
	return response.data;
}
 
export default {getAll, createItem, deleteItem, updateItem, setToken};