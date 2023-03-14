import { NextResponse } from 'next/server'
import S3 from "aws-sdk/clients/s3";
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export async function POST(
  request: Request,
) {
  try {
    let { name, type } = await request.json();

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    return NextResponse.json({
      data: { url }
    });
  } catch (e) {
    console.error("error>>>>>>>>>", e);
    NextResponse.json({ data: e });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Set desired value here
    },
  },
};
