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
          url: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_BUCKET_NAME}/${file.name}`,
          name: file.name,
        });
      })
      .send((err) => {
        if (err) reject(err);
      });
  });
};

export const getLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () =>
          resolve({
            latitude: 0,
            longitude: 0,
          })
      );
    } else {
      resolve({
        latitude: 0,
        longitude: 0,
      });
    }
  });
};
