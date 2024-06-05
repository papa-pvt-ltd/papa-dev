const multer = require('multer');
const Firm = require('../models/Firm');
const Vender = require('../models/Vender');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { brandName, category, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vender = await Vender.findById(req.venderId);

    if (!vender) {
      return res.status(404).json({ message: "Vender not found" });
    }

    const firm = new Firm({
      brandName,
      category,
      offer,
      image,
      vender: vender._id
    });

    const savedFirm = await firm.save();
    vender.firm.push(savedFirm);
    await vender.save();

    return res.status(200).json({ message: "Firm added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;

    const deleteFirmId = await Firm.findByIdAndDelete(firmId);

    if (!deleteFirmId) {
      return res.status(404).json({ error: "No firm found" });
    }

    return res.status(200).json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addFirm: [upload.single('image'), addFirm],
  deleteFirmById
};
