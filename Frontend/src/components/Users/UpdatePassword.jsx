import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { changePasswordAPI } from "../../services/Users/userService";
import { logoutAction } from "../../redux/slice";
import AlertMessage from "../Alert/AlertMessage";
const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});
const UpdatePassword = () => {
  //? dispatch
  const dispatch = useDispatch();
  const { mutateAsync, isError, error, isSuccess, isPending } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-Password"],
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      mutateAsync(values.password)
        .then((data) => {
          dispatch(logoutAction());
          // remove user
          localStorage.removeItem("userInfo");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
              {/* Display messages */}
      {isPending && <AlertMessage type={"loading"} message={"Updating..."} />}
      {isError && <AlertMessage type={"error"} message={"Update failed! Invalid credentials.... "} />}
      {isSuccess && <AlertMessage type={"success"} message={"Update successful"} />}
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
