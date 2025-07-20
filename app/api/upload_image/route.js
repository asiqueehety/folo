// import { NextResponse } from 'next/server';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Make sure the upload folder exists
// const uploadDir = path.join(process.cwd(), 'public', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage: storage });

// // Handle POST request
// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get('file');

//   if (!file) {
//     return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
//   const filepath = path.join(uploadDir, filename);

//   fs.writeFileSync(filepath, buffer);

//   const fileUrl = `/uploads/${filename}`;

//   return NextResponse.json({ url: fileUrl }, { status: 200 });
// }


import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });

  return NextResponse.json({ url: result.secure_url }, { status: 200 });
}
