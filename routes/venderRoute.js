const Vender = require("../models/Vender");
const venderController = require("../controllers/venderControler")
const express = require("express")

const router = express.Router();


router.post('/register', venderController.venderRegister);
router.post("/login" , venderController.venderLogin)
router.get('/get-venders', venderController.getAllVenders)
router.get('/single-vender/:venderId', venderController.singleVender)

module.exports = router;