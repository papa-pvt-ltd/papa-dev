import { Router } from "express";
import {
  changeCurrentPassword,
  getAllUsers,
  longinUser,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(longinUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/changePassword/:userId").post(changeCurrentPassword);

export default router;
