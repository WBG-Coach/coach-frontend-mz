import AWS from "aws-sdk";
import { AnswerFile } from "../store/type";

export const uploadFileToS3 = (file: File): Promise<AnswerFile> => {
  return new Promise((resolve, reject) => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET,
    });

    const myBucket = new AWS.S3({
      region: "us-east-1",
    });

    const params = {
      Body: file,
      Key: file.name,
      ACL: "public-read",
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME || "",
    };

    myBucket
      .putObject(params)
      .on("complete", () => {
        resolve({
          url: `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com/${file.name}`,
          name: file.name,
        });
      })
      .send((err) => {
        if (err) reject(err);
      });
  });
};

export const groupAndSumAnswers = () => {};
