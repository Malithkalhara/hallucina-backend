import AWS from "aws-sdk";
import { awsS3Config } from "../config/config.js";

const s3Config = {
  apiVersion: "2006-03-01",
  accessKeyId: awsS3Config.accessKeyId,
  secretAccessKey: awsS3Config.secretAccessKey,
  region: awsS3Config.region,
  bucket: "buildzoneprimary",
  serverPath: "test/"
};

const s3 = new AWS.S3(s3Config);

export const upload = (file, contentType, fileName) => {
  console.log(file, contentType, fileName);
  if (!file) {
    return;
  }
  return s3
    .upload({
      Bucket: s3Config.bucket,
      Key: `${s3Config.serverPath}${fileName}`,
      Body: file,
      ContentType: contentType,
      ACL: "private",
      ContentDisposition: `attachment; filename="${fileName}"`,
    })
    .promise();
};

export const deleteObj = ( fileName ) => {
  return s3.deleteObject({
    Bucket: s3Config.bucket,
    Key: `${s3Config.serverPath}${fileName}`,
  }).promise();
};

export { s3 };
