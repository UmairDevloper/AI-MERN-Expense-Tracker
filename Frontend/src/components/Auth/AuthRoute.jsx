import React from 'react'
import {Navigate} from "react-router-dom";
import { getUserToken } from '../../utils/getUsertoken';


const AuthRoute = ({ children }) => {
    const token = getUserToken();
    if (!token) {
        return <Navigate to="/login" />
    }else{
      return children;
    }

}

export default AuthRoute