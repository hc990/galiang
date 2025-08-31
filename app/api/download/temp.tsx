import SMB2 from '@tryjsky/v9u-smb2';
import path from 'path';
import { execSync } from 'child_process';
import { NextResponse } from 'next/server';
import { axiosInstant } from '@/app/context/globalProvider';
execSync('node --max-old-space-size=4096');

const MAX_RETRIES = 3;
const RETRY_DELAY = 30000; // 2 seconds

async function getSmb2Client() {
  const smb2Client = new SMB2({
    share: '',
    domain: '',
    username: '',
    password: '',
  });
  return smb2Client;
}


async function withRetries(operation: () => any, maxRetries: number, delay: number | undefined) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }  
}

export async function GET(req:Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const book = await axiosInstant.get("/api/blog",{ params: { id: slug }});
  const smb2Client = await getSmb2Client();   
  return new Promise((resolve) => {
    const buffers: any[] | Uint8Array[] = [];
    const naspath = path.join('books', book.data.oribookname);
    console.info(naspath)
    withRetries(() => smb2Client.createReadStream(naspath, (err, readStream) => {
      if (err) {
        console.error('Error creating read stream:', err);
        smb2Client.disconnect();
        return resolve(NextResponse.json({ error: 'Failed to create read stream' }, { status: 500 }));
      }

      readStream?.on('data', (chunk) => {
        buffers.push(chunk);
      });

      readStream?.on('end', () => {
        const fileBuffer = Buffer.concat(buffers);
        smb2Client.disconnect();
        const response = new NextResponse(fileBuffer);
        response.headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(book.data.bookname)}"`);
        response.headers.set('Content-Type', 'application/octet-stream');
        return resolve(response);
      });

      readStream?.on('error', (err) => {
        console.error('Read stream error:', err);
        smb2Client.disconnect();
        resolve(NextResponse.json({ error: 'Read stream error' }, { status: 500 }));
      });
    }), MAX_RETRIES, RETRY_DELAY);  
    // smb2Client.createReadStream(naspath, (err, readStream) => {
    //   if (err) {
    //     console.error('Error creating read stream:', err);
    //     smb2Client.disconnect();
    //     return resolve(NextResponse.json({ error: 'Failed to create read stream' }, { status: 500 }));
    //   }

    //   readStream?.on('data', (chunk) => {
    //     buffers.push(chunk);
    //   });

    //   readStream?.on('end', () => {
    //     const fileBuffer = Buffer.concat(buffers);
    //     smb2Client.disconnect();
    //     const response = new NextResponse(fileBuffer);
    //     response.headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(book.data.bookname)}"`);
    //     response.headers.set('Content-Type', 'application/octet-stream');
    //     resolve(response);
    //   });

    //   readStream?.on('error', (err) => {
    //     console.error('Read stream error:', err);
    //     smb2Client.disconnect();
    //     resolve(NextResponse.json({ error: 'Read stream error' }, { status: 500 }));
    //   });
    // });
   
    smb2Client.disconnect();
  });
}
