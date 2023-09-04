const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:UserId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/Users/:UserId/friends/:friendId
router.route('/:UserId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
