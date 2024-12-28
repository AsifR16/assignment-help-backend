const express = require('express');
const router = express.Router();
const path = require("path")
const multer = require("multer")
const Orders = require("../models/Orders")

const fileFilter = (req, file, cb) => {
    const filetypes = /.pdf|.jpeg|.png|.docx|.doc|.zip/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (extname) {
        return cb(null, true);
    } else {
      cb("Invalid File Format");
    }
};

const upload = multer({ 
    dest: "uploads/",
    limits: { fileSize: 10000000 },
    fileFilter
});

router.post('/order', (req, res) => {
    const {title,desc,subject,type,deadline} = req.body
    const id = Orders.newOrder(title,desc,subject,type,deadline)
    res.status(200).json({"orderid":id});
})

router.post("/order/upload", upload.any(),(req,res)=>{
    if(typeof(req.files[0]) != "undefined"){
        const file = req.files[0]
        const original_file_name = file.originalname
        const file_name = file.filename
        const order_id = req.body.orderId
        const id = Orders.newOrderFile(order_id,file_name,original_file_name)
        res.send(200).json({"orderid":id})
    }
    else{
        res.sendStatus(404)
    }
})

module.exports = router;
