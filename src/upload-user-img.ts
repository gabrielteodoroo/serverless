import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import db from "./database"
import AWS from 'aws-sdk'
import Busboy from 'busboy';
import * as dotenv from 'dotenv';
dotenv.config();

const BUCKET = process.env.BUCKET

const s3 = new AWS.S3()

interface ExtractedFile {
  filename: string;
  data: Buffer;
  contentType: string;
}

type FileUpload = {
  filename: string;
  encoding: string;
  mimeType: string;
};

const extractFile = (event: APIGatewayProxyEvent): Promise<ExtractedFile> => {
  return new Promise((resolve, reject) => {
    const contentType = event.headers['Content-Type'] || event.headers['content-type'];

    if (!contentType) {
      return reject(new Error('Content-Type header is missing'));
    }

    const busboy = Busboy({ headers: { 'content-type': contentType } });

    const fileData: ExtractedFile = { filename: '', data: Buffer.alloc(0), contentType: '' };

    busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, filename: FileUpload, encoding: string, mimetype: string) => {
      fileData.filename = filename.filename;
      fileData.contentType = mimetype;

      file.on('data', (data: Buffer) => {
        fileData.data = Buffer.concat([fileData.data, data]);
      });
    });

    busboy.on('finish', () => {
      if (fileData.filename) {
        resolve(fileData);
      } else {
        reject(new Error('No file found in the request'));
      }
    });

    busboy.on('error', (error: Error) => {
      reject(error);
    });

    if (event.body) {
      busboy.end(Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8'));
    } else {
      reject(new Error('Request body is missing'));
    }
  });
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'User ID is missing' }),
      };
    }

    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    const file = await extractFile(event);

    const uploadParams = {
      Bucket: BUCKET!,
      Key: `${userId}/${file.filename}`,
      Body: file.data,
      ContentType: file.contentType,
    };

    await s3.upload(uploadParams).promise();

    const imageUrl = `https://${BUCKET}.s3.amazonaws.com/${userId}/${file.filename}`;

    await db('users').where({ id: userId }).update({ profile_image: imageUrl });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully', imageUrl }),
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: errorMessage }),
    };
  }
};
