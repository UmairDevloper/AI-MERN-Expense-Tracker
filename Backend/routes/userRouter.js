const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const isAuthenticated = require('../middleware/isAuth');
const userRouter = express.Router();


// routes
//! Register
userRouter.post('/api/v1/user/register', userCtrl.register  ) ;
//! Login
userRouter.post('/api/v1/user/login', userCtrl.login  ) ;
//! Profile
userRouter.get('/api/v1/user/profile',isAuthenticated, userCtrl.profile  ) ;
//! Change Password
userRouter.put('/api/v1/user/change-password',isAuthenticated, userCtrl.changePassword  ) ;
//! Update User
userRouter.put('/api/v1/user/update-profile',isAuthenticated, userCtrl.updateUser  ) ;




module.exports = userRouter;