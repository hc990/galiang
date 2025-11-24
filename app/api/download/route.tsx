// import SMB2 from '@tryjsky/v9u-smb2';
import path from 'path';
import { NextResponse } from 'next/server';
// import axios from 'axios';
import siteMetadata from '@/data/siteMetadata';
import fs from 'fs';
import axiosInstance from '@/app/axios/axios';
 



const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 3 seconds


async function withRetries<T>(operation: () => Promise<T>, maxRetries: number, delay: number): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Operation failed after all retries');
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  try {
    const book = await axiosInstance.get('/api/blog', { params: { id: slug, postion: 99} });
    // const nasPath = path.join(siteMetadata.nas.share, path.basename(book.data.oribookname));
    const nasPath = path.join(siteMetadata.nas.share, path.basename(book.data[0].oribookname));
    // 获取文件大小
    const fileStats = await withRetries(
      () =>
        new Promise((resolve, reject) => {
            fs.stat(nasPath, (err, stats) => {
                console.log(stats);
                resolve(stats);
            });
        }),
      MAX_RETRIES,
      RETRY_DELAY
    );
    let fileSize = 0;
    if (fileStats && typeof fileStats === 'object' && 'size' in fileStats) {
      fileSize = (fileStats as { size: number }).size;
    }
    const stream = new ReadableStream({  
      async start(controller) {
        await withRetries(
          () =>
            new Promise((resolve, reject) => {
                const readStream =  fs.createReadStream(nasPath);
                readStream?.on('data', (chunk) => {
                    controller.enqueue(chunk) ;  
                    console.log('Chunk received:', chunk.length);
                });
                readStream?.on('end', () => {
                    controller.close();
                    resolve(null);
                });
                readStream?.on('error', (err) => {
                    controller.error(err);
                    reject(err);
                });
            }),
          MAX_RETRIES,
          RETRY_DELAY
        );
      },
    });
    const response = new NextResponse(stream, { status: 200 });
    response.headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(book.data[0].bookname)}"`);
    response.headers.set('Content-Type', 'application/octet-stream');
    if (fileSize && fileSize > 0) {
        response.headers.set('Content-Length', fileSize.toString());
    }
    return response
  } catch (error) {
    console.error('Error during file download:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  } finally {
    
  }
}
