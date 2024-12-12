import axios from "axios";
import { getUserToken } from "../../utils/getUsertoken";

//? Category Addition API

//! getting token from the backend
const token = getUserToken();
export const addTransactionAPI = async ({
  type,
  amount,
  category,
  description,
  date,
}) => {
  const res = await axios.post(
    "http://localhost:8000/api/v1/transaction/create",
    {
      type,
      amount,
      category,
      description,
      date,
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
export const listTransactionAPI = async ({startDate,endDate, type, category}) => {
  const res = await axios.get("http://localhost:8000/api/v1/transaction/list", {
    params: {
      startDate,
      endDate,
      type,
      category
    },
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
export const deleteCategoryAPI = async (id) => {
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
