import { getUserToken } from "../../utils/getUsertoken";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

//! getting token from the backend
const token = getUserToken();
//? Login Action
export const loginAPI = async ({ email, password }) => {
  const res = await axios.post("http://localhost:8000/api/v1/user/login", {
    email,
    password,
  });
  // Return the promise
  return res.data;
};

//? Register Action
export const registerAPI = async ({ email, password, username }) => {
  const res = await axios.post("http://localhost:8000/api/v1/user/register", {
    email,
    password,
    username,
  });
  // Return the promise
  return res.data;
};

//?  Change Password Action
export const changePasswordAPI = async (newPassword ) => {
  const res = await axios.put(
    "http://localhost:8000/api/v1/user/change-password",
    {
      newPassword,
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

//?  Update Profile Action
export const updateProfileAPI = async ({ username, email }) => {
  const res = await axios.put(
    "http://localhost:8000/api/v1/user/update-profile",
    {
      username,
      email,
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
