// create the router
const router = require('express').Router()
const { validateUserId } = require('../middlewares/validation')

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users')

// route & method definitions
router.get('/users', getUsers)
router.get('/users/me', getCurrentUser)
router.get('/users/:id', validateUserId, getUserById)
router.patch('/users/me', updateUserInfo)
router.patch('/users/me/avatar', updateUserAvatar)

module.exports = router
