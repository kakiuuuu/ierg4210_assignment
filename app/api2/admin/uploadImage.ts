import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "@/lib/parse-form";
import { NextResponse } from 'next/server'

export async function POST(
  request: NextApiRequest,
) {
  try {
    const { fields, files } = await parseForm(request);

    console.log({ fields, files });
    const file = files.media;
    if (Array.isArray(file))  throw new Error()
    return NextResponse.json({
      data: {
        url: `/${file.newFilename}`,
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      NextResponse.json({ data: null, error: e.message });
    } else {
      console.error(e);
      NextResponse.json({ data: null, error: "Internal Server Error" });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};