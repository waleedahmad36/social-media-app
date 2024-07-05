import express from "express";
import {
	followUnFollowUser,
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
	updateUser,
	getSuggestedUsers,
	freezeAccount,getAllUsers,searchUsersByName , signupAdmin , getTopUsers ,deleteUser
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/allusers",protectRoute,getAllUsers)
router.post("/search", protectRoute, searchUsersByName);

router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

//admin routes 

router.post("/signup/admin", signupAdmin);
router.post('/login/admin',loginUser);
router.get('/alluser/admin',protectRoute,getAllUsers)
router.get('/topusers/admin',getTopUsers)

export default router;
