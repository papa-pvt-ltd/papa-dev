const express=require ('express')
const firmControler = require('../controllers/firmContrller')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')


router.post('/add-firm', verifyToken,firmControler.addFirm)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-type','image/jpeg');
    res.sendFile(path.join(--__dirname, '..', 'uploads', imageName))
})

router.delete('/:firmId', firmControler.deleteFirmById)


module.exports=router