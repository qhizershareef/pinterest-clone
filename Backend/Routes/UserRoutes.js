import express from 'express';
import { protect } from '../Middleware/auth.js';
import { authenticateUser, getUserDetails, handleUserFollow, registerUser, updateUser } from '../Controllers/UserController.js';

const router = express.Router();

router.post('/register',registerUser)
router.get('/:id',getUserDetails);
router.post('/login',authenticateUser)
router.put('/', protect, updateUser)
router.put('/follow/',protect, handleUserFollow)

export default router;