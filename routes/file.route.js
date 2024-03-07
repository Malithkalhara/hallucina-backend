import express from "express";
import { uploadFile } from "../controllers/fileController.js"; 
import multer from "multer";
import { deleteFile } from "../controllers/fileController.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024
    }
});

const router = express.Router();

router.get("/",(req,res)=>{
    console.log("File route is working");
    res.status(200).send("File route is working");
})

router.post("/upload",upload.single('file'),(req,res)=>{
    return uploadFile(req,res);
})

router.delete("/delete",(req,res)=>{
    return deleteFile(req,res);

})

export default router;