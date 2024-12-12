import axios from "axios";
import { getUserToken } from "../../utils/getUsertoken";

//? Category Addition API

//! getting token from the backend
const token = getUserToken();
export const addCategoryAPI = async ({ name, type }) => {
  const res = await axios.post(
    "http://localhost:8000/api/v1/categories/create",
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    }
  );
  // Return the promise
  return res.data;
};

//? list the category
export const listCategoryAPI = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/categories/list", {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });
  // Return the promise
  return res.data;
};

//! update category
export const updateCategoryAPI = async ({ name, type, id }) => {
  const res = await axios.put(
    `http://localhost:8000/api/v1/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    }
  );
  // Return the promise
  return res.data;
};

//! delete category
export const deleteCategoryAPI = async (id ) => {
  const res = await axios.delete(
    `http://localhost:8000/api/v1/categories/delete/${id}`,

    {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    }
  );
  // Return the promise
  return res.data;
};
