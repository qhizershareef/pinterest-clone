import express from 'express';
import { protect } from '../Middleware/auth.js';
import { authenticateUser, deleteSavedPin, getSavedPins, getUserCollections, getUserDetails, getUserProfile, handleUserFollow, registerUser, savePin, updateUser } from '../Controllers/UserController.js';

const router = express.Router();

router.post('/register',registerUser)
router.get('/collections',protect,getUserCollections);
router.route('/profile').get(protect, getUserProfile);

router.post('/login',authenticateUser)
router.put('/', protect, updateUser)
router.put('/follow/',protect, handleUserFollow)
router.post('/save/pin/:id', protect, savePin);
router.get('/saved/:cname', protect, getSavedPins);
router.delete('/saved/delete/:id',protect, deleteSavedPin)

router.get('/:id',getUserDetails);

export default router;