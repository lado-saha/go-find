import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

/**
 *API route to upload files
 * @param req The request
 * @returns The Nextjs Response
 */
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);

  const file = (body.file as File) || null;
  const filePath = (body.filePath as string) || 'public/bucket/any';
  const extension = file.name.split('.').slice(-1)[0];
  const fileName = `${body.fileName}.${extension}` || file.name;
  const UPLOAD_DIR = path.resolve(process.cwd(), filePath);

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const filePath = path.resolve(UPLOAD_DIR, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      name: fileName,
    });
  } else {
    return NextResponse.json({
      success: false,
      message: 'No file provided',
    });
  }
};
