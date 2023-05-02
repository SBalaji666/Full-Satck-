const express = require('express');
const userController = require('../controllers/userController');

const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

// CREATING COMBINED ROUTER
const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  next();
});

// USERS ROUTES
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
