import { deleteObj, upload } from "../utils/s3helper.js";

export const uploadFile = async (req, res) => {
  const fileName = `${Date.now()}_${req.file.originalname}`;

  upload(req.file.buffer, req.file.mimetype, fileName)
    .then((result) => {
      console.log(result);
      res.status(200).send(`Successfull uploaded : ${result.Key}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("File upload failed");
    });
};

export const deleteFile = async (req, res) => {
  const fileName = req.body.fileName;

  deleteObj(fileName)
    .then((result) => {
        console.log(result)
      res.status(200).send("Delete successful!");
    })
    .catch((err) => {
        console.log(err)
      res.status(500).send("Delete Failed");
    });
};
