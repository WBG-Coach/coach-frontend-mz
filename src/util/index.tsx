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
      params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
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
          url: `${process.env.REACT_APP_AWS_PREFIX_URL}/${file.name}`,
          name: file.name,
        });
      })
      .send((err) => {
        if (err) reject(err);
      });
  });
};

export const groupAndSumAnswers = () => {};
