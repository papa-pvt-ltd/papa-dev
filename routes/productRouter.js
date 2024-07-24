const express = require('express');
const productControler = require('../controllers/productControler');

const router = express.Router();

router.post('/add-product/:firmId',productControler.addProduct);
router.get('/:firmId/products',productControler.getProductByFirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-type','image/jpeg');
    res.sendFile(path.join(--__dirname, '..', 'uploads', imageName))
})

router.get('/allProducts',productControler.getAllProducts);
router.get('/singleproduct',productControler.getSingleProduct);


router.delete('/:productId', productControler.deleteProductById)
module.exports=router;