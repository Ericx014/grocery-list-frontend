import axios from "axios"
const baseUrl = "http://localhost:3000/api/items"

const getAll = () => {
 	const request = axios.get(baseUrl)
	return request.then((response) => response.data);
}

const createItem = (newItem) => {
	const request = axios.post(baseUrl, newItem)
	return request.then((response) => response.data)
}

const deleteItem = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then((response) => response.data)
}

const updateItem = (id, updatedItem) => {
	const request = axios.put(`${baseUrl}/${id}`, updatedItem);
	return request.then((response) => response.data)
}
 
export default { getAll, createItem, deleteItem, updateItem }