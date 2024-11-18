import SMB2 from '@tryjsky/v9u-smb2';
import fs from 'fs';
// Cache buffer size (e.g., 64KB)
// const CACHE_BUFFER_SIZE = 64 * 1024;
import { execSync } from 'child_process';
execSync('node --max-old-space-size=4096');

// Custom writable stream with caching buffer
// class CacheBufferStream extends Writable {  
//   destination: fs.WriteStream;
//   cacheBuffer: Buffer;
//   cacheOffset: number;

//   constructor(destination: fs.WriteStream, options?: WritableOptions) {
//     super(options);
//     this.destination = destination;
//     this.cacheBuffer = Buffer.alloc(CACHE_BUFFER_SIZE);
//     this.cacheOffset = 0;
//   }

//   _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void) {
//     let remainingChunk = chunk;

//     while (remainingChunk.length > 0) {
//       const availableSpace = CACHE_BUFFER_SIZE - this.cacheOffset;
//       const chunkToWrite = remainingChunk.slice(0, availableSpace);
//       chunkToWrite.copy(this.cacheBuffer, this.cacheOffset);
//       this.cacheOffset += chunkToWrite.length;
//       remainingChunk = remainingChunk.slice(chunkToWrite.length);

//       if (this.cacheOffset === CACHE_BUFFER_SIZE) {
//         this.flushCache((err) => {
//           if (err) return callback(err);
//         });
//       }
//     }
//     callback();
//   }

//   flushCache(callback: (error?: Error | null) => void) {
//     if (this.cacheOffset > 0) {
//       this.destination.write(this.cacheBuffer.slice(0, this.cacheOffset), (err) => {
//         if (err) return callback(err);
//         this.cacheOffset = 0;
//         callback();
//       });
//     } else {
//       callback();
//     }
//   }

//   _final(callback: (error?: Error | null) => void) {
//     this.flushCache(callback);
//   }
// }
const MAX_RETRIES = 3;
const RETRY_DELAY = 30000; // 2 seconds
// Create an SMB2 instance
const smb2Client = new SMB2({
  share: '\\\\192.168.2.214\\macbackup',
  domain: 'books',
  username: 'huangchong',
  password: 'Huang3723641_',
});

// Function to download file
function downloadFile(remotePath: string, localPath: string, retries: number) {
  smb2Client.createReadStream(remotePath, (err, readStream) => {
    if (err) {
      console.error('Error creating read stream:', err);
      return;
    }
    // const retries = 0
    const fileStream = fs.createWriteStream(localPath);
    // const cacheStream = new CacheBufferStream(fileStream);
    readStream?.pipe(fileStream);
    readStream?.on('error', (err) => {
      console.error('Read stream error:', err);
      if (retries < MAX_RETRIES) {
        console.log(`Retrying download... Attempt ${retries + 1}`);
        readStream.destroy();
        fileStream.end();
        setTimeout(() => downloadFile(remotePath, localPath, retries + 1), RETRY_DELAY);
      } else {
        console.error('Max retries reached. Failed to download file:', err);
      }
    });

    fileStream.on('error', (err) => {
      console.error('File stream error:', err);
      fileStream.destroy();
    });

    fileStream.on('finish', () => {
      console.log('File has been copied successfully.');
      readStream?.destroy();
      fileStream.end();
    });

    let bytesRead = 0;
    readStream?.on('data', (chunk) => {
      bytesRead += chunk.length;
      console.log(`Bytes read: ${bytesRead}`);
    });

    readStream?.on('close', () => {
      console.log('Read stream closed.');
      readStream.destroy();
    });

    fileStream.on('close', () => {
      console.log('Write stream closed.');
      fileStream.close()
      fileStream.destroy()
    });
  });
}
// Main function
async function main() {
  downloadFile(
    'books\\cc',
    'bb.pdf',
    1
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    smb2Client.disconnect();
  });
