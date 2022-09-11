require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

// CODE TO UPLOAD FILES
async function uploadFile(file) {
  const stream = fs.createReadStream(file.tempFilePath);

  const response = [];

  let name = file.name.split(' ').join('_');

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: name,
    Body: stream,
  };

  let fileUrl = `https://pinkini-server.s3.us-west-1.amazonaws.com/${name}`;

  response.push({'fileURL': fileUrl})

  const command = new PutObjectCommand(uploadParams);
  const res = await client.send(command);

  response.push(res);

  return response
}
// CODE TO UPLOAD FILES

async function readFile(fileName) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
  });

  const result = await client.send(command);

  result.Body.pipe(fs.createWriteStream('./images/newImage.jpeg'))
}

module.exports = {
  uploadFile,
  readFile
};
