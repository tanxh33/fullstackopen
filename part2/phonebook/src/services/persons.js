import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

// Non-async version:
// const getAll = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const deleteEntry = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  getAll,
  create,
  deleteEntry,
  update,
};
