import axios from "axios";

const API_URL = "http://localhost:5000/api/medicines";

export const getMedicines = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createMedicine = async (medicine) => {
  const res = await axios.post(API_URL, medicine);
  return res.data;
};

export const updateMedicine = async (id, medicine) => {
  const res = await axios.put(`${API_URL}/${id}`, medicine);
  return res.data;
};

export const deleteMedicine = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
