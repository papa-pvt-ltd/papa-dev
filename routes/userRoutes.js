const express = require("express");
const userControler = require("../controllers/userControler")
const router = express.Router();

router.post("/signUp", userControler.userRegister);
router.post("/verifying", userControler.userLogin);
router.get("/get-users", userControler.getAllUsers);
router.get("/single-user/:userId", userControler.singleUser);
router.put("/changepassword", userControler.changePassword);
router.put("/updateProfile/:userId", userControler.updateProfile);



module.exports = router;
